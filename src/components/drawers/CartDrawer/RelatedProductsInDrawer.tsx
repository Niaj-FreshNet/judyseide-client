"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard from "@/src/components/UI/ProductCard";
import { getTrendingProducts } from "@/src/services/TrendingProducts";

export function RelatedProductsInDrawer() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]); // Use appropriate type if available
  const [loading, setLoading] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getTrendingProducts();
        setProducts(res?.data || []);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full mx-auto pt-4 flex-grow">
      <div className="flex flex-col gap-6">
        <div className="mb-0 text-left">
          <h2 className="font-serif text-xl lg:text-2xl font-bold text-default-900">
            You May Also Like
          </h2>
        </div>

        <div className="relative">
          <button
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 bg-[#FB923C] shadow-md shadow-gray-400 p-2 rounded-full"
            onClick={scrollPrev}
          >
            <ChevronLeft color="white" size={28} />
          </button>

          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-4">
              {loading ? (
                // Skeleton Loader: Create loading skeletons for product cards
                Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="min-w-[250px] flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33%] lg:flex-[0_0_25%] bg-gray-200 rounded-md animate-pulse"
                  >
                    {/* Skeleton Loader for Product Card */}
                    <div className="w-full h-64 bg-gray-300 rounded-t-md mb-2" />
                    <div className="w-3/4 h-4 bg-gray-300 rounded mb-2 mx-auto" />
                    <div className="w-1/2 h-4 bg-gray-300 rounded mx-auto" />
                  </div>
                ))
              ) : (
                products.map((product, index) => (
                  <div
                    key={product.id || index}
                    className="min-w-[250px] flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33%] lg:flex-[0_0_25%]"
                  >
                    <ProductCard showAddToBag product={product} />
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 bg-[#FB923C] shadow-md shadow-gray-400 p-2 rounded-full"
            onClick={scrollNext}
          >
            <ChevronRight color="white" size={28} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${index === selectedIndex ? "bg-orange-100" : "bg-orange-400"
                }`}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
