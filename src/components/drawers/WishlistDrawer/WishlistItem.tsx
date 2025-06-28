'use client';

import Image from "next/image";
import { removeFromWishlist } from "@/src/services/Wishlist";
import { useState } from "react";

interface WishlistItemProps {
  id: string;
  name: string;
  imageUrl: string[];
  price: number;
  material: string;
  color: string;
  size: string;
  variantId: string;
}

export default function WishlistItem({
  id,
  name,
  imageUrl,
  price,
  material,
  color,
  size,
  variantId,
}: WishlistItemProps) {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]); // State to store wishlist items

  const handleRemove = async () => {
    const removedItem = await removeFromWishlist(id); // Call the remove API
    if (removedItem) {
      // If the item is removed successfully, update the state to remove it from the UI
      setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const handleMoveToBag = () => {
    alert("Move to Bag functionality is not implemented.");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-orange-200 py-6 my-4">
      <Image
        alt={name}
        className="w-full sm:w-72 h-auto sm:h-64 object-contain border border-orange-200"
        src={imageUrl?.[0]}
        width={1200}
        height={600}
      />
      <div className="flex flex-col flex-1 justify-between space-y-2">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <h3 className="text-base sm:text-lg font-semibold">{name}</h3>
          <p className="text-base sm:text-lg font-bold text-black">${price}</p>
        </div>

        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-default-600">{material}</span>
        </div>

        <div className="text-xs text-gray-600 mt-1">
          <p className="mb-2">Size: {size} </p>
          <p>Color: {color}</p>
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
