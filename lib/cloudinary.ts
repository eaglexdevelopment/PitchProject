/**
 * Cloudinary Media Utilities for EagleX Pitch Platform
 * - Unsigned Direct Upload Preset for secure client-side asset delivery
 * - Recursive asset crawler for pitch pages
 * - Server deletion dispatcher
 */

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

/**
 * Direct unsigned client-side upload helper
 */
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

/**
 * Checks if a string is a Cloudinary asset URL and extracts public_id
 */
export function extractCloudinaryPublicId(url: string): string | null {
  if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) return null;

  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;

    let path = parts[1];
    path = path.replace(/^v\d+\//, '');

    const dotIdx = path.lastIndexOf('.');
    if (dotIdx !== -1) {
      path = path.substring(0, dotIdx);
    }

    return decodeURIComponent(path);
  } catch {
    return null;
  }
}

/**
 * Recursively crawls any object / pitch data structure to find all Cloudinary URLs
 */
export function extractCloudinaryUrlsFromPitch(obj: any): string[] {
  const urls: string[] = [];

  function scan(val: any) {
    if (!val) return;
    if (typeof val === 'string') {
      if (val.includes('cloudinary.com') && (val.startsWith('http://') || val.startsWith('https://'))) {
        if (!urls.includes(val)) urls.push(val);
      }
    } else if (Array.isArray(val)) {
      for (const item of val) scan(item);
    } else if (typeof val === 'object') {
      for (const key of Object.keys(val)) {
        scan(val[key]);
      }
    }
  }

  scan(obj);
  return urls;
}

/**
 * Sends request to backend deletion API to destroy Cloudinary assets
 */
export async function deleteCloudinaryAssets(urls: string[]): Promise<void> {
  if (!urls || urls.length === 0) return;

  const validUrls = urls.filter((u) => u && typeof u === 'string' && u.includes('cloudinary.com'));
  if (validUrls.length === 0) return;

  try {
    const response = await fetch('/api/cloudinary/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ urls: validUrls }),
    });

    if (!response.ok) {
      console.warn('Failed to delete some Cloudinary assets:', await response.text());
    }
  } catch (err) {
    console.error('Error invoking Cloudinary deletion API:', err);
  }
}
