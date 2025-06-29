"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import ProductCard from "@/src/components/UI/ProductCard";
import SectionTitle from "@/src/components/UI/SectionTitle";
import { useParams } from "next/navigation";
import { useProductById } from "@/src/hooks/product.hook";
import RelatedProductsLoading from "../../loading/RelatedProductsLoading";

export default function RelatedProducts() {
  const { productId } = useParams();
  // console.log("Product ID:", productId); // Debugging log
  const singleProductId = Array.isArray(productId) ? productId[0] : productId;

  const { product, loading, error } = useProductById(singleProductId);
  // console.log("Product Data:", product); // Debugging log
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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

  const relatedProducts = product?.data?.relatedProducts || [];

  // console.log("Related Products:", relatedProducts); // Debugging log

  return (
    <div className="flex flex-col gap-6 -mt-12">
      <SectionTitle
        align="left"
        subtitle=""
        title="You May Also Like"
        titleClassName="text-default-900"
      />

      {loading ? (
        <RelatedProductsLoading />
      ) : error ? (
        <p className="text-center text-red-500">Failed to load related products.</p>
      ) : relatedProducts.length === 0 ? (
        <p className="text-center">No related products found.</p>
      ) : (
        <>
          <div className="relative">
            {/* Arrows */}
            <button
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-[#FB923C] shadow-md shadow-gray-400 p-2 rounded-full"
              onClick={scrollPrev}
            >
              <ChevronLeft color="white" size={28} />
            </button>

            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-4">
                {relatedProducts.map((relatedProduct: any, index: number) => (
                  <div
                    key={relatedProduct?.id ?? index}
                    className="min-w-[250px] flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33%] lg:flex-[0_0_25%]"
                  >
                    {relatedProduct ? (
                      <ProductCard showAddToBag product={relatedProduct} />
                    ) : (
                      <div className="p-4 text-center text-gray-500">Invalid product data</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-[#FB923C] shadow-md shadow-gray-400 p-2 rounded-full"
              onClick={scrollNext}
            >
              <ChevronRight color="white" size={28} />
            </button>
          </div>

          {/* Pagination Dots */}
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
        </>
      )}
    </div>
  );
}
