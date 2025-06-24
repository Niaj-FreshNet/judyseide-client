"use client";

import ProductCard from "@/src/components/UI/ProductCard";
import { Product } from "@/src/types";

interface ProductGridProps {
  products: Product[];
  cols?: number;
}

export default function ProductGrid({ products, cols = 4 }: ProductGridProps) {
  const colClass =
    cols === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
    console.log("ProductGrid products:", products); // Debugging log

  return (
    <div className={`grid ${colClass} gap-3 md:gap-6 lg:gap-8`}>
      {products?.map((product, index) => (
        <ProductCard key={index} showAddToBag product={product} />
      ))}
    </div>
  );
}
