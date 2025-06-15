"use client";

import React from "react";
import AllFilters, {
    CategoryOption,
    Filters,
    SortByOption,
} from "@/src/components/modules/shop/AllFilters";
import FilterBar from "@/src/components/modules/shop/FilterBar";
import LoadMoreFooter from "@/src/components/modules/shop/LoadMoreFooter";

const PRODUCTS_PER_PAGE = 9;

export default function Loading() {
    // Create an array of empty items for skeletons
    const skeletons = new Array(PRODUCTS_PER_PAGE).fill(null);

    // We show filters open by default like in your main component
    const showAllFilters = true;

    // Skeleton filters state (static)
    const filters: Filters = {
        availability: { inStock: false, outOfStock: false },
        price: {
            under150: false,
            "150to300": false,
            "300to500": false,
            above500: false,
        },
        sortBy: "price-low-to-high",
        category: "",
        material: "",
    };

    return (
        <>
            <FilterBar
                selectedCategory={filters.category}
                selectedSort={filters.sortBy}
                onCategoryChange={() => { }}
                onSortChange={() => { }}
                isLoading
            />

            <div className="flex gap-6">
                {showAllFilters && (
                    <div className="hidden lg:block w-1/4">
                        <AllFilters filters={filters} setFilters={() => { }} isLoading />
                    </div>
                )}

                <div className={`${showAllFilters ? "lg:w-3/4" : "w-full"}`}>
                    <div
                        className={`grid gap-6 ${showAllFilters ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                            }`}
                    >
                        {skeletons.map((_, index) => (
                            <div
                                key={index}
                                className="min-w-[250px] flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33%] lg:flex-[0_0_25%]"
                            >
                                <div className="w-full h-72 lg:h-96 bg-gray-200 animate-pulse rounded-none mb-2" />
                                <div className="h-4 bg-gray-200 animate-pulse rounded-none w-3/4 mb-1" />
                                <div className="h-4 bg-gray-200 animate-pulse rounded-none w-1/2" />
                            </div>
                        ))}
                    </div>

                    <LoadMoreFooter total={PRODUCTS_PER_PAGE} viewed={0} onLoadMore={() => { }} isLoading />
                </div>
            </div>
        </>
    );
}