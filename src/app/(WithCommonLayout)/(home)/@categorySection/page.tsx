import React from "react";

import { CategoryCard } from "@/src/components/UI/CategoryCard";

interface Category {
  name: string;
  image: string;
}

export default function CategorySection() {
  const categories: Category[] = [
    { name: "EARRINGS", image: "/category/earrings.jpg" },
    { name: "BRACELETS", image: "/category/bracelets.jpg" },
    { name: "NECKLACES", image: "/category/necklaces.jpg" },
    { name: "RINGS", image: "/category/rings.jpg" },
  ];

  return (
    <section className="max-w-full mx-auto text-center bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto border-b border-r border-l border-black">
        {categories.map((category, index) => (
          <div key={index} className="p-4 border-b border-r border-l border-black">
            <CategoryCard categoryName={category.name} imageUrl={category.image} />
          </div>
        ))}
      </div>
    </section>
  );
}
