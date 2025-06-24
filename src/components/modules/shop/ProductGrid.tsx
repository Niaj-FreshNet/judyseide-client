"use client";

import { Category, Material } from "@/src/types";
import { Variant } from "framer-motion";
import ProductCardForAllProductsPage from "../../UI/ProductCardForAllProductsPage";

type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // Changed from Array<string> to string[] for simplicity
  tags: string[];
  salesCount: number;
  published: boolean;
  materialId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category; // Assuming 'category' is an object based on the response
  material: Material; // Assuming 'material' is an object based on the response
  variants: Variant[]; // Assuming 'variants' is an array of objects
};

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
        <ProductCardForAllProductsPage key={index} showAddToBag product={product} />
      ))}
    </div>
  );
}
