"use client";

import { SlidersHorizontal } from "lucide-react";
import ProductCardForAllProductsPage from "@/src/components/UI/ProductCardForAllProductsPage";
import { useState } from "react";
import Image from "next/image";

const PRODUCTS_PER_PAGE = 9;

export default function ProductDetailsLoading() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="grid md:grid-cols-2 gap-8 mx-auto">
      {/* Product Images Loading */}
      <div className="w-full flex flex-col mx-auto gap-6">
        <div
          className="relative w-full h-[240px] md:h-[400px] lg:h-[512px] border border-orange-200 shadow-sm cursor-zoom-in overflow-hidden"
          role="button"
          tabIndex={0}
        >
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        </div>
      </div>

      {/* Product Info Loading */}
      <div className="space-y-12">
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-gray-300 bg-gray-200 animate-pulse w-1/2" />
          <p className="text-2xl font-semibold text-gray-300 bg-gray-200 animate-pulse w-1/3" />
        </div>

        <hr className="border-t border-orange-200" />

        <div className="space-y-6">
          <h2 className="font-semibold text-lg text-gray-300 bg-gray-200 animate-pulse w-1/3" />
          <p className="text-sm text-default-800 leading-relaxed bg-gray-200 animate-pulse h-20" />
        </div>

        <hr className="border-t border-orange-200" />

        {/* Color Selection Skeleton */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-gray-300 bg-gray-200 animate-pulse w-1/4" />
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
          </div>
        </div>

        <hr className="border-t border-orange-200" />

        {/* Size Selection Skeleton */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-gray-300 bg-gray-200 animate-pulse w-1/4" />
          <div className="flex gap-4">
            <div className="px-4 py-2 rounded-md w-16 h-12 bg-gray-300 animate-pulse" />
            <div className="px-4 py-2 rounded-md w-16 h-12 bg-gray-300 animate-pulse" />
          </div>
        </div>

        <hr className="border-t border-orange-200" />

        {/* Quantity Input Skeleton */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg text-gray-300 bg-gray-200 animate-pulse w-1/4" />
          <div className="w-full border bg-gray-200 animate-pulse h-10 rounded-md" />
          <p className="text-sm text-gray-500 bg-gray-200 animate-pulse h-4 w-1/4" />
        </div>

        <hr className="border-t border-orange-200" />
      </div>

      {/* Product Actions Skeleton */}
      <div className="w-full flex gap-4 mt-8">
        <button className="w-2/3 bg-orange-500 hover:bg-orange-600 text-lg text-white px-6 py-4">
          <div className="bg-gray-200 animate-pulse h-full w-full" />
        </button>

        <button className="w-1/3 border border-orange-200 text-white px-6 py-4 flex justify-center items-center">
          <div className="bg-gray-200 animate-pulse w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

