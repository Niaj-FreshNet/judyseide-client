'use client';

import Image from "next/image";
import { useCart } from "@/src/context/cart.context";

interface CartItemProps {
  id: string;
  name: string;
  imageUrl: string[];
  price: number;
  quantity: number;
  material: string;
  color: string;
  size: string;
  variantId: string; // Added variantId prop
}

export default function CartItem({
  id,
  name,
  imageUrl,
  price,
  quantity,
  material,
  color,
  size,
  variantId,
}: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, variantId, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(id, variantId);
  };

  const handleMoveToWishlist = () => {
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

        <div className="flex items-end justify-start gap-2">
          <div className="flex items-center gap-2 mt-2 p-1 border border-orange-200">
            <button
              className="w-8 h-8 text-xl leading-none"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </button>
            <span className="w-6 text-center text-orange-400">{quantity}</span>
            <button
              className="w-8 h-8 text-xl leading-none"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
          <button
            onClick={handleMoveToWishlist}
            className="text-sm font-medium underline underline-offset-2 hover:text-orange-600 transition">
            Move to Wishlist
          </button>
          <button
            className="text-sm font-medium underline underline-offset-2 hover:text-orange-600 transition"
            onClick={handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
