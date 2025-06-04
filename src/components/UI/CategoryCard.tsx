import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CategoryCardProps {
  categoryName: string;
  imageUrl?: string;
}

export function CategoryCard({ categoryName, imageUrl }: CategoryCardProps) {
  return (
    <div className="w-full text-center font-semibold">
      <Link href={`/shop/${categoryName.toLowerCase()}`}>
        <div className="w-full h-96 bg-gray-100 flex items-center justify-center mb-2 overflow-hidden">
          {imageUrl ? (
            <Image alt={categoryName} className="w-full h-full object-cover" src={imageUrl} />
          ) : (
            <div className="text-7xl text-gray-300">{categoryName.charAt(0)}</div>
          )}
        </div>
        <h3 className="text-xl text-black my-2 uppercase tracking-wider">{categoryName}</h3>
      </Link>
    </div>
  );
}
