"use client";

import { useState, useEffect } from "react";
import FilterBar from "@/src/components/modules/shop/FilterBar";
import ProductGrid from "@/src/components/modules/shop/ProductGrid";
import LoadMoreFooter from "@/src/components/modules/shop/LoadMoreFooter";
import { Category, Filters, Product } from "@/src/types";
import { getProducts } from "@/src/services/Products";
import AllFilters, { CategoryOption, SortByOption } from "@/src/components/modules/shop/AllFilters";
import { getCategories } from "@/src/services/Categories";

const PRODUCTS_PER_PAGE = 9;

export default function EarringProductPage() {
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

  const [allProducts, setAllProducts] = useState<Product[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);

  // Function to fetch filtered products
  const fetchFilteredProducts = async () => {
    setLoading(true);
    try {
      const products = await getProducts(filters, 1, visibleCount);
      console.log("Fetched products:", products); // Debugging log

      // Ensure the response is in the expected format
      if (Array.isArray(products)) {
        setAllProducts(products); // Set products if the response is valid
      } else {
        setAllProducts([]); // Set empty array in case of unexpected response format
      }
    } catch (error) {
      console.error("Failed to fetch filtered products", error);
      setAllProducts([]); // Ensure we don't set undefined in case of error
    } finally {
      setLoading(false);
    }
  };

  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories using the provided function
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  // Fetch products whenever filters or pagination change
  useEffect(() => {
    fetchFilteredProducts();
  }, [filters, visibleCount]);

  // Ensure visibleProducts has a fallback in case of issues
  const visibleProducts = allProducts.slice(0, visibleCount);

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
            const selectedCategory = categories.find(
              (category) => category.name.toLowerCase() === cat.toLowerCase()
            );
            if (selectedCategory) {
              setFilters((f) => ({
                ...f,
                category: selectedCategory.id, // Use category ID instead of name
              }));
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
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ProductGrid cols={showAllFilters ? 3 : 4} products={visibleProducts} />
          )}
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
