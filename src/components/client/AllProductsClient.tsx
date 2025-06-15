"use client";

import { useState } from "react";
import AllFilters, {
  CategoryOption,
  Filters,
  SortByOption,
} from "@/src/components/modules/shop/AllFilters";
import FilterBar from "@/src/components/modules/shop/FilterBar";
import ProductGrid from "@/src/components/modules/shop/ProductGrid";
import LoadMoreFooter from "@/src/components/modules/shop/LoadMoreFooter";

const PRODUCTS_PER_PAGE = 9;

type Product = {
  name: string;
  price: number;
  imageUrl: string;
  badge: string;
  material: { name: string };
  category: string;
  slug: string;
};

export default function AllProductsClient({ allProducts }: { allProducts: Product[] }) {
  const [showAllFilters, setShowAllFilters] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [filters, setFilters] = useState<Filters>({
    availability: { inStock: false, outOfStock: false },
    price: {
      under150: false,
      "150to300": false,
      "300to500": false,
      above500: false,
    },
    sortBy: "price-low-to-high",
    category: "",
    material: "",
  });

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesCategory =
        !filters.category ||
        product.category.replace(/\s+/g, "").toLowerCase() ===
        filters.category.replace(/\s+/g, "").toLowerCase();

      const matchesMaterial =
        !filters.material || product.material?.name.toLowerCase() === filters.material;

      return matchesCategory && matchesMaterial;
    })
    .sort((a, b) => {
      if (filters.sortBy === "price-low-to-high") return a.price - b.price;
      if (filters.sortBy === "price-high-to-low") return b.price - a.price;
      return 0;
    });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <>
      <FilterBar
        selectedCategory={filters.category}
        selectedSort={filters.sortBy}
        onCategoryChange={(cat) => {
          if (cat === "All Filter") {
            setShowAllFilters((prev) => !prev);
            setFilters((f) => ({
              ...f,
              category: "",
            }));
          } else {
            const formattedCategory = cat.toLowerCase() as CategoryOption;
            setFilters((f) => ({
              ...f,
              category: formattedCategory,
            }));
          }
        }}
        onSortChange={(sort) => {
          setFilters((f) => ({
            ...f,
            sortBy: sort as SortByOption,
          }));
        }}
      />

      <div className="flex gap-6">
        {showAllFilters && (
          <div className="hidden lg:block w-1/4">
            <AllFilters filters={filters} setFilters={setFilters} />
          </div>
        )}

        <div className={`${showAllFilters ? "lg:w-3/4" : "w-full"}`}>
          <ProductGrid cols={showAllFilters ? 3 : 4} products={visibleProducts} />
          <LoadMoreFooter
            total={filteredProducts.length}
            viewed={visibleCount}
            onLoadMore={() =>
              setVisibleCount((prev) =>
                Math.min(prev + PRODUCTS_PER_PAGE, filteredProducts.length)
              )
            }
          />
        </div>
      </div>
    </>
  );
}
