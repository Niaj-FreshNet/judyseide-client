"use client";

import React from "react";

export default function FilterBarLoading() {
  return (
    <div className="flex flex-wrap justify-between items-center mb-8">
      {/* Skeleton for filter category buttons */}
      <div className="flex flex-wrap gap-4 lg:gap-6">
        <div className="w-32 h-8 bg-gray-200 animate-pulse rounded-lg" />
        <div className="w-32 h-8 bg-gray-200 animate-pulse rounded-lg" />
        <div className="w-32 h-8 bg-gray-200 animate-pulse rounded-lg" />
        <div className="w-32 h-8 bg-gray-200 animate-pulse rounded-lg" />
      </div>

      {/* Skeleton for Sort dropdown */}
      <div className="relative mt-4">
        <div className="w-48 h-12 bg-gray-200 animate-pulse rounded-lg" />
      </div>
    </div>
  );
}
