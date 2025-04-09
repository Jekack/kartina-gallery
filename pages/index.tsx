import Image from 'next/image';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const customLinks = Array(9).fill("https://t.me/jeffersonx");

const customTitles = [
  "Стиль: Абстрактне мистецтво",
  "Стиль: Акварель",
  "Стиль: Мінімалізм",
  "Стиль: Поп-арт",
  "Стиль: Ретро стиль",
  "Стиль: Футуризм",
  "Стиль: Осінь",
  "Стиль: Графіті",
  "Стиль: Піксельна"
];


const customDescriptions = [
  "Ця картина відображає хаос і гармонію одночасно, створюючи потужний емоційний ефект.",
  "Легкість акварелі передає відчуття спокою, мрійливості та прозорості.",
  "Мінімалізм у кожному штриху — менше значить більше.",
  "Яскраві кольори та ритм поп-культури, що кричить про свободу.",
  "Вінтажна естетика минулого, яка оживає в новому цифровому просторі.",
  "Майбутнє вже тут — механіка, технології, космос.",
  "Теплі тони, листя, ностальгія. Осінній настрій в кожному пікселі.",
  "Вулична енергія, графіті-культура і вільне самовираження.",
  "Піксельна краса цифрової епохи — ретро та майбутнє в одному кадрі."
];

export async function getStaticProps() {
  const imagesDir = path.join(process.cwd(), 'public/img');
  const files = fs.readdirSync(imagesDir);
  const images = files
    .filter((file) => /\.(jpe?g|png|gif)$/i.test(file))
    .map((file, index) => ({
      src: `/img/${file}`,
      title: customTitles[index] || `Картина ${index + 1}`,
      description: customDescriptions[index] || ''
    }));
  return { props: { images } };
}

export default function Home({ images }: { images: { src: string; title: string; description: string }[] }) {
  const [selected, setSelected] = useState<null | { src: string; title: string; description: string }>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <main className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-black'} min-h-screen p-8`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-center w-full">Галерея КАРТИНИ 🖼️</h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="absolute right-8 top-8 border px-3 py-1 rounded"
        >
          {theme === 'dark' ? '☀️ Світла тема' : '🌙 Темна тема'}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src={img.src}
              alt={img.title}
              width={500}
              height={500}
              layout="responsive"
              objectFit="cover"
              className="cursor-pointer hover:scale-105 transition"
              onClick={() => setSelected(img)}
            />
            <div className="p-2 text-center font-semibold">{img.title}</div>
            <div className="text-center pb-2">
              <a
  href={customLinks[index]}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
>
  Купити як NFT
</a>

            </div>
          </div>
        ))}
      </div>

    {selected && createPortal(
  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
    onClick={() => setSelected(null)}
  >
    <div
      className="relative w-full max-w-[80%] max-h-[90vh] bg-neutral-900 rounded-xl shadow-lg overflow-hidden"
      onClick={(e) => e.stopPropagation()} // не закривати при кліку на контент
    >
      {/* Хрестик */}
      <button
        className="absolute top-3 right-3 text-white text-3xl hover:text-red-500 cursor-pointer z-50"
        onClick={() => setSelected(null)}
      >
        &times;
      </button>

      {/* Зображення з підписом поверх */}
      <div className="relative w-full h-[60vh]">
        <Image
          src={selected.src}
          alt={selected.title}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />

        {/* Титул і опис на фоні картинки */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 text-center">
          <div className="text-lg font-bold">{selected.title}</div>
          <div className="text-sm italic">{selected.description}</div>
        </div>
      </div>
    </div>
  </div>,
  document.body
)}
