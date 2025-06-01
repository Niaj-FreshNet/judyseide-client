'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import Container from '@/src/components/UI/Container';
import SectionTitle from '@/src/components/UI/SectionTitle';
import ReviewCard from '@/src/components/UI/ReviewCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    stars: 5,
    title: "Psum elit viverra scelerisque",
    description:
      "We were extremely pleased with the roofing replacement Infinity Exteriors did for us! They got our job ready and on the schedule quickly. Our project manager kept us informed throughout.",
    name: "John Doe",
    date: "September 12, 2022",
    image: "/reviewers/john.jpg",
  },
  {
    stars: 4,
    title: "Psum elit viverra scelerisque",
    description:
      "We were extremely pleased with the roofing replacement Infinity Exteriors did for us! They got our job ready and on the schedule quickly. Our project manager kept us informed throughout.",
    name: "John Doe",
    date: "September 12, 2022",
    image: "/reviewers/john.jpg",
  },
  {
    stars: 3,
    title: "Psum elit viverra scelerisque",
    description:
      "We were extremely pleased with the roofing replacement Infinity Exteriors did for us! They got our job ready and on the schedule quickly. Our project manager kept us informed throughout.",
    name: "John Doe",
    date: "September 12, 2022",
    image: "/reviewers/john.jpg",
  },
  {
    stars: 2,
    title: "Psum elit viverra scelerisque",
    description:
      "We were extremely pleased with the roofing replacement Infinity Exteriors did for us! They got our job ready and on the schedule quickly. Our project manager kept us informed throughout.",
    name: "John Doe",
    date: "September 12, 2022",
    image: "/reviewers/john.jpg",
  },
  {
    stars: 5,
    title: "Psum elit viverra scelerisque",
    description:
      "We were extremely pleased with the roofing replacement Infinity Exteriors did for us! They got our job ready and on the schedule quickly. Our project manager kept us informed throughout.",
    name: "John Doe",
    date: "September 12, 2022",
    image: "/reviewers/john.jpg",
  },
  {
    stars: 3,
    title: "Psum elit viverra scelerisque",
    description:
      "We were extremely pleased with the roofing replacement Infinity Exteriors did for us! They got our job ready and on the schedule quickly. Our project manager kept us informed throughout.",
    name: "John Doe",
    date: "September 12, 2022",
    image: "/reviewers/john.jpg",
  },
];

export default function ReviewSection() {
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
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle
        title="Customer Reviews"
        subtitle=""
        align="left"
        titleClassName="text-default-900" />

      <div className="relative">
        {/* Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-[#FB923C] shadow-md shadow-gray-400 p-2 rounded-full"
        >
          <ChevronLeft size={28} color="white" />
        </button>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {reviews.map((review, index) => (
              <div
                className="min-w-[250px] flex-[0_0_90%] sm:flex-[0_0_60%] md:flex-[0_0_33%] lg:flex-[0_0_25%]"
                key={index}
              >
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-[#FB923C] shadow-md shadow-gray-400 p-2 rounded-full"
        >
          <ChevronRight size={28} color="white" />
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full ${index === selectedIndex ? 'bg-orange-100' : 'bg-orange-400'
              }`}
          />
        ))}
      </div>
    </div>
  );
}
