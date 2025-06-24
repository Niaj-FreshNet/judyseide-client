"use client";

import { useState } from "react";
import AllFilters, { Filters, SortByOption } from "@/src/components/modules/shop/AllFilters";
import FilterBar from "@/src/components/modules/shop/FilterBar";
import ProductGrid from "@/src/components/modules/shop/ProductGrid";
import LoadMoreFooter from "@/src/components/modules/shop/LoadMoreFooter";
import { Category, Product } from "@/src/types";
import { useCategory } from "@/src/hooks/category.hook";

const PRODUCTS_PER_PAGE = 9;

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

  const { categories, loading, error } = useCategory();  // Use the custom hook for categories

  console.log("allProducts:", allProducts); // Debugging log for allProducts

  // Directly use the `allProducts` without filtering or sorting
  const visibleProducts = Array.isArray(allProducts) ? allProducts.slice(0, visibleCount) : [];

  console.log("Visible Products:", visibleProducts); // Debugging log

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  console.log('filers:', filters); // Debugging log for filters
  console.log('setfilers:', setFilters); // Debugging log for filters


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
              category: "", // Clear the category filter
            }));
          } else {
            const selectedCategory = categories.find(
              (category) => category.categoryName.toLowerCase() === cat.toLowerCase()
            );
            if (selectedCategory) {
              setFilters((f) => ({
                ...f,
                category: selectedCategory.id, // Use category ID instead of name
              }));
            } else {
              console.error("Category not found:", cat);
            }
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
            total={allProducts.length}
            viewed={visibleCount}
            onLoadMore={() =>
              setVisibleCount((prev) =>
                Math.min(prev + PRODUCTS_PER_PAGE, allProducts.length)
              )
            }
          />
        </div>
      </div>
    </>
  );
}
