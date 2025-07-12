'use client';

import Image from "next/image";
import { removeFromWishlist } from "@/src/services/Wishlist";
import { useState } from "react";
import { useCart } from "@/src/context/cart.context";
import { Product } from "@/src/types";

export default function WishlistItem({
  wishlistId,
  product,
  variantId,
  variant,
}: {
  wishlistId: string; // ✅ added this
  product: Product;
  variantId: string;
  variant: { size: string; color: string; price: number; quantity: number };
}) {
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]); // State to store wishlist items

  // console.log(product)
  // console.log(variant)

  const handleRemove = async () => {
    const removedItem = await removeFromWishlist(wishlistId); // ✅ use wishlistId here
    if (removedItem) {
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== product.id));
    }
  };

  const handleMoveToBag = () => {
    // alert("Move to Bag functionality is not implemented.");
    addToCart(product, variantId, 1);

  };

  const imageUrl = product.imageUrl[0];
  const name = product.name;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-orange-200 py-6 my-4">
      <Image
        className="w-full sm:w-72 h-auto sm:h-64 object-contain border border-orange-200"
        src={imageUrl}
        alt={name}
        width={1200}
        height={600}
      />
      <div className="flex flex-col flex-1 justify-between space-y-2">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <h3 className="text-base sm:text-lg font-semibold">{product.name}</h3>
          <p className="text-base sm:text-lg font-bold text-black">${variant.price}</p>
        </div>

        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-default-600">{product.material?.materialName}</span>
        </div>

        <div className="text-xs text-gray-600 mt-1">
          <p className="mb-2">Size: {variant.size} </p>
          <p>Color: {variant.color}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
          {/* <button
            className="text-sm font-medium underline underline-offset-2 hover:text-orange-600 transition"
            onClick={handleMoveToBag}
          >
            Move to Bag
          </button> */}
          <button
            className="text-sm font-medium underline underline-offset-2 hover:text-orange-600 transition"
            onClick={handleRemove}
          >
            Remove Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
