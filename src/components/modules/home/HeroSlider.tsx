'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '../../icons';

const slides = [
  {
    image: '/carousel/hero1.jpg',
    title: 'Forever looks great on anyone!',
    button: 'Shop Jewelry',
  },
  {
    image: '/carousel/hero1.jpg',
    title: 'Elegance in Every Detail',
    button: 'Explore Now',
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  return (
    <div className="relative overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            // needs to be edited for adjustment
            <div className="min-w-full relative h-svh" key={index}>
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">
                  {slide.title}
                </h2>
                <button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded font-sans font-medium transition">
                  {slide.button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 p-2 rounded-full text-white/70 hover:text-white/100 transition"
      >
      <ArrowLeftIcon />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 p-2 rounded-full text-white/70 hover:text-white/100 transition"
      >
        <ArrowRightIcon />
      </button>
    </div>
  );
}
