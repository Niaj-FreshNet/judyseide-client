'use client';

import Container from '@/src/components/UI/Container';
import CustomBreadcrumbs from '@/src/components/UI/CustomBreadcrumbs';
import AllFilters, { CategoryOption, Filters, SortByOption } from '@/src/components/modules/shop/AllFilters';
import FilterBar from '@/src/components/modules/shop/FilterBar';
import ProductGrid from '@/src/components/modules/shop/ProductGrid';
import LoadMoreFooter from '@/src/components/modules/shop/LoadMoreFooter';

import { useMemo, useState } from 'react';

const PRODUCTS_PER_PAGE = 9;

type Product = {
    name: string;
    price: number;
    image: string;
    badge: string;
    material: string;
    category: string;
};

const productNames = [
    'Starburst Earrings', 'Celestial Hoops', 'Twilight Necklace', 'Sunray Bracelet',
    'Aurora Ring', 'Galaxy Studs', 'Lunar Cuff', 'Starlit Pendant',
    'Nova Bangles', 'Meteorite Earrings', 'Solar Choker', 'Radiant Ring',
    'Orbit Bracelet', 'Comet Hoops', 'Shimmer Studs', 'Eclipse Pendant'
];

const badges = ['Best selling', 'New Arrival', 'Limited Edition', 'Exclusive'];

const allProducts: Product[] = Array(16).fill(null).map((_, i) => ({
    name: productNames[i],
    price: 756 - i * 10,
    image: `/products/product${(i % 2) + 1}.jpg`,
    badge: badges[i % badges.length],
    material: '18k Gold Vermeil',
    category: ['Earrings', 'Bracelets', 'Necklaces', 'Rings'][i % 4],
}));

export default function AllProductPage() {
    const [showAllFilters, setShowAllFilters] = useState(false);
    const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
    const [filters, setFilters] = useState<Filters>({
        availability: { inStock: false, outOfStock: false },
        price: { under150: false, '150to300': false, '300to500': false, above500: false },
        sortBy: 'price-low-to-high',
        category: '',
        material: '',
    });

    const isAllFiltersSelected = useMemo(() => {
        const { availability, price, category, material, sortBy } = filters;
        const hasAvailability = availability.inStock || availability.outOfStock;
        const hasPrice = Object.values(price).some(Boolean);
        const hasCategory = !!category;
        const hasMaterial = !!material;
        const hasSort = !!sortBy;
        return hasAvailability && hasPrice && hasCategory && hasMaterial && hasSort;
    }, [filters]);

    const isAnyFilterSelected = useMemo(() => {
        const { availability, price, category, material } = filters;
        return (
            availability.inStock ||
            availability.outOfStock ||
            Object.values(price).some(Boolean) ||
            !!category ||
            !!material
        );
    }, [filters]);

    const isAllFilterView = showAllFilters;

    const filteredProducts = allProducts
        .filter((product) => {
            const matchesCategory = !filters.category || product.category.toLowerCase() === filters.category;
            const matchesMaterial = !filters.material || product.material.toLowerCase() === filters.material;
            return matchesCategory && matchesMaterial;
        })
        .sort((a, b) => {
            if (filters.sortBy === 'price-low-to-high') return a.price - b.price;
            if (filters.sortBy === 'price-high-to-low') return b.price - a.price;
            return 0;
        });

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    return (
        <Container className="pt-8">
            <CustomBreadcrumbs items={['Home', 'All Category']} />

            <div className="flex gap-6">
                {isAllFilterView && (
                    <div className="hidden lg:block w-1/4">
                        <AllFilters filters={filters} setFilters={setFilters} />
                    </div>
                )}

                <div className={`${isAllFilterView ? 'lg:w-3/4' : 'w-full'}`}>
                    <FilterBar
                        filterCount={filteredProducts.length}
                        selectedCategory={filters.category || 'All Filter'}
                        onCategoryChange={(cat) => {
                            console.log("Category clicked:", cat); // See if "All Filter" prints
                            if (cat === 'All Filter') {
                                setShowAllFilters(prev => !prev); // ✅ Toggle filter panel
                                setFilters(f => ({
                                    ...f,
                                    category: '', // ✅ Ensure no category is selected
                                }));
                            } else {
                                const formattedCategory = cat.toLowerCase() as CategoryOption;
                                // ⛔️ Do NOT change showAllFilters
                                setFilters(f => ({
                                    ...f,
                                    category: formattedCategory,
                                }));
                            }
                        }}
                        selectedSort={filters.sortBy}
                        onSortChange={(sort) => {
                            setFilters(f => ({
                                ...f,
                                sortBy: sort as SortByOption,
                            }));
                        }}
                    />
                    <ProductGrid products={visibleProducts} cols={isAllFilterView ? 3 : 4} />
                    <LoadMoreFooter
                        viewed={visibleCount}
                        total={filteredProducts.length}
                        onLoadMore={() =>
                            setVisibleCount(prev => Math.min(prev + PRODUCTS_PER_PAGE, filteredProducts.length))
                        }
                    />
                </div>
            </div>
        </Container>
    );
}
