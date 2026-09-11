const API = import.meta.env.VITE_API_URL;

export async function uploadImage(imageFile) {

    const formData = new FormData();

    // MUST match Flask
    formData.append("image", imageFile);

    const response = await fetch(`${API}/upload_image`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Upload failed");
    }

    return await response.json();

}

export async function getResult() {

    const response = await fetch(`${API}/get_result`);

    return await response.json();

}

export function getLatestImage() {

    return `${API}/latest_image?${Date.now()}`;

}