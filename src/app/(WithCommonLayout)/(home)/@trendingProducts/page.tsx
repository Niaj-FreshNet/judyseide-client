"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Container from "@/src/components/UI/Container";
import ProductCard from "@/src/components/UI/ProductCard";
import SectionTitle from "@/src/components/UI/SectionTitle";

const sampleProducts = [
  {
    name: "Starburst Earrings",
    price: 756,
    image: "/hero1.jpg",
    badge: "Best selling",
    material: "18k Gold Vermeil",
  },
  {
    name: "Starburst Earrings",
    price: 756,
    image: "/products/product1.jpg",
    badge: "Best selling",
    material: "18k Gold Vermeil",
  },
  {
    name: "Starburst Earrings",
    price: 756,
    image: "/products/product1.jpg",
    badge: "Best selling",
    material: "18k Gold Vermeil",
  },
  {
    name: "Starburst Earrings",
    price: 756,
    image: "/products/product1.jpg",
    badge: "Best selling",
    material: "18k Gold Vermeil",
  },
  {
    name: "Starburst Earrings",
    price: 756,
    image: "/products/product1.jpg",
    badge: "Best selling",
    material: "18k Gold Vermeil",
  },
];

export default function TrendingProducts() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <SectionTitle
          align="left"
          subtitle=""
          title="Top Trending Products"
          titleClassName="text-default-900"
        />

        <div className="relative">
          {/* Arrows */}
          <button
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-[#FB923C] shadow-md shadow-gray-400 p-2 rounded-full"
            onClick={scrollPrev}
          >
            <ChevronLeft color="white" size={28} />
          </button>

          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-4">
              {sampleProducts.map((product, index) => (
                <div
                  key={index}
                  className="min-w-[250px] flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33%] lg:flex-[0_0_25%]"
                >
                  <ProductCard showAddToBag product={product} />
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-[#FB923C] shadow-md shadow-gray-400 p-2 rounded-full"
            onClick={scrollNext}
          >
            <ChevronRight color="white" size={28} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${
                index === selectedIndex ? "bg-orange-100" : "bg-orange-400"
              }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
