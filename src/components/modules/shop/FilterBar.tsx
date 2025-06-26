"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import { getCategories } from "@/src/services/Categories";

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (categoryName: string) => void;
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
  const [categories, setCategories] = useState<string[]>([]); // Initialize with "All Filter"
  const sortOptions = ["New In", "price-low-to-high", "price-high-to-low"];

  // Fetch categories on initial load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const fetchedCategories = response?.data?.data;

        if (Array.isArray(fetchedCategories)) {
          setCategories([...fetchedCategories.map((cat: any) => cat.categoryName)]);
        } else if (fetchedCategories && fetchedCategories.categories && Array.isArray(fetchedCategories.categories)) {
          setCategories([...fetchedCategories.categories.map((cat: any) => cat.categoryName)]);
        } else {
          console.error("Fetched categories data is not in an expected format:", fetchedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Fetch categories once when the component mounts

  // This will trigger the parent to update both the category and sort filters
  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
  };

  const handleSortChange = (sortOption: string) => {
    onSortChange(sortOption);
  };

  return (
    <div className="w-full flex justify-between items-center mb-8">
      <div className="flex flex-grow gap-4 lg:gap-6">
        {categories.map((label) => (
          <button
            key={label}
            className={`px-4 py-2 border rounded-none text-lg transition
              ${selectedCategory.toLowerCase() === label.toLowerCase()
                ? "border-orange-300 bg-orange-400 text-white"
                : "border-orange-200 text-default-900 hover:bg-gray-100"
              }`}
            onClick={() => handleCategoryChange(label)}
          >
            <div className="flex items-center gap-2">
              {label}
            </div>
          </button>
        ))}
      </div>

      <div className="flex">
        <select
          className="border border-orange-200 rounded-none px-4 py-2 text-lg text-default-900 bg-white cursor-pointer shadow-sm hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
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
