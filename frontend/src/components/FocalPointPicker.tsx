import React, { useRef, useState, useEffect } from 'react';
import { Crosshair } from 'lucide-react';

interface FocalPointPickerProps {
  imageUrl: string;
  focalPoint?: { x: number; y: number };
  onChange: (point: { x: number; y: number }) => void;
}

export const FocalPointPicker: React.FC<FocalPointPickerProps> = ({ imageUrl, focalPoint, onChange }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [point, setPoint] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (focalPoint) {
      setPoint(focalPoint);
    }
  }, [focalPoint]);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Clamp values between 0 and 100
    const clampedX = Math.min(Math.max(x, 0), 100);
    const clampedY = Math.min(Math.max(y, 0), 100);
    
    const newPoint = { x: Math.round(clampedX), y: Math.round(clampedY) };
    setPoint(newPoint);
    onChange(newPoint);
  };

  if (!imageUrl) return null;

  return (
    <div className="mt-3 space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-ashram-charcoal dark:text-darkAshram-text">
          Select Focal Point (Click on the image)
        </label>
        <span className="text-[10px] font-mono text-ashram-saffron bg-ashram-saffron/10 px-2 py-0.5 rounded">
          X: {point.x}%, Y: {point.y}%
        </span>
      </div>
      <div className="relative inline-block border-2 border-ashram-border dark:border-darkAshram-border rounded-xl overflow-hidden cursor-crosshair">
        <img
          ref={imgRef}
          src={imageUrl}
          alt="Preview"
          onClick={handleClick}
          className="max-h-48 w-auto object-contain bg-black/5"
        />
        <div
          className="absolute w-6 h-6 -ml-3 -mt-3 text-white filter drop-shadow-md pointer-events-none transition-all duration-200"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
        >
          <Crosshair className="w-full h-full text-white" strokeWidth={3} />
          <div className="absolute inset-0 bg-black/20 rounded-full scale-50" />
        </div>
      </div>
      <p className="text-[10px] text-ashram-muted dark:text-darkAshram-muted">
        This point will remain visible when the image is automatically cropped on different devices.
      </p>
    </div>
  );
};
