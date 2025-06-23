'use client';

import { HeartIcon } from "lucide-react";
import { useDrawerManager } from "../../drawers/DrawerManager";
import { useCart } from "@/src/context/cart.context";
import { Product } from "@/src/types";
import { useWishlist } from "@/src/context/wishlist.context";

export default function ProductActions({
  product,
  variantId,
  selectedSize,
  selectedColor,
  quantity,
}: {
  product: Product;
  variantId: string;
  selectedSize: string | null;
  selectedColor: string | null;
  quantity: number;
}) {
  const { openDrawer } = useDrawerManager();
  const { addToCart } = useCart(); // Get the addToCart function from the CartContext
    const { addToWishlist } = useWishlist(); // Use the addToWishlist from WishlistContext

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(product, variantId, quantity); // Add the product to the cart
      openDrawer("cart"); // Optionally open the cart drawer after adding the product
    } else {
      alert("Please select size and color.");
    }
  };

    const handleAddToWishlist = () => {
    if (selectedSize && selectedColor) {
      addToWishlist(product, variantId); // Add to wishlist without quantity
      openDrawer("wishlist"); // Optionally open the wishlist drawer
    } else {
      alert("Please select size and color.");
    }
  };

  return (
    <div className="w-full flex gap-4 mt-8">
      <button
        className="w-2/3 bg-orange-500 hover:bg-orange-600 text-lg text-white px-6 py-4"
        onClick={handleAddToCart} // Use handleAddToCart on click
      >
        Add To Bag
      </button>

      <button
        className="w-1/3 border border-orange-200 text-white px-6 py-4 flex justify-center items-center"
        onClick={handleAddToWishlist}
      >
        <HeartIcon className="w-6 h-6 text-orange-300" />
      </button>
    </div>
  );
}
