import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ImageWithZoom({ image }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPosition({ x, y });
  };

  const zoomSize = 200;
  const zoomFactor = 2;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
    >
      <Image
        src={image.src}
        alt={image.title}
        width={800}
        height={600}
        className="object-contain rounded-t-xl"
        sizes="(max-width: 768px) 100vw, 800px"
      />

      {isZoomed && (
        <div
          className="absolute border-2 border-white shadow-md rounded-md"
          style={{
            width: `${zoomSize}px`,
            height: `${zoomSize}px`,
            top: `${cursorPosition.y - zoomSize / 2}px`,
            left: `${cursorPosition.x - zoomSize / 2}px`,
            backgroundImage: `url(${image.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${800 * zoomFactor}px ${600 * zoomFactor}px`,
            backgroundPosition: `-${cursorPosition.x * zoomFactor - zoomSize / 2}px -${cursorPosition.y * zoomFactor - zoomSize / 2}px`,
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />
      )}
    </div>
  );
}
