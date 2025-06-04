"use client";

import { SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  // filterCount: number;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSort: string;
  onSortChange: (sortOption: string) => void;
}

const categories = ["All Filter", "Earrings", "Bracelets", "Necklaces", "Rings"];

export default function FilterBar({
  // filterCount,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
}: FilterBarProps) {
  const sortOptions = ["New In", "Price: Low to High", "Price: High to Low"];
  // console.log("selectedCategory: ", selectedCategory)

  return (
    <div className="flex flex-wrap justify-between items-center mb-8">
      <div className="flex flex-wrap gap-4 lg:gap-6">
        {categories.map((label) => (
          <button
            key={label}
            className={`px-4 py-2 border rounded-none text-lg transition
                            ${
                              selectedCategory === label.trim().toLowerCase() ||
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
