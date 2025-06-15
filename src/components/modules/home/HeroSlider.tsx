"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { ArrowLeftIcon, ArrowRightIcon } from "../../icons";
import Link from "next/link";

const slides = [
  {
    image: "/carousel/hero1.jpg",
    title: "Forever looks great on anyone!",
    button: "Shop Jewelry",
  },
  {
    image: "/carousel/hero1.jpg",
    title: "Elegance in Every Detail",
    button: "Shop Jewelry",
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Scroll handlers
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  // Sync selected index
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(); // set initial index
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="max-w-full mx-auto relative overflow-hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full relative h-screen">
              <Image
                width={1200}
                height={600}
                alt={slide.title}
                className="object-cover w-full h-full"
                src={slide.image} />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">{slide.title}</h2>
                <Link href="/new-in">
                  <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded font-sans font-medium transition">
                    {slide.button}
                  </button></Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 p-2 rounded-full text-white/70 hover:text-white/100 transition"
        onClick={scrollPrev}
      >
        <ArrowLeftIcon />
      </button>
      <button
        className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 p-2 rounded-full text-white/70 hover:text-white/100 transition"
        onClick={scrollNext}
      >
        <ArrowRightIcon />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === index ? "bg-orange-500" : "bg-white/50"
              }`}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
