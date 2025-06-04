import { CartDrawerFooter } from "./CartDrawerFooter";
import CartItem from "./CartItem";
import { RelatedProductsInDrawer } from "./RelatedProductsInDrawer";

export function CartDrawer() {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-8 py-2 space-y-8">
        <div className="pt-2">
          <CartItem />
        </div>
        <div className="pt-2 pb-4">
          <RelatedProductsInDrawer />
        </div>
      </div>
      <CartDrawerFooter />
    </>
  );
};
