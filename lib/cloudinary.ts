/**
 * Cloudinary Upload Utility for EagleX Pitch Platform
 * Uses Unsigned Direct Upload Preset for secure client-side asset delivery.
 */

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

export async function uploadToCloudinary(
  fileOrBlob: File | Blob,
  fileName: string = 'cropped_image.jpg'
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'ijtgjox1';
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'pitchProject';

  const formData = new FormData();
  formData.append('file', fileOrBlob, fileName);
  formData.append('upload_preset', uploadPreset);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const message = errData?.error?.message || response.statusText || 'Cloudinary upload failed';
    throw new Error(`Cloudinary Error: ${message}`);
  }

  const data: CloudinaryUploadResponse = await response.json();
  return data.secure_url;
}
