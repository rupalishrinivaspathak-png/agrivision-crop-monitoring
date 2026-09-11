# 🚁 AgriVision — AI-Powered Crop Health Monitoring Drone

An AI-powered aerial monitoring system for citrus orchards, combining a drone-mounted camera, real-time disease detection, and a live web dashboard.

## 📋 Overview

AgriVision uses an ESP32-CAM mounted on a drone to capture aerial images of citrus crops, which are sent to a Flask server running a trained AI model. The model classifies plant health/disease in real time, and results are displayed on a live React dashboard.

## 🎯 Features

- 🚁 **Drone-mounted camera** captures images during flight
- 🧠 **AI disease detection** using EfficientNetB3 (98.71% validation accuracy, 7 disease classes)
- 📡 **Automatic image transmission** — ESP32-CAM sends a photo every 10 seconds to the server
- 🖥️ **Live web dashboard** built with React + Vite + Tailwind CSS
- 🌐 **Real-time mission view** showing the live camera feed and AI predictions

## 🏗️ Architecture

┌─────────────┐ Photo every 10s ┌──────────────┐ Live feed ┌─────────────┐
│ ESP32-CAM │ ────────────────────────> │ Flask Server │ ──────────────────> │ Website │
│ (on drone) │ │ + AI Model │ │ (Dashboard)│
└─────────────┘ └──────────────┘ └─────────────┘


## 📁 Project Structure

AgriVision-Project/
├── server/ # Flask backend + AI inference
│ ├── app.py
│ ├── class_names.json
│ ├── static/
│ └── templates/
├── website/ # React frontend dashboard
│ ├── src/
│ ├── public/
│ └── package.json
└── docs/ # Photos/videos 


## 🧠 AI Model Details

- **Architecture**: EfficientNetB3
- **Training data**: ~40,000+ citrus images (combined from 5 datasets)
- **Validation accuracy**: 98.71%
- **Classes**: 7 disease/health categories
- **Preprocessing**: EfficientNetB3-specific `preprocess_input`

> Note: Trained model files (`.h5`) are not included in this repository due to size. Please contact the repository owner for access.

## 🛠️ Hardware Used

| Component | Purpose |
|---|---|
| ESP32-CAM (AI Thinker) | Aerial image capture |
| MB Programmer Board | ESP32-CAM flashing/programming |
| Drone frame | Camera mounting platform |

## 🚀 Setup

### Server (Flask + AI)

```bash
cd server
pip install flask flask-cors tensorflow pillow numpy
python app.py
```

Place your trained model file(s) (`.h5`) in the `server` directory before running — update the model filename in `app.py` if needed.

### Website (React Dashboard)

```bash
cd website
npm install
npm run dev
```

Create a `.env` file in the `website` folder with your server's IP address:

VITE_SERVER_URL=http://YOUR_SERVER_IP:5000


Visit `http://localhost:5173` to view the dashboard.

### ESP32-CAM Firmware

Flash the ESP32-CAM with Arduino IDE, configured to:
- Connect to your Wi-Fi network
- Capture and POST a photo to the Flask server's endpoint every 10 seconds

> ⚠️ Note: Since the server's local IP can change, update both the ESP32 firmware and the website's `.env` file accordingly, or configure a static IP for the server machine.

## ✅ Phase 1 (Complete)

- Manual drone flight with live image capture
- Real-time AI disease detection
- Live dashboard showing camera feed and predictions

## 🔜 Phase 2 (Planned)

- Autonomous GPS waypoint missions using Pixhawk 2.4.8 + Neo-M8N GPS
- 433MHz telemetry link
- Automated flight control via `pymavlink`
- "Start Mission" button on the website to trigger autonomous flight

## 🚧 Technical Notes & Challenges Solved

- Switched from MobileNetV2 to EfficientNetB3 for improved accuracy, with correct preprocessing pipeline
- Resolved React Fast Refresh issues by separating `AIContext` and `AIProvider`
- Disabled MJPEG streaming on ESP32-CAM to prevent frame buffer overflow issues
- Implemented `useRef`-based deduplication guard to prevent redundant auto-fetch calls
- Added `flask-cors` for proper cross-origin requests between server and dashboard

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

Built as part of an ongoing exploration into AI-powered precision agriculture and autonomous drone systems.



