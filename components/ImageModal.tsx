import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

type ImageData = {
  src: string;
  title?: string;
  description?: string;
};

interface ImageModalProps {
  images: ImageData[];
  initialIndex: number;
  onClose: () => void;
}

export default function ImageModal({ images, initialIndex, onClose }: ImageModalProps) {
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [index]);

  const nextImage = () => setIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  const { src, title, description } = images[index];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-md flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-red-400 transition">
          <X size={30} />
        </button>

        {/* Left arrow */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-300 transition"
        >
          <ArrowLeft size={40} />
        </button>

        {/* Right arrow */}
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-300 transition"
        >
          <ArrowRight size={40} />
        </button>

        {/* Image Zoomable */}
        <motion.img
          key={src}
          src={src}
          alt={title}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl max-h-[80vh] rounded-2xl shadow-2xl cursor-zoom-in"
        />

        {/* Caption */}
        <div className="absolute bottom-6 text-center text-white px-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-md">{description}</p>
          <span className="text-sm opacity-70">{index + 1} / {images.length}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
