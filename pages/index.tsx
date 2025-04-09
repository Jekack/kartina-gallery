import { useState } from 'react';
import { createPortal } from 'react-dom';
import ImageWithZoom from '../components/ImageWithZoom';
import ImageGallery from '@/components/ImageGallery';

const customLinks = Array(9).fill("https://t.me/jeffersonx");

const customTitles = [
  "Абстрактне мистецтво",
  "Осінь",
  "Футуризм",
  "Графіті",
  "Мінімалізм",
  "Піксельна",
  "Поп-арт",
  "Ретро стиль",
  "Акварель"
];

const customDescriptions = [
  "Ця картина відображає хаос і гармонію одночасно, створюючи потужний емоційний ефект.",
  "Теплі тони, листя, ностальгія. Осінній настрій в кожному пікселі.",
  "Майбутнє вже тут — механіка, технології, космос.",
  "Вулична енергія, графіті-культура і вільне самовираження.",
  "Мінімалізм у кожному штриху — менше значить більше.",
  "Піксельна краса цифрової епохи — ретро та майбутнє в одному кадрі.",
  "Яскраві кольори та ритм поп-культури, що кричить про свободу.",
  "Вінтажна естетика минулого, яка оживає в новому цифровому просторі.",
  "Легкість акварелі передає відчуття спокою, мрійливості та прозорості."
];

interface Image {
  src: string;
  title: string;
  description: string;
}

export async function getStaticProps() {
  const images: Image[] = [
    { src: '/img/abstract.png', title: customTitles[0], description: customDescriptions[0] },
    { src: '/img/autumn.png', title: customTitles[1], description: customDescriptions[1] },
    { src: '/img/futurism.png', title: customTitles[2], description: customDescriptions[2] },
    { src: '/img/graffiti.png', title: customTitles[3], description: customDescriptions[3] },
    { src: '/img/minimal.png', title: customTitles[4], description: customDescriptions[4] },
    { src: '/img/pixel.png', title: customTitles[5], description: customDescriptions[5] },
    { src: '/img/popart.png', title: customTitles[6], description: customDescriptions[6] },
    { src: '/img/retro.png', title: customTitles[7], description: customDescriptions[7] },
    { src: '/img/watercolor.png', title: customTitles[8], description: customDescriptions[8] },
  ];

  return { props: { images } };
}

export default function Home({ images }: { images: Image[] }) {
  const [selected, setSelected] = useState<Image | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-black'} min-h-screen p-6`}>
      <div className="relative mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">Галерея КАРТИНИ 🖼️</h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="fixed top-20 right-5 z-50 border px-3 py-1 rounded bg-neutral-800 text-white shadow-md hover:bg-neutral-700"
        >
          {theme === 'dark' ? '☀️ Світла тема' : '🌙 Темна тема'}
        </button>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Переглянути галерею
        </button>
      </div>

      {isOpen && (
        <ImageGallery />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg">
            <img
              src={img.src}
              alt={img.title}
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
      className="relative w-full max-w-[900px] max-h-[90vh] overflow-hidden bg-neutral-900 rounded-xl shadow-lg flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Кнопка закриття */}
      <button
        onClick={() => setSelected(null)}
        className="absolute top-3 right-3 text-white bg-black bg-opacity-50 hover:bg-opacity-80 px-3 py-1 rounded"
      >
        ✕
      </button>

      {/* Блок із зображенням і кнопками */}
      <div className="flex items-center justify-center relative w-full h-full max-h-[70vh] overflow-hidden">
        {/* Стрілка вліво */}
        <button className="absolute left-0 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white rounded-l">
          ◀
        </button>

        {/* Зображення */}
        <img
          src={selected.src}
          alt={selected.title}
          className="object-contain max-h-[70vh] w-auto mx-4"
        />

        {/* Стрілка вправо */}
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white rounded-r">
          ▶
        </button>
      </div>

      {/* Опис з прозорістю */}
      <div className="w-full px-4 py-3 mt-3 bg-black bg-opacity-50 text-white text-center text-base rounded-b-xl">
        <h2 className="text-xl font-semibold mb-1">{selected.title}</h2>
        <p className="text-sm">{selected.description}</p>
      </div>
    </div>
  </div>,
  document.body
)}

    </main>
  );
}