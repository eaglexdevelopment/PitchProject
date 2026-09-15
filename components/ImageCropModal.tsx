'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { uploadToCloudinary } from '@/lib/cloudinary';
import styles from './cropModal.module.css';

export type AspectRatioType = '3:4' | '1:1' | '16:9' | 'free';

interface ImageCropModalProps {
  isOpen: boolean;
  initialImageSrc?: string | null;
  aspectRatioPreset?: AspectRatioType;
  title?: string;
  onClose: () => void;
  onCropAndUploadSuccess: (url: string) => void;
}

const ASPECT_RATIO_CONFIGS: Record<AspectRatioType, { label: string; width: number; height: number }> = {
  '3:4': { label: '3:4 (Portrait)', width: 240, height: 320 },
  '1:1': { label: '1:1 (Square)', width: 280, height: 280 },
  '16:9': { label: '16:9 (Landscape)', width: 356, height: 200 },
  'free': { label: 'Free', width: 340, height: 260 },
};

export default function ImageCropModal({
  isOpen,
  initialImageSrc,
  aspectRatioPreset = '3:4',
  title = 'Crop & Upload Image',
  onClose,
  onCropAndUploadSuccess,
}: ImageCropModalProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(initialImageSrc || null);
  const [selectedRatio, setSelectedRatio] = useState<AspectRatioType>(aspectRatioPreset);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialImageSrc) {
      setImageSrc(initialImageSrc);
    }
  }, [initialImageSrc]);

  useEffect(() => {
    setSelectedRatio(aspectRatioPreset);
    setZoom(1);
    setRotation(0);
    setOffset({ x: 0, y: 0 });
    setErrorMsg(null);
  }, [isOpen, aspectRatioPreset]);

  // Load Image Object when src changes
  useEffect(() => {
    if (!imageSrc) {
      imageRef.current = null;
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setOffset({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Handle local file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Please select a valid image file (JPG, PNG, WebP).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Mouse & Touch Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!imageSrc) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (!imageSrc) return;
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    setZoom((prev) => Math.min(Math.max(0.5, prev + zoomDelta), 3.5));
  };

  // Rotate 90 degrees
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Crop & Export via Canvas
  const handleCropAndUpload = async () => {
    if (!imageRef.current || !imageSrc) {
      setErrorMsg('No image to crop.');
      return;
    }

    setIsUploading(true);
    setErrorMsg(null);

    try {
      const img = imageRef.current;
      const cropConfig = ASPECT_RATIO_CONFIGS[selectedRatio];

      // Create target canvas
      const targetCanvas = document.createElement('canvas');
      const targetWidth = cropConfig.width * 2; // 2x resolution for retina display
      const targetHeight = cropConfig.height * 2;
      targetCanvas.width = targetWidth;
      targetCanvas.height = targetHeight;

      const ctx = targetCanvas.getContext('2d');
      if (!ctx) throw new Error('Could not initialize canvas context');

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Center and apply transformations
      ctx.translate(targetWidth / 2, targetHeight / 2);
      ctx.rotate((rotation * Math.PI) / 180);

      // Scaling relative to frame
      // Container frame dimensions
      const frameW = cropConfig.width;
      const frameH = cropConfig.height;

      // Base scale to fit container view
      const baseScale = Math.max(frameW / img.naturalWidth, frameH / img.naturalHeight);
      const effectiveScale = baseScale * zoom * 2; // 2x for target canvas

      const drawW = img.naturalWidth * effectiveScale;
      const drawH = img.naturalHeight * effectiveScale;
      const drawX = (offset.x * 2) - (drawW / 2);
      const drawY = (offset.y * 2) - (drawH / 2);

      ctx.drawImage(img, -drawW / 2 + (offset.x * 2), -drawH / 2 + (offset.y * 2), drawW, drawH);

      // Convert Canvas to Blob
      const blob = await new Promise<Blob | null>((resolve) => {
        targetCanvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92);
      });

      if (!blob) throw new Error('Failed to create image blob');

      // Upload to Cloudinary
      const uploadedUrl = await uploadToCloudinary(blob, `eaglex_${Date.now()}.jpg`);
      onCropAndUploadSuccess(uploadedUrl);
      onClose();
    } catch (err: any) {
      console.error('Crop & Upload failed:', err);
      setErrorMsg(err.message || 'Upload failed. Please check Cloudinary connection.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  const currentCropConfig = ASPECT_RATIO_CONFIGS[selectedRatio];

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2v14a2 2 0 0 0 2 2h14"></path>
              <path d="M18 22V8a2 2 0 0 0-2-2H2"></path>
            </svg>
            {title}
          </div>
          <button type="button" onClick={onClose} className={styles.closeBtn} title="Close">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {errorMsg && (
            <div style={{ width: '100%', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.85rem' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Interactive Crop Viewport */}
          <div
            ref={containerRef}
            className={styles.cropContainer}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {imageSrc ? (
              <>
                <img
                  src={imageSrc}
                  alt="Crop preview"
                  draggable={false}
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                    transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    pointerEvents: 'none',
                  }}
                />

                {/* Framing Overlay Mask */}
                <div className={styles.cropGuideOverlay}>
                  <div
                    className={styles.cropFrame}
                    style={{
                      width: `${currentCropConfig.width}px`,
                      height: `${currentCropConfig.height}px`,
                    }}
                  >
                    <div className={styles.cropGridLines}>
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className={styles.gridCell} />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div
                className={styles.dropzone}
                onClick={() => fileInputRef.current?.click()}
              >
                <span className={styles.dropzoneIcon}>🖼️</span>
                <span className={styles.dropzoneText}>Click to select or drag an image here</span>
                <span className={styles.dropzoneSub}>Supports JPG, PNG, WebP up to 10MB</span>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className={styles.hiddenFileInput}
            onChange={handleFileChange}
          />

          {/* Controls Bar */}
          {imageSrc && (
            <div className={styles.controlsRow}>
              {/* Aspect Ratio Buttons */}
              <div className={styles.aspectRatios}>
                <span className={styles.aspectLabel}>Ratio:</span>
                {(Object.keys(ASPECT_RATIO_CONFIGS) as AspectRatioType[]).map((ratioKey) => (
                  <button
                    key={ratioKey}
                    type="button"
                    onClick={() => setSelectedRatio(ratioKey)}
                    className={`${styles.ratioBtn} ${
                      selectedRatio === ratioKey ? styles.ratioBtnActive : ''
                    }`}
                  >
                    {ASPECT_RATIO_CONFIGS[ratioKey].label}
                  </button>
                ))}
              </div>

              {/* Zoom & Rotation Controls */}
              <div className={styles.slidersRow}>
                <div className={styles.zoomGroup}>
                  <span className={styles.zoomLabel}>🔍 Zoom:</span>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className={styles.zoomSlider}
                  />
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', minWidth: '35px' }}>
                    {Math.round(zoom * 100)}%
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleRotate}
                  className={styles.rotateBtn}
                  title="Rotate 90 degrees clockwise"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
                  </svg>
                  Rotate 90°
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <div className={styles.footerLeft}>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={styles.replaceBtn}
            >
              {imageSrc ? '🔄 Select Different Image' : '+ Choose File'}
            </button>
          </div>

          <div className={styles.footerRight}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCropAndUpload}
              disabled={!imageSrc || isUploading}
              className={styles.uploadBtn}
            >
              {isUploading ? (
                <>
                  <span className={styles.spinner} />
                  Uploading to Cloudinary...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3v12"></path>
                    <polyline points="7 8 12 3 17 8"></polyline>
                    <path d="M20 21H4a2 2 0 0 1-2-2v-3"></path>
                  </svg>
                  Crop & Upload
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
