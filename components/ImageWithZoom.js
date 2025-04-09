'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ImageWithZoomModal({ image, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPosition({ x, y });
  };

  // Закриття по Esc
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-[90vw] max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Закрити */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
        >
          ✕
        </button>

        {/* Контейнер зображення */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[4/3] bg-black"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
        >
          <Image
            src={image.src}
            alt={image.title}
            fill
            className="object-contain w-full h-full"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />

          {/* Лупа */}
          {isZoomed && (
            <div
              className="absolute border-2 border-white rounded-full"
              style={{
                left: `${cursorPosition.x - 50}px`,
                top: `${cursorPosition.y - 50}px`,
                width: '100px',
                height: '100px',
                backgroundImage: `url(${image.src})`,
                backgroundSize: `800%`,
                backgroundPosition: `-${cursorPosition.x * 8}px -${cursorPosition.y * 8}px`,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>

        {/* Опис */}
        <div className="p-4 bg-black text-white text-center">
          <h2 className="text-xl font-bold">{image.title}</h2>
          <p className="text-sm mt-1">{image.description}</p>
        </div>
      </div>
    </div>
  );
}
