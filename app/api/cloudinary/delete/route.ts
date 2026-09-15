import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

interface DeleteRequestPayload {
  publicIds?: string[];
  urls?: string[];
}

/**
 * Helper to extract public_id from standard Cloudinary URL
 * Example: https://res.cloudinary.com/ijtgjox1/image/upload/v1726401234/eaglex_123456.jpg -> eaglex_123456
 */
function parsePublicIdFromUrl(url: string): string | null {
  if (!url || !url.includes('cloudinary.com')) return null;

  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;

    let path = parts[1];
    // Remove optional version prefix (e.g. v1726401234/)
    path = path.replace(/^v\d+\//, '');

    // Strip extension (e.g. .jpg, .png, .webp)
    const dotIdx = path.lastIndexOf('.');
    if (dotIdx !== -1) {
      path = path.substring(0, dotIdx);
    }

    return decodeURIComponent(path);
  } catch (err) {
    console.error('Error parsing Cloudinary URL:', err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: DeleteRequestPayload = await req.json().catch(() => ({}));
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'ijtgjox1';
    const apiKey = process.env.CLOUDINARY_API_KEY || '744834764739236';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'u4yKOtZIZ8b0VNLIdaKqUPPremg';

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Cloudinary server credentials missing in environment.' },
        { status: 500 }
      );
    }

    // Collect all public IDs from either explicit publicIds array or URLs array
    const targetPublicIds: string[] = [];

    if (body.publicIds && Array.isArray(body.publicIds)) {
      targetPublicIds.push(...body.publicIds.filter(Boolean));
    }

    if (body.urls && Array.isArray(body.urls)) {
      for (const u of body.urls) {
        const id = parsePublicIdFromUrl(u);
        if (id && !targetPublicIds.includes(id)) {
          targetPublicIds.push(id);
        }
      }
    }

    if (targetPublicIds.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No Cloudinary public_ids identified for deletion.',
        deletedCount: 0,
      });
    }

    const results = await Promise.allSettled(
      targetPublicIds.map(async (publicId) => {
        const timestamp = Math.floor(Date.now() / 1000);
        // Signature is SHA1 of: public_id=<id>&timestamp=<time><api_secret>
        const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
        const signature = crypto.createHash('sha1').update(stringToSign).digest('hex');

        const formData = new FormData();
        formData.append('public_id', publicId);
        formData.append('timestamp', timestamp.toString());
        formData.append('api_key', apiKey);
        formData.append('signature', signature);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await res.json();
        return { publicId, result: data.result || data };
      })
    );

    const successful = results.filter((r) => r.status === 'fulfilled');

    return NextResponse.json({
      success: true,
      deletedCount: successful.length,
      totalRequested: targetPublicIds.length,
      results,
    });
  } catch (error: any) {
    console.error('Cloudinary destruction error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to delete Cloudinary resources' },
      { status: 500 }
    );
  }
}
