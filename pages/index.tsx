import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const images = [
  { src: "/img/abstract.png", title: "Абстрактне мистецтво" },
  { src: "/img/watercolor.png", title: "Акварель" },
  { src: "/img/minimal.png", title: "Мінімалізм" },
  { src: "/img/popart.png", title: "Поп-арт" },
  { src: "/img/retro.png", title: "Ретро стиль" },
  { src: "/img/futurism.png", title: "Футуризм" },
  { src: "/img/autumn.png", title: "Осінь" },
  { src: "/img/graffiti.png", title: "Графіті" },
  { src: "/img/pixel.png", title: "Піксельна" },
];

export default function GalleryPage() {
  const [index, setIndex] = useState(0);
  const current = images[index];

  const next = () => setIndex((index + 1) % images.length);
  const prev = () => setIndex((index - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Галерея КАРТИНИ</h1>
      <p className="max-w-xl text-center text-neutral-400 mb-8">
        Ця віртуальна колекція — подорож крізь стиль, колір і настрій. Автор надихнувся роботами <strong>Головного героя</strong>, щоб створити унікальний набір візуальних емоцій. Кожна картина — окремий світ.
      </p>

      <div className="relative w-full max-w-2xl aspect-[4/3] border-4 border-white rounded-xl overflow-hidden shadow-lg">
        <Image
          src={current.src}
          alt={current.title}
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button onClick={prev} variant="ghost" className="text-white bg-black/40 hover:bg-black/60">
            ⬅ Назад
          </Button>
          <Button onClick={next} variant="ghost" className="text-white bg-black/40 hover:bg-black/60">
            Вперед ➡
          </Button>
        </div>
      </div>

      <div className="mt-4 text-lg text-center">{current.title}</div>

      <footer className="mt-12 text-neutral-400 text-sm text-center">
        Контакти: <a href="https://t.me/jeffersonx" target="_blank" className="underline">Телеграм @jeffersonx</a>
      </footer>
    </div>
  );
}
