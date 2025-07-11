"use client";

import { useState } from "react";

export default function ProductDetailsLoading() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="grid md:grid-cols-2 gap-8 mx-auto">
      {/* Left: Image Section */}
      <div className="flex flex-col gap-4">
        {/* Main Image Skeleton */}
        <div className="relative w-full h-[400px] md:h-[512px] border border-orange-200 shadow-sm overflow-hidden">
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4">
          <div className="w-20 h-20 border-2 border-orange-500 bg-gray-300 animate-pulse" />
          <div className="w-20 h-20 border border-orange-200 bg-gray-300 animate-pulse" />
        </div>
      </div>

      {/* Right: Info Section */}
      <div className="space-y-4 flex flex-col justify-between">
        {/* Title & Price */}
        <div className="space-y-2">
          <div className="h-6 w-2/3 bg-gray-300 animate-pulse rounded" />
          <div className="h-6 w-24 bg-gray-300 animate-pulse rounded" />
        </div>

        {/* Description */}
        <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded" />

        <hr className="border-orange-200" />

        {/* Select Color */}
        <div className="space-y-2">
          {/* <div className="h-5 w-32 bg-gray-300 animate-pulse rounded" /> */}
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
          </div>
        </div>

        <hr className="border-orange-200" />

        {/* Select Size */}
        <div className="space-y-2">
          {/* <div className="h-5 w-32 bg-gray-300 animate-pulse rounded" /> */}
          <div className="flex gap-4">
            <div className="w-16 h-10 rounded-md bg-gray-300 animate-pulse" />
            <div className="w-16 h-10 rounded-md bg-gray-300 animate-pulse" />
          </div>
        </div>

        <hr className="border-orange-200" />

        {/* Select Quantity */}
        <div className="space-y-2">
          {/* <div className="h-5 w-32 bg-gray-300 animate-pulse rounded" /> */}
          <div className="flex gap-2 items-center w-fit border border-orange-200 px-3 py-2">
            <div className="w-4 h-4 bg-gray-300 animate-pulse" />
            <div className="w-6 h-4 bg-gray-300 animate-pulse" />
            <div className="w-4 h-4 bg-gray-300 animate-pulse" />
          </div>
        </div>

        <hr className="border-orange-200" />

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <div className="w-2/3 h-12 bg-gray-300 animate-pulse rounded" />
          <div className="w-12 h-12 border border-orange-200 bg-gray-300 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
