import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Image {
  src: string;
  title: string;
  description: string;
}

interface ImageWithZoomProps {
  images: Image[];           // масив усіх картин
  currentIndex: number;      // індекс поточної
  setCurrentIndex: (index: number) => void;  // функція для зміни
}

const ImageWithZoom: React.FC<ImageWithZoomProps> = ({
  images,
  currentIndex,
  setCurrentIndex,
}) => {
  const image = images[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="relative flex items-center justify-center h-full p-4">
      {/* Ліва стрілка */}
      <button
        onClick={handlePrev}
        className="absolute left-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Зображення */}
      <div className="w-full max-w-3xl max-h-[70vh] overflow-hidden flex items-center justify-center">
        <img
          src={image.src}
          alt={image.title}
          className="w-auto h-full max-h-[70vh] object-contain transition-transform duration-500 group-hover:scale-105 rounded-xl"
        />
      </div>

      {/* Права стрілка */}
      <button
        onClick={handleNext}
        className="absolute right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
      >
        <ChevronRight size={32} />
      </button>
    </div>
  );
};

export default ImageWithZoom;
