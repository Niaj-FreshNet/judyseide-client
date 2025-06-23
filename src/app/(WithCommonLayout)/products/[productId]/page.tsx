'use client';

import ProductReviews from "@/src/components/modules/product/ProductReviews";
import RelatedProducts from "@/src/components/modules/product/RelatedProducts";

export default function ProductPage() {

  return (
    <div className="mt-44 mb-52 space-y-32">
      <RelatedProducts />
      <ProductReviews />
    </div>
  );
}
