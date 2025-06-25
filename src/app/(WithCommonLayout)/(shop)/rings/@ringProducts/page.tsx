"use client";

import { useState, useEffect } from "react";
import AllFilters, { SortByOption } from "@/src/components/modules/shop/AllFilters";
import FilterBar from "@/src/components/modules/shop/FilterBar";
import ProductGrid from "@/src/components/modules/shop/ProductGrid";
import LoadMoreFooter from "@/src/components/modules/shop/LoadMoreFooter";
import { getProducts } from "@/src/services/Products";
import { SlidersHorizontal } from "lucide-react";
import { Filters, Product } from "@/src/types";
import ProductGridLoading from "@/src/components/loading/ProductGridLoading";

const PRODUCTS_PER_PAGE = 9;

interface AllProductsClientProps {
  allProducts: Product[];
}

export default function Page({ allProducts }: AllProductsClientProps) {
  const [showAllFilters, setShowAllFilters] = useState(false); // Initially, filter options are hidden
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
    categoryName: "RINGS",
    material: "",
  });

  const [products, setProducts] = useState([]); // State for holding the fetched products
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch the products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(""); // Reset error before fetching
      try {
        const { products: fetchedProducts } = await getProducts(filters, 1, PRODUCTS_PER_PAGE);
        setProducts(fetchedProducts); // Update products state with fetched data
      } catch (error) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]); // Re-run the effect whenever the filters change

  // Toggle function for All Filter button
  const toggleAllFilters = () => {
    setShowAllFilters(!showAllFilters);
  };

  return (
    <>
      <div className="w-full flex">
        <div className="w-1/6">
          <button
            className={`mr-0 border px-4 py-2 rounded-none text-lg transition
    ${showAllFilters
                ? "border-orange-400 bg-orange-500 text-white"
                : "border-orange-200 text-default-900 hover:bg-gray-100"
              }`}
            onClick={toggleAllFilters} // Toggle the visibility of the filter options
          >
            <div className="flex items-center">
              <span className="mr-2">All Filter</span>
              <span className="ml-1 text-gray-200 font-medium">
                <SlidersHorizontal size={20} />
              </span>
            </div>
          </button>
        </div>
        {/* Filter Bar remains static, unaffected by loading state */}
        <div className="w-full -ml-8">
          <FilterBar
            selectedCategory={filters.categoryName}
            selectedSort={filters.sortBy}
            onCategoryChange={(cat) => {
              // Update the filters and trigger the product fetch
              setFilters((f) => ({
                ...f,
                categoryName: cat, // Set category filter

              }));
            }}
            onSortChange={(sort) => {
              // Update the filters for sorting and trigger the product fetch
              setFilters((f) => ({
                ...f,
                sortBy: sort as SortByOption,
              }));
            }}
          />
        </div>
      </div>

      <div className="flex gap-6">
        {/* Only show All Filters when showAllFilters is true */}
        {showAllFilters && (
          <div className="hidden lg:block w-1/4">
            {/* Filter options should not be loading */}
            <AllFilters filters={filters} setFilters={setFilters} isLoading={false} />
          </div>
        )}

        <div className={showAllFilters ? "lg:w-3/4" : "w-full"}>
          {/* Only the product grid should show loading skeleton */}
          {loading ? (
            <ProductGridLoading /> // Show loading skeleton only for the product grid
          ) : (
            <>
              <ProductGrid cols={showAllFilters ? 3 : 4} products={products} />
              <LoadMoreFooter
                total={products.length}
                viewed={visibleCount}
                onLoadMore={() =>
                  setVisibleCount((prev) => Math.min(prev + PRODUCTS_PER_PAGE, products.length))
                }
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
