'use client';

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Checkbox } from "@heroui/checkbox";
import { Radio, RadioGroup } from "@heroui/radio";
import React from "react";

interface AvailabilityFilter {
    inStock: boolean;
    outOfStock: boolean;
}

interface PriceFilter {
    under150: boolean;
    '150to300': boolean;
    '300to500': boolean;
    above500: boolean;
}

export type CategoryOption = 'earrings' | 'bracelets' | 'necklaces' | 'rings' | '';
export type SortByOption = 'price-low-to-high' | 'price-high-to-low';
export type MaterialOption = '14k yellow gold' | '18k gold vermeil' | 'sterling silver' | 'link' | '';

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
}


export default function AllFilters({ filters, setFilters }: AllFiltersProps) {
    const toggleFilter = (filterType: keyof Pick<Filters, 'availability' | 'price'>, value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: {
                ...prev[filterType],
                [value]: !prev[filterType][value as keyof typeof prev[typeof filterType]],
            },
        }));
    };

    // const handleRadioChange = (
    //     filterType: 'sortBy',
    //     value: SortByOption
    // ) => {
    //     setFilters(prev => ({
    //         ...prev,
    //         sortBy: value,
    //     }));
    // };

    const handleRadioChange = (
        filterType: 'sortBy' | 'category' | 'material',
        value: SortByOption | CategoryOption | MaterialOption
    ) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value,
        }));
    };

    // const handleCategoryChange = (
    //     value: CategoryOption
    // ) => {
    //     setFilters(prev => ({ ...prev, category: value }));
    // };

    // const handleMaterialChange = (
    //     value: MaterialOption
    // ) => {
    //     setFilters(prev => ({ ...prev, material: value }));
    // };


    return (
        <div className="p-4 bg-white rounded-xl shadow-md space-y-6">
            <h2 className="text-lg font-bold">All Filters</h2>

            <Accordion variant="splitted">
                <AccordionItem key="1" aria-label="Availability" title="Availability">
                    <Checkbox
                        isSelected={filters.availability.inStock}
                        onValueChange={() => toggleFilter('availability', 'inStock')}
                    >
                        In Stock
                    </Checkbox>
                    <Checkbox
                        isSelected={filters.availability.outOfStock}
                        onValueChange={() => toggleFilter('availability', 'outOfStock')}
                    >
                        Out of Stock
                    </Checkbox>
                </AccordionItem>

                <AccordionItem key="2" aria-label="Price" title="Price">
                    <Checkbox isSelected={filters.price.under150} onValueChange={() => toggleFilter('price', 'under150')}>Under 150</Checkbox>
                    <Checkbox isSelected={filters.price['150to300']} onValueChange={() => toggleFilter('price', '150to300')}>150 - 300</Checkbox>
                    <Checkbox isSelected={filters.price['300to500']} onValueChange={() => toggleFilter('price', '300to500')}>300 - 500</Checkbox>
                    <Checkbox isSelected={filters.price.above500} onValueChange={() => toggleFilter('price', 'above500')}>Above 500</Checkbox>
                </AccordionItem>

                <AccordionItem key="3" title="Sort By: Price">
                    <RadioGroup value={filters.sortBy} onValueChange={(val) => handleRadioChange('sortBy', val)}>
                        <Radio value="price-low-to-high">Low to High</Radio>
                        <Radio value="price-high-to-low">High to Low</Radio>
                    </RadioGroup>
                </AccordionItem>

                <AccordionItem key="4" title="Category">
                    <RadioGroup value={filters.category} onValueChange={(val) => handleRadioChange('category', val)}>
                        {['Earrings', 'Bracelets', 'Necklaces', 'Rings'].map(cat => (
                            <Radio key={cat} value={cat.toLowerCase()}>{cat}</Radio>
                        ))}
                    </RadioGroup>
                </AccordionItem>

                <AccordionItem key="5" title="Material">
                    <RadioGroup value={filters.material} onValueChange={(val) => handleRadioChange('material', val)}>
                        {['14k Yellow Gold', '18k Gold Vermeil', 'Sterling Silver', 'Link'].map(mat => (
                            <Radio key={mat} value={mat.toLowerCase()}>{mat}</Radio>
                        ))}
                    </RadioGroup>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
