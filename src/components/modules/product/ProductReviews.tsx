"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SectionTitle from "@/src/components/UI/SectionTitle";
import ReviewCard from "@/src/components/UI/ReviewCard";
import { useParams } from "next/navigation";
import { useProductById } from "@/src/hooks/product.hook";
import ProductReviewLoading from "../../loading/ProductReviewLoading copy";

export default function ProductReviews() {
  const { productId } = useParams();
  const singleProductId = Array.isArray(productId) ? productId[0] : productId;

  const { product, loading, error } = useProductById(singleProductId);
  // console.log("Product Data: reviews", product); // Debugging log
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const goodReviews = product?.data?.goodReviews || [];
  // console.log("Good Reviews:", goodReviews); // Debugging log

  return (
    <div className="flex flex-col gap-6">
      <SectionTitle
        align="left"
        subtitle=""
        title="Customer Reviews"
        titleClassName="text-default-900"
      />

      {loading ? (
        <ProductReviewLoading />
      ) : error ? (
        <p className="text-center text-red-500">Failed to load reviews.</p>
      ) : goodReviews.length === 0 ? (
        <p className="text-center">No reviews found.</p>
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
                {goodReviews.map((review, index) => (
                  <div
                    key={review.id || index}
                    className="min-w-[250px] flex-[0_0_90%] sm:flex-[0_0_60%] md:flex-[0_0_33%] lg:flex-[0_0_25%]"
                  >
                    <ReviewCard
                      stars={review.rating}
                      title={review.title}
                      comment={review.comment}
                      name={review?.user?.name || "Anonymous"}
                      date={new Date(review.createdAt).toLocaleDateString()}
                      image={review?.user?.imageUrl || "/default-user.jpg"}
                    />
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
                className={`w-2.5 h-2.5 rounded-full ${
                  index === selectedIndex ? "bg-orange-100" : "bg-orange-400"
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
