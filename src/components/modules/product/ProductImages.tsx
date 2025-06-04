"use client";

import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

export default function ProductImages({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const galleryRef = useRef<any>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const zoomEl = zoomRef.current;

    if (!zoomEl) return;

    const { left, top, width, height } = zoomEl.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    zoomEl.style.backgroundPosition = `${x}% ${y}%`;
  };

  const handleMouseLeave = () => {
    const zoomEl = zoomRef.current;

    if (zoomEl) {
      zoomEl.style.backgroundPosition = "center";
    }
  };

  return (
    <div className="w-full flex flex-col mx-auto gap-6">
      {/* LightGallery wrapper */}
      <LightGallery
        dynamic
        dynamicEl={images.map((src) => ({ src }))}
        plugins={[lgZoom, lgThumbnail]}
        speed={500}
        thumbnail={false}
        onInit={(ref) => {
          galleryRef.current = ref.instance;
        }}
      >
        <div
          className="relative ..."
          role="button"
          tabIndex={0}
          onClick={() => {
            galleryRef.current?.openGallery(images.indexOf(selectedImage));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              galleryRef.current?.openGallery(images.indexOf(selectedImage));
            }
          }}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div
            ref={zoomRef}
            className="w-full h-full bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url(${selectedImage})` }}
          >
            {/* Hidden <Image> just for Next.js optimization */}
            <Image
              alt="Main product image"
              className="opacity-0 w-full h-full"
              height={512}
              src={selectedImage}
              width={648}
            />
          </div>
        </div>
      </LightGallery>

      {/* Thumbnails */}
      <div className="flex mt-4 gap-6">
        {images.map((img, idx) => (
          <Image
            key={idx}
            alt={`Thumbnail ${idx}`}
            className={`rounded-none border cursor-pointer object-cover ${
              selectedImage === img
                ? "border-2 border-orange-500 ring-2 ring-orange-300"
                : "border border-orange-200 hover:ring-2 ring-orange-400"
            }`}
            height={112}
            src={img}
            width={112}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>
    </div>
  );
}
