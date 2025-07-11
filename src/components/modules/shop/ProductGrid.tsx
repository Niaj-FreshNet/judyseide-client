// In ProductGrid component
"use client";

import { Category, Material, Variant } from "@/src/types"; // Use Variant from your types
import ProductCardForAllProductsPage from "../../UI/ProductCardForAllProductsPage";

// Update the Product type to match the one in src/types/index.ts
type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string[]; // Update to string[] to match the expected type
  tags: string[];
  salesCount: number;
  published: boolean;
  materialId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category[];
  material: Material[];
  variants: Variant[];
};

interface ProductGridProps {
  products: Product[];
  cols?: number;
}

export default function ProductGrid({ products, cols = 4 }: ProductGridProps) {
  const colClass =
    cols === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${colClass} gap-3 md:gap-6 lg:gap-8`}>
      {products?.map((product, index) => (
        <ProductCardForAllProductsPage key={index} showAddToBag product={product} />
      ))}
    </div>
  );
}
