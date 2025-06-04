import Image from "next/image";
import { ZoomIn } from "lucide-react";

import SectionTitle from "@/src/components/UI/SectionTitle";

export default function GallerySection() {
  return (
    <section className="mt-16 py-12 md:py-16 lg:py-20 bg-orange-400">
      <div className="mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle
          align="center"
          subtitle="Lorem ipsum dolor sit amet consectetur. Placerat vitae et fringilla sit pellentesque mattis. Eu lacus lobortis mollis nec dolor eleifend donec. Donec in a vitae proin a. Volutpat feugiat nibh in lobortis. Lorem commodo platea tristique turpis est id. Cursus in eu"
          subtitleClassName="text-white"
          title="A Piece of Something Awesome"
          titleClassName="text-white"
        />

        {/* Desktop & Tablet layout (md and up) */}
        <div className="hidden max-w-screen-2xl mx-auto h-[600px] px-8 lg:px-24 md:grid grid-cols-5 grid-rows-2 gap-4 mt-8">
          <GalleryImage alt="Portrait" className="col-span-2 row-span-2" src="/gallery/img1.jpg" />
          <GalleryImage
            alt="Wide short"
            className="col-span-2 row-span-1"
            src="/gallery/img2.jpg"
          />
          <GalleryImage alt="Square" className="col-span-1 row-span-1" src="/gallery/img3.jpg" />
          <GalleryImage alt="Square" className="col-span-1 row-span-1" src="/gallery/img4.jpg" />
          <GalleryImage
            alt="Wide short"
            className="col-span-2 row-span-1"
            src="/gallery/img5.jpg"
          />
        </div>

        {/* Mobile layout (below md) */}
        <div className="grid md:hidden grid-cols-2 gap-3 mt-8">
          {["img1", "img2", "img3", "img4", "img5"].map((img, idx) => (
            <GalleryImage
              key={idx}
              alt={`Gallery ${idx + 1}`}
              className={`aspect-square ${idx === 4 ? "col-span-2" : ""}`}
              src={`/gallery/${img}.jpg`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
}

function GalleryImage({ src, alt, className = "" }: GalleryImageProps) {
  return (
    <div className={`relative group overflow-hidden ${className}`}>
      <Image
        fill
        alt={alt}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        src={src}
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <ZoomIn className="text-white w-8 h-8" />
      </div>
    </div>
  );
}
