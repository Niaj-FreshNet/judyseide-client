'use client';

import { useParams } from "next/navigation";
import ProductActions from "@/src/components/modules/product/ProductActions";
import ProductImages from "@/src/components/modules/product/ProductImages";
import ProductInfo from "@/src/components/modules/product/ProductInfo";
import { useProductById } from "@/src/hooks/product.hook";
import { useState } from "react";
import ProductDetailsLoading from "../loading";

export default function ProductDetails() {
  const { productId } = useParams(); // Get the product ID from the route
  // console.log("Product ID:", productId); // Log the product ID for debugging

  const singleProductId = Array.isArray(productId) ? productId[0] : productId; // Ensure it's a string

  const { product, loading, error } = useProductById(singleProductId); // Use the custom hook to fetch product data
  // console.log("Product Data:", product); // Log the fetched product data for debugging

  // Initialize state before fetching data
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Default quantity to 1

  if (!product || !product.data) {
    return <ProductDetailsLoading />;
  }

  // Access the product data inside the 'data' key
  const singleProduct = product.data;
  // console.log("Single Product:", singleProduct); // Log the product data for debugging

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto">
      <ProductImages images={singleProduct.imageUrl || []} />
      <div className="space-y-12">
        <ProductInfo
          description={singleProduct.description}
          material={singleProduct.material?.[0]?.materialName}
          price={singleProduct.variants?.[0]?.price.toString() || "0"}
          title={singleProduct.name}
          variants={singleProduct.variants || []} // Pass variants here
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <ProductActions
          product={singleProduct}
          // variantId={singleProduct.variants?.[0]?.id || ""}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          quantity={quantity}
          variants={singleProduct.variants || []}
        />
      </div>
    </div>
  );
}
