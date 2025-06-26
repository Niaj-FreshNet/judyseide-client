"use client";

import React from "react";
import AllFilters from "@/src/components/modules/shop/AllFilters";
import FilterBar from "@/src/components/modules/shop/FilterBar";
import LoadMoreFooter from "@/src/components/modules/shop/LoadMoreFooter";
import { Filters } from "@/src/types";

const PRODUCTS_PER_PAGE = 9;

export default function Loading() {
  // Create an array of empty items for skeletons
  const skeletons = new Array(PRODUCTS_PER_PAGE).fill(null);

  // Static filters state (can be adjusted based on the real filters state)
  const filters: Filters = {
    availability: { inStock: false, outOfStock: false },
    price: {
      under150: false,
      "150to300": false,
      "300to500": false,
      above500: false,
    },
    sortBy: "price-low-to-high",
    categoryName: "",
    material: "",
  };

  return (
    <>
      {/* Filter Bar Skeleton */}
      <div className="mb-8">
        <div className="h-12 bg-gray-200 animate-pulse rounded-lg w-full" />
      </div>

      <div className="flex gap-6">
        {/* Left side filter skeleton */}
        <div className="hidden lg:block w-1/4">
          <div className="bg-gray-200 animate-pulse h-[calc(100vh-100px)] rounded-md p-6 mb-6" />
        </div>

        {/* Right side product skeleton */}
        <div className="lg:w-3/4 w-full">
          {/* Skeleton for Product Grid */}
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {skeletons.map((_, index) => (
              <div key={index} className="min-w-[250px] sm:flex-[0_0_45%] md:flex-[0_0_33%] lg:flex-[0_0_25%]">
                <div className="w-full h-72 bg-gray-200 animate-pulse rounded-lg mb-4" /> {/* Product Image */}
                <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-3/4 mb-2" /> {/* Product Title */}
                <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-1/2" /> {/* Product Price */}
              </div>
            ))}
          </div>

          {/* Load More Footer Skeleton */}
          <div className="mt-6">
            <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-32 mx-auto" /> {/* Load More Button */}
          </div>
        </div>
      </div>
    </>
  );
}
