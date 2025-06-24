"use client";

import { useState, useEffect } from "react";
import AllFilters, { Filters, SortByOption } from "@/src/components/modules/shop/AllFilters";
import FilterBar from "@/src/components/modules/shop/FilterBar";
import ProductGrid from "@/src/components/modules/shop/ProductGrid";
import LoadMoreFooter from "@/src/components/modules/shop/LoadMoreFooter";
import { Category, Material } from "@/src/types";
import { getProducts } from "@/src/services/Products"; // Import the getProducts function

const PRODUCTS_PER_PAGE = 9;

export default function AllProductsClient() {
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

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            setFilters((f) => ({
              ...f,
              category: cat, // Use the category name or ID based on your API
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
          <ProductGrid cols={showAllFilters ? 3 : 4} products={products} />
          <LoadMoreFooter
            total={products.length}
            viewed={visibleCount}
            onLoadMore={() =>
              setVisibleCount((prev) => Math.min(prev + PRODUCTS_PER_PAGE, products.length))
            }
          />
        </div>
      </div>
    </>
  );
}
