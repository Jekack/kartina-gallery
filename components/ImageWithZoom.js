
import { useState } from 'react';
import Image from 'next/image';

export default function ImageWithZoom({ image }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Function to track the cursor position
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setCursorPosition({ x, y });
  };

  return (
    <div
      className="relative w-full aspect-[4/3] bg-black"
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
          className="absolute border-2 border-white rounded-full"
          style={{
            left: `${cursorPosition.x - 50}px`, // Offset the zoom lens position
            top: `${cursorPosition.y - 50}px`,
            width: '100px', // Size of the lens
            height: '100px',
            backgroundImage: `url(${image.src})`,
            backgroundSize: `${800}%`, // Zoom level of the image
            backgroundPosition: `-${cursorPosition.x * 8}px -${cursorPosition.y * 8}px`,
            pointerEvents: 'none', // Prevent blocking the cursor with the zoom lens
          }}
        />
      )}
    </div>
  );
}
    