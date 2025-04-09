import { useState } from 'react';
import { createPortal } from 'react-dom';
import ImageWithZoom from "@/components/ImageWithZoom";

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
  const [showReadme, setShowReadme] = useState(false);

  return (
    <main className={`${theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-white text-black'} min-h-screen p-6`}>
      {/* 🔵 Кнопка "README" вгорі зліва */}
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => setShowReadme(true)}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xl flex items-center justify-center shadow-lg"
          title="Про галерею"
        >
          🛈
        </button>
      </div>

      {/* 🖼️ Заголовок */}
      <div className="relative mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold">Галерея КАРТИНИ 🖼️</h1>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="mt-4 border px-3 py-1 rounded bg-neutral-800 text-white shadow-md hover:bg-neutral-700"
        >
          {theme === 'dark' ? '☀️ Світла тема' : '🌙 Темна тема'}
        </button>
      </div>

      {/* 🖼️ Сітка картин */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img, index) => (
          <div key={index} className="rounded-xl overflow-hidden shadow-lg">
            <ImageWithZoom image={img} onClick={() => setSelected(img)} />
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

      {/* 🔲 Модалка READ-ME */}
      {showReadme && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowReadme(false)}
        >
          <div
            className="bg-white text-black max-w-xl w-full p-6 rounded-xl shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowReadme(false)}
              className="absolute top-3 right-3 text-black hover:text-red-600 text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">Про цю галерею 🖼️</h2>
            <p className="text-sm leading-relaxed">
              Це онлайн-галерея, створена для демонстрації NFT-картин у різних стилях. Тут ви можете:
              переглядати зображення, збільшувати їх, гортати та навіть придбати як NFT. Проєкт створено з
              любов’ю до мистецтва і технологій. 💛
            </p>
          </div>
        </div>
      )}

      {/* 🖼️ Модалка з зображенням */}
      {selected && createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div
            className="relative w-full max-w-[90%] max-h-[90vh] overflow-hidden bg-neutral-900 rounded-xl shadow-lg flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-white bg-black bg-opacity-50 hover:bg-opacity-80 px-3 py-1 rounded"
            >
              ✕
            </button>

            <div className="relative w-full h-full flex justify-center items-center">
              <img
                src={selected.src}
                alt={selected.title}
                className="object-contain max-h-[80vh] max-w-full mx-auto"
              />
            </div>

            <div className="w-full px-4 py-3 mt-3 bg-black bg-opacity-40 text-white text-center text-base rounded-b-xl">
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
