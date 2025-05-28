import SectionTitle from "@/src/components/UI/SectionTitle";
import Image from "next/image";
import { ZoomIn } from "lucide-react"; // or import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function GallerySection() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-orange-400">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="A Piece of Something Awesome"
          subtitle="Lorem ipsum dolor sit amet consectetur. Placerat vitae et fringilla sit pellentesque mattis. Eu lacus lobortis mollis nec dolor eleifend donec. Donec in a vitae proin a. Volutpat feugiat nibh in lobortis. Lorem commodo platea tristique turpis est id. Cursus in eu"
          align="center"
          titleClassName="text-white"
          subtitleClassName="text-white"
        />

        <div className="grid grid-cols-5 grid-rows-2 gap-4 h-[600px] mt-8">
  {/* Image 1: Portrait - slightly wider now */}
  <GalleryImage
    src="/gallery/img1.jpg"
    alt="Portrait"
    className="col-span-2 row-span-2"
  />

  {/* Top Right Row (Images 2 & 3) */}
  <GalleryImage
    src="/gallery/img2.jpg"
    alt="Wide short"
    className="col-span-2 row-span-1"
  />
  <GalleryImage
    src="/gallery/img3.jpg"
    alt="Square"
    className="col-span-1 row-span-1"
  />

  {/* Bottom Right Row (Images 4 & 5) */}
  <GalleryImage
    src="/gallery/img4.jpg"
    alt="Square"
    className="col-span-1 row-span-1"
  />
  <GalleryImage
    src="/gallery/img5.jpg"
    alt="Wide short"
    className="col-span-2 row-span-1"
  />
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
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Overlay with Zoom Icon */}
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <ZoomIn className="text-white w-8 h-8" />
      </div>
    </div>
  );
}
