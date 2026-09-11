from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.applications.efficientnet import preprocess_input
from PIL import Image
import numpy as np
import json, io, os, cv2
from datetime import datetime
from ultralytics import YOLO
import uuid
import requests

app = Flask(__name__)
CORS(app)

# ── Load Disease Classifier (EfficientNetB3) ──
print("Loading disease classifier...")
disease_model = tf.keras.models.load_model('agrivision_mega.h5')
with open('class_names.json') as f:
    class_names = json.load(f)
print(f"Disease model loaded. {len(class_names)} classes.")

# ── Load YOLOv8 Leaf Detector ──
print("Loading leaf detector...")
leaf_detector = YOLO('yolov8n.pt')  # downloads automatically first time
print("Leaf detector loaded.")

disease_tips = {
    "Black_Spot": "Apply copper-based fungicide. Remove infected leaves. Avoid overhead irrigation.",
    "Citrus_Canker": "Apply copper hydroxide spray. Remove infected parts. Disinfect tools.",
    "Citrus_Greening": "No cure. Remove infected trees immediately. Control psyllid insects.",
    "Healthy": "Crop is healthy. Continue regular monitoring and care.",
    "Multiple_Diseases": "Multiple infections detected. Consult agricultural officer immediately.",
    "Nutrient_Deficiency": "Apply balanced NPK fertilizer. Check soil pH (6.0-7.0).",
    "Young_Healthy": "Young healthy leaf. Continue care. Monitor weekly.",
    "Melanose": "Apply copper fungicide. Prune infected twigs.",
    "Scab": "Apply fungicide during wet weather. Remove infected fruit."
}

latest_result = {
    "disease": "Waiting for image...",
    "confidence": 0,
    "recommendation": "",
    "timestamp": "",
    "leaf_count": 0,
    "zone_results": []
}

def classify_leaf(img_array):
    """Classify a single cropped leaf image"""
    img_resized = cv2.resize(img_array, (224, 224))
    img_rgb = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
    img_preprocessed = preprocess_input(np.array(img_rgb, dtype=np.float32))
    img_batch = np.expand_dims(img_preprocessed, axis=0)
    predictions = disease_model.predict(img_batch, verbose=0)
    predicted_class = class_names[np.argmax(predictions)]
    confidence = float(np.max(predictions) * 100)
    return predicted_class, confidence

def detect_and_classify(img_bytes):
    """Full two-stage pipeline: detect leaves then classify each"""
    # Convert bytes to OpenCV image
    nparr = np.frombuffer(img_bytes, np.uint8)
    img_cv = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if img_cv is None:
        return None, []

    h, w = img_cv.shape[:2]
    zone_results = []

    # ── Stage 1: Detect green regions (leaves) using color segmentation ──
    # Convert to HSV for green detection
    hsv = cv2.cvtColor(img_cv, cv2.COLOR_BGR2HSV)
    
    # Green range for leaves
    lower_green = np.array([25, 40, 40])
    upper_green = np.array([85, 255, 255])
    mask = cv2.inRange(hsv, lower_green, upper_green)
    
    # Find contours (leaf regions)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Filter by size — ignore tiny regions
    min_leaf_area = (w * h) * 0.02  # minimum 2% of image
    valid_contours = [c for c in contours if cv2.contourArea(c) > min_leaf_area]
    
    # If no leaves detected by color, classify whole image
    if not valid_contours:
        img_pil = Image.fromarray(cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB))
        img_preprocessed = preprocess_input(
            np.array(img_pil.resize((224, 224)), dtype=np.float32))
        predictions = disease_model.predict(
            np.expand_dims(img_preprocessed, 0), verbose=0)
        predicted_class = class_names[np.argmax(predictions)]
        confidence = float(np.max(predictions) * 100)
        zone_results.append({
            "zone": 1,
            "disease": predicted_class,
            "confidence": round(confidence, 1),
            "bbox": [0, 0, w, h]
        })
        return img_cv, zone_results

    # ── Stage 2: Classify each detected leaf zone ──
    annotated = img_cv.copy()
    
    # Sort contours by size (largest first) — max 5 zones
    valid_contours = sorted(valid_contours, 
                           key=cv2.contourArea, reverse=True)[:5]
    
    for i, contour in enumerate(valid_contours):
        x, y, cw, ch = cv2.boundingRect(contour)
        
        # Add padding
        pad = 10
        x1 = max(0, x - pad)
        y1 = max(0, y - pad)
        x2 = min(w, x + cw + pad)
        y2 = min(h, y + ch + pad)
        
        # Crop leaf region
        leaf_crop = img_cv[y1:y2, x1:x2]
        
        if leaf_crop.size == 0:
            continue
            
        # Classify this leaf
        disease, confidence = classify_leaf(leaf_crop)
        tip = disease_tips.get(disease, "Consult agricultural officer.")
        
        zone_results.append({
            "zone": i + 1,
            "disease": disease,
            "confidence": round(confidence, 1),
            "recommendation": tip,
            "bbox": [x1, y1, x2, y2]
        })
        
        # Draw box on annotated image
        color = (0, 255, 0) if 'healthy' in disease.lower() else (0, 0, 255)
        cv2.rectangle(annotated, (x1, y1), (x2, y2), color, 2)
        
        # Add label
        label = f"{disease.replace('_',' ')} {confidence:.0f}%"
        cv2.putText(annotated, label, (x1, y1-5),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.4, color, 1)
    
    return annotated, zone_results

@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        img_bytes = request.data
        if not img_bytes:
            return jsonify({"error": "No image"}), 400
    else:
        img_bytes = request.files['image'].read()

    os.makedirs('static', exist_ok=True)

    # Save original
    os.makedirs("gallery", exist_ok=True)
    scan_id = str(uuid.uuid4())[:8]
    original_path = f"gallery/{scan_id}.jpg"

    with open(original_path, "wb") as f:
        f.write(img_bytes)

    # Run two-stage pipeline
    annotated_img, zone_results = detect_and_classify(img_bytes)
    annotated_path = ""

    if annotated_img is not None:
        annotated_path = f"gallery/{scan_id}_ai.jpg"
        cv2.imwrite(annotated_path, annotated_img)
        cv2.imwrite("static/latest.jpg", annotated_img)

    else:
        with open("static/latest.jpg","wb") as f:
            f.write(img_bytes)

    # Determine overall result
    if zone_results:
        # Find most severe disease (non-healthy with highest confidence)
        diseases = [z for z in zone_results 
                   if 'healthy' not in z['disease'].lower()]
        
        if diseases:
            # Most confident disease
            main = max(diseases, key=lambda x: x['confidence'])
        else:
            # All healthy
            main = max(zone_results, key=lambda x: x['confidence'])
        
        main_disease = main['disease']
        main_confidence = main['confidence']
        recommendation = disease_tips.get(main_disease, 
                                         "Consult agricultural officer.")
    else:
        main_disease = "Unknown"
        main_confidence = 0
        recommendation = "Could not detect leaves clearly."

    latest_result.update({
        "disease": main_disease,
        "confidence": round(main_confidence, 1),
        "recommendation": recommendation,
        "timestamp": datetime.now().strftime("%d-%m-%Y %H:%M:%S"),
        "leaf_count": len(zone_results),
        "zone_results": zone_results
    })

    metadata = latest_result.copy()
    metadata["image"] = original_path
    metadata["annotated"] = annotated_path

    with open(f"gallery/{scan_id}.json","w") as f:

        json.dump(metadata,f,indent=4)

    print(f"Detected {len(zone_results)} leaf zones")
    for z in zone_results:
        print(f"  Zone {z['zone']}: {z['disease']} ({z['confidence']}%)")

    return jsonify(latest_result)

@app.route('/get_result', methods=['GET'])
def get_result():
    return jsonify(latest_result)

@app.route('/latest_image', methods=['GET'])
def latest_image():
    return send_file('static/latest.jpg', mimetype='image/jpeg')

@app.route('/status', methods=['GET'])
def status():
    return jsonify({"status": "AgriVision server running", 
                   "classes": len(class_names)})

@app.route('/')
def dashboard():
    return render_template('index.html')

@app.route("/gallery")

def gallery():

    scans=[]

    if not os.path.exists("gallery"):

        return jsonify([])

    for file in os.listdir("gallery"):

        if file.endswith(".json"):

            with open(os.path.join("gallery",file)) as f:

                data=json.load(f)

                scans.append(data)

    scans.sort(

    key=lambda x:

    datetime.strptime(

    x["timestamp"],

    "%d-%m-%Y %H:%M:%S"

    ),

    reverse=True

    )

    return jsonify(scans)

from flask import send_from_directory

@app.route("/gallery/<filename>")

def gallery_image(filename):

    return send_from_directory("gallery", filename)

@app.route("/clear_gallery", methods=["POST"])
def clear_gallery():

    folder = "gallery"

    if os.path.exists(folder):

        for file in os.listdir(folder):

            os.remove(os.path.join(folder, file))

    return jsonify({
        "message": "Gallery Cleared Successfully"
    })

@app.route("/translate", methods=["POST"])
def translate():

    data = request.get_json()

    text = data.get("text", "")
    target = data.get("target", "en")

    if not text:
        return jsonify({"translation": ""})

    language_map = {
        "English": "en",
        "Hindi": "hi",
        "Marathi": "mr"
    }

    target_code = language_map.get(target, "en")

    if target_code == "en":
        return jsonify({"translation": text})

    try:

        response = requests.get(
            "https://api.mymemory.translated.net/get",
            params={
                "q": text,
                "langpair": f"en|{target_code}"
            },
            timeout=10
        )

        result = response.json()

        translation = result["responseData"]["translatedText"]

        return jsonify({
            "translation": translation
        })

    except Exception as e:

        print("Translation error:", e)

        return jsonify({
            "translation": text
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)