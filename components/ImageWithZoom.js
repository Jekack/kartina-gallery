import { useRef, useState } from 'react';

interface ImageProps {
  image: {
    src: string;
    title: string;
    description: string;
  };
}

export default function ImageWithZoom({ image }: ImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties | null>(null);
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const img = imgRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = x / rect.width;
    const percentY = y / rect.height;

    const bgX = percentX * 100;
    const bgY = percentY * 100;

    const zoomBoxSize = 200;

    setZoomStyle({
      position: 'absolute',
      top: y - zoomBoxSize / 2,
      left: x - zoomBoxSize / 2,
      width: zoomBoxSize,
      height: zoomBoxSize,
      border: '2px solid white',
      backgroundImage: `url(${image.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `${bgX}% ${bgY}%`,
      backgroundSize: `${img.naturalWidth * 2}px ${img.naturalHeight * 2}px`,
      pointerEvents: 'none',
      zIndex: 10,
    });
  };

  return (
    <div
      className="relative w-full h-full flex justify-center items-center"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setShowZoom(true)}
      onMouseLeave={() => setShowZoom(false)}
    >
      <img
        ref={imgRef}
        src={image.src}
        alt={image.title}
        className="w-full h-auto max-h-[80vh] object-contain"
      />
      {showZoom && zoomStyle && (
        <div
          className="rounded-md shadow-lg"
          style={zoomStyle}
        />
      )}
    </div>
  );
}
