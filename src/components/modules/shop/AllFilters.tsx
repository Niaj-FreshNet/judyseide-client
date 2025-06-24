import { getCategories } from "@/src/services/Categories";
import { getMaterials } from "@/src/services/Materials";
import { Category, Material } from "@/src/types";
import { Checkbox } from "@heroui/checkbox";
import { Radio, RadioGroup } from "@heroui/radio";
import React, { useEffect, useState } from "react";

export type SortByOption = "price-low-to-high" | "price-high-to-low";

export type Filters = {
  availability: {
    inStock: boolean;
    outOfStock: boolean;
  };
  price: {
    under150: boolean;
    "150to300": boolean;
    "300to500": boolean;
    above500: boolean;
  };
  sortBy: "price-low-to-high" | "price-high-to-low";
  categoryName: string;  // Can be an empty string if no category is selected
  material: string;  // Material is now a string ID
  size?: string; // Optional field for size
};

interface AllFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  isLoading?: boolean;
}

export default function AllFilters({ filters, setFilters, isLoading = false }: AllFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]); // State for materials

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const fetchedCategories = response.data.data;
        console.log("Fetched categories:", fetchedCategories); 
        if (Array.isArray(fetchedCategories)) {
          setCategories(fetchedCategories);
        } else {
          console.error("Fetched categories is not an array:", fetchedCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch materials
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await getMaterials(); // Fetch materials using the getMaterials function
        const fetchedMaterials = response.data.data; // Assuming response structure
        if (Array.isArray(fetchedMaterials)) {
          setMaterials(fetchedMaterials);
        } else {
          console.error("Fetched materials is not an array:", fetchedMaterials);
        }
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

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
    filterType: "sortBy" | "categoryName" | "material",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="bg-[#fef6f1] p-6 rounded-md border text-sm space-y-5 w-full animate-pulse">
        {/* Loading Skeleton */}
      </div>
    );
  }

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
            value={filters.categoryName}
            onValueChange={(val) => handleRadioChange("categoryName", val)}
          >
            {categories.map((cat) => (
              <Radio key={cat.id} value={cat.id}> {/* Use category ID here */}
                {cat.categoryName?.charAt(0).toUpperCase() + cat.categoryName?.slice(1)} {/* Capitalize category name */}
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
            onValueChange={(val) => handleRadioChange("material", val)} // Now passing material ID
          >
            {materials.map((mat) => (
              <Radio key={mat.id} value={mat.id}>
                {mat.materialName?.charAt(0).toUpperCase() + mat.materialName.slice(1)} {/* Capitalize material name */}
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
