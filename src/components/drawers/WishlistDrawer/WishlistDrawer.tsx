import { RelatedProductsInDrawer } from "../CartDrawer/RelatedProductsInDrawer";

import WishlistItem from "./WishlistItem";

export function WishlistDrawer() {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-8 pt-2 pb-6 space-y-8">
        <div className="pt-2">
          <WishlistItem />
        </div>
        <div className="pt-2 pb-4">
          <RelatedProductsInDrawer />
        </div>
      </div>
    </>
  );
}
