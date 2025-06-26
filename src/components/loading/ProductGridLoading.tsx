"use client";

import React from "react";

const PRODUCTS_PER_PAGE = 9;

export default function ProductGridLoading() {
  // Create an array of empty items for skeletons
  const skeletons = new Array(PRODUCTS_PER_PAGE).fill(null);

  return (
    <>
      <div className="flex gap-6">
        {/* Right side product skeleton */}
        <div className="w-full">
          {/* Matching grid layout for product grid */}
          <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
            {skeletons.map((_, index) => (
              <div
                key={index}
                className="min-w-[250px] sm:flex-[0_0_45%] md:flex-[0_0_33%] lg:flex-[0_0_25%]"
              >
                {/* Skeleton for product image */}
                <div className="w-full h-72 bg-gray-200 animate-pulse rounded-lg mb-4" />
                {/* Skeleton for product title */}
                <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-3/4 mb-2" />
                {/* Skeleton for product price */}
                <div className="h-4 bg-gray-200 animate-pulse rounded-lg w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
