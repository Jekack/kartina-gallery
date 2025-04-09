// components/ImageModal.tsx
import React, { useEffect, useState } from 'react';

interface Image {
  src: string;
  title: string;
  description: string;
}

interface Props {
  images: Image[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageModal({ images, initialIndex, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex);

  const current = images[index];

  const showPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const showNext = () => setIndex((prev) => (prev + 1) % images.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-[90%] max-h-[90vh] bg-neutral-900 rounded-xl shadow-lg flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-black bg-opacity-50 hover:bg-opacity-80 px-3 py-1 rounded"
        >
          ✕
        </button>

        <button
          onClick={showPrev}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-blue-400"
        >
          ◀
        </button>

        <div className="relative w-full h-full flex justify-center items-center">
          <img
            src={current.src}
            alt={current.title}
            className="object-contain max-h-[80vh] max-w-full mx-auto transition duration-300 ease-in-out"
          />
        </div>

        <button
          onClick={showNext}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10 hover:text-blue-400"
        >
          ▶
        </button>

        <div className="w-full px-4 py-3 mt-3 bg-black bg-opacity-40 text-white text-center text-base rounded-b-xl">
          <h2 className="text-xl font-semibold mb-1">{current.title}</h2>
          <p className="text-sm">{current.description}</p>
        </div>
      </div>
    </div>
  );
}
