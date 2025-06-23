import { useWishlist } from "@/src/context/wishlist.context";
import WishlistItem from "./WishlistItem";
import { RelatedProductsInDrawer } from "../CartDrawer/RelatedProductsInDrawer";

export function WishlistDrawer() {
  const { wishlist } = useWishlist();

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-2 space-y-8">
      <div className="pt-2">
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          wishlist.map((item) => (
            <WishlistItem
              key={item.variantId}
              id={item.id}
              name={item.name}
              imageUrl={item.imageUrl}
              price={item.price}
              material={item.material}
              color={item.color}
              size={item.size}
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
