"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { getCategories } from "@/src/services/Categories";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSort: string;
  onSortChange: (sortOption: string) => void;
  isLoading?: boolean;
}

export default function FilterBar({
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  isLoading = false,
}: FilterBarProps) {
  const [categories, setCategories] = useState<string[]>(["All Filter"]); // Initialize with "All Filter"
  const sortOptions = ["New In", "Price: Low to High", "Price: High to Low"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const fetchedCategories = response?.data?.data;

        console.log("Fetched categories:", fetchedCategories); // Check the structure of fetched categories

        if (Array.isArray(fetchedCategories)) {
          // If it's an array, proceed to set categories
          setCategories(["All Filter", ...fetchedCategories.map((cat: any) => cat.categoryName)]);
        } else if (fetchedCategories && fetchedCategories.categories && Array.isArray(fetchedCategories.categories)) {
          // If categories are inside `fetchedCategories.categories`
          setCategories(["All Filter", ...fetchedCategories.categories.map((cat: any) => cat.categoryName)]);
        } else {
          console.error("Fetched categories data is not in an expected format:", fetchedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap justify-between items-center mb-8">
      <div className="flex flex-wrap gap-4 lg:gap-6">
        {categories.map((label) => (
          <button
            key={label}
            className={`px-4 py-2 border rounded-none text-lg transition
               ${selectedCategory === (label?.trim()?.toLowerCase() || "") ||
                (label === "All Filter" && selectedCategory === "")
                ? "border-orange-300 bg-orange-400 text-white"
                : "border-orange-200 text-default-900 hover:bg-gray-100"
              }`}
            onClick={() => onCategoryChange(label)}
          >
            <div className="flex items-center gap-2">
              {label}
              {label === "All Filter" && (
                <span className="ml-1 text-gray-200 font-medium">
                  <SlidersHorizontal size={20} />
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="relative">
        <select
          className="border border-orange-200 rounded-none px-4 py-2 text-lg text-default-900 bg-white cursor-pointer shadow-sm hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
          value={selectedSort}
          onChange={(e) => onSortChange(e.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              Sort by: {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
