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
  image: string;
  badge: string;
  material: string;
  category: string;
  slug: string;
};

const productNames = [
  "Starburst Earrings",
  "Celestial Hoops",
  "Twilight Necklace",
  "Sunray Bracelet",
  "Aurora Ring",
  "Galaxy Studs",
  "Lunar Cuff",
  "Starlit Pendant",
  "Nova Bangles",
  "Meteorite Earrings",
  "Solar Choker",
  "Radiant Ring",
  "Orbit Bracelet",
  "Comet Hoops",
  "Shimmer Studs",
  "Eclipse Pendant",
];

const badges = ["Best selling", "New Arrival", "Limited Edition", "Exclusive"];

const allProducts: Product[] = Array(16)
  .fill(null)
  .map((_, i) => ({
    name: productNames[i],
    price: 756 - i * 10,
    image: `/products/product${(i % 2) + 1}.jpg`,
    badge: badges[i % badges.length],
    material: "18k Gold Vermeil",
    category: ["Earrings", "Bracelets", "Necklaces", "Rings"][i % 4],
    slug: productNames[i].toLowerCase().replace(/\s+/g, "-"),
  }));

export default function AllProductPage() {
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

  const isAllFilterView = showAllFilters;

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesCategory =
        !filters.category ||
        product.category.replace(/\s+/g, "").toLowerCase() ===
        filters.category.replace(/\s+/g, "").toLowerCase();
      const matchesMaterial =
        !filters.material || product.material.toLowerCase() === filters.material;

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
        {isAllFilterView && (
          <div className="hidden lg:block w-1/4">
            <AllFilters filters={filters} setFilters={setFilters} />
          </div>
        )}

        <div className={`${isAllFilterView ? "lg:w-3/4" : "w-full"}`}>
          <ProductGrid cols={isAllFilterView ? 3 : 4} products={visibleProducts} />
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
