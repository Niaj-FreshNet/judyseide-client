"use client";

import { Checkbox } from "@heroui/checkbox";
import { Radio, RadioGroup } from "@heroui/radio";
import React from "react";

interface AvailabilityFilter {
  inStock: boolean;
  outOfStock: boolean;
}

interface PriceFilter {
  under150: boolean;
  "150to300": boolean;
  "300to500": boolean;
  above500: boolean;
}

export type CategoryOption = "earrings" | "bracelets" | "necklaces" | "rings" | "";
export type SortByOption = "price-low-to-high" | "price-high-to-low";
export type MaterialOption =
  | "14k yellow gold"
  | "18k gold vermeil"
  | "sterling silver"
  | "link"
  | "";

export interface Filters {
  availability: AvailabilityFilter;
  price: PriceFilter;
  sortBy: SortByOption;
  category: CategoryOption;
  material: MaterialOption;
}

interface AllFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  isLoading?: boolean;
}

export default function AllFilters({ filters, setFilters, isLoading = false }: AllFiltersProps) {

  if (isLoading) {
    return (
      <div className="bg-[#fef6f1] p-6 rounded-md border text-sm space-y-5 w-full animate-pulse">
        {/* Title */}
        <div className="h-6 w-1/3 bg-gray-300 rounded" />

        {/* Divider */}
        <div className="border-t border-orange-200" />

        {/* Sections */}
        {[...Array(5)].map((_, index) => (
          <div key={index} className="space-y-4">
            <div className="h-5 w-1/2 bg-gray-300 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
              <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>
            <div className="border-t border-orange-200" />
          </div>
        ))}

        {/* Button */}
        <div className="h-10 w-full bg-orange-300 rounded" />
      </div>
    );
  }

  const toggleFilter = (
    filterType: keyof Pick<Filters, "availability" | "price">,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: {
        ...prev[filterType],
        [value]: !prev[filterType][value as keyof (typeof prev)[typeof filterType]],
      },
    }));
  };

  const handleRadioChange = (
    filterType: "sortBy" | "category" | "material",
    value: SortByOption | CategoryOption | MaterialOption
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="bg-[#fef6f1] p-6 rounded-md border text-sm space-y-5 w-full">
      <h2 className="text-lg font-semibold text-gray-800">All Filters</h2>
      <hr className="border-t border-orange-200" />

      {/* Availability */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Availability</h3>
        <div className="flex flex-col gap-2">
          <Checkbox
            isSelected={filters.availability.inStock}
            onValueChange={() => toggleFilter("availability", "inStock")}
          >
            In Stock
          </Checkbox>
          <Checkbox
            isSelected={filters.availability.outOfStock}
            onValueChange={() => toggleFilter("availability", "outOfStock")}
          >
            Out of Stock
          </Checkbox>
        </div>
      </div>

      <hr className="border-t border-orange-200" />

      {/* Price */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Price</h3>
        <div className="flex flex-col gap-2">
          <Checkbox
            isSelected={filters.price.under150}
            onValueChange={() => toggleFilter("price", "under150")}
          >
            Under 150
          </Checkbox>
          <Checkbox
            isSelected={filters.price["150to300"]}
            onValueChange={() => toggleFilter("price", "150to300")}
          >
            150 - 300
          </Checkbox>
          <Checkbox
            isSelected={filters.price["300to500"]}
            onValueChange={() => toggleFilter("price", "300to500")}
          >
            300 - 500
          </Checkbox>
          <Checkbox
            isSelected={filters.price.above500}
            onValueChange={() => toggleFilter("price", "above500")}
          >
            Above 500
          </Checkbox>
        </div>
      </div>

      <hr className="border-t border-orange-200" />

      {/* Sort by */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Sort by: Price</h3>
        <div className="flex flex-col gap-2">
          <RadioGroup
            value={filters.sortBy}
            onValueChange={(val) => handleRadioChange("sortBy", val as SortByOption)}
          >
            <Radio value="price-low-to-high">Price: Low to High</Radio>
            <Radio value="price-high-to-low">Price: High to Low</Radio>
          </RadioGroup>
        </div>
      </div>

      <hr className="border-t border-orange-200" />

      {/* Category */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Category</h3>
        <div className="flex flex-col gap-2">
          <RadioGroup
            value={filters.category}
            onValueChange={(val) => handleRadioChange("category", val as CategoryOption)}
          >
            {["Earrings", "Bracelets", "Necklaces", "Rings"].map((cat) => (
              <Radio key={cat} value={cat.toLowerCase()}>
                {cat}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>

      <hr className="border-t border-orange-200" />

      {/* Material */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Material</h3>
        <div className="flex flex-col gap-2">
          <RadioGroup
            value={filters.material}
            onValueChange={(val) => handleRadioChange("material", val as MaterialOption)}
          >
            {["14k Yellow Gold", "18k Gold Vermeil", "Sterling Silver"].map((mat) => (
              <Radio key={mat} value={mat.toLowerCase()}>
                {mat}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>

      <hr className="border-t border-orange-200" />

      {/* View Button */}
      <div className="pt-2">
        <button className="w-full bg-orange-400 text-white text-lg font-semibold py-2 rounded border hover:bg-orange-500 transition">
          View Jewelry
        </button>
      </div>
    </div>
  );
}
