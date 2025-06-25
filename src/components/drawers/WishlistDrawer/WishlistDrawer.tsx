import { useWishlist } from "@/src/context/wishlist.context";
import WishlistItem from "./WishlistItem";
import { RelatedProductsInDrawer } from "../CartDrawer/RelatedProductsInDrawer";
import { FaHeart } from "react-icons/fa";

export function WishlistDrawer() {
  const { wishlist } = useWishlist();

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-2 space-y-8">
      <div className="pt-2">
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <FaHeart className="text-6xl text-gray-400 mb-4" /> {/* Heart icon */}
          <p className="text-lg text-gray-600 mb-2">Your wishlist is empty</p>
          <p className="text-sm text-gray-500 mb-4">Start adding items to your wishlist.</p>
          <button
            onClick={() => {} /* Add your action here, like browsing products */}
            className="px-6 py-2 text-white bg-pink-500 rounded-full hover:bg-pink-600 focus:outline-none"
          >
            Browse Products
          </button>
        </div>
        ) : (
          wishlist.map((item) => (
            <WishlistItem
                key={item.variantId}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.variants[0]?.price}
                material={item.material.materialName}
                color={item.variants[0]?.color}
                size={item.variants[0]?.size}
                variantId={item.variantId}
            />
          ))
        )}
      </div>
      <div className="pt-2 pb-4">
        <RelatedProductsInDrawer />
      </div>
    </div>
  );
}
