import { DrawerHeader } from "../DrawerHeader";
import { useJodyDrawer } from "../JodyDrawer";
import { CartDrawerFooter } from "./CartDrawerFooter";
import { RelatedProductsInDrawer } from "./RelatedProductsInDrawer";

export function useCartDrawer() {
  const { openDrawer } = useJodyDrawer();

  const openCart = () => {
    openDrawer(
      <>
        <DrawerHeader />

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Cart Item */}
          <div className="flex gap-4">
            <img
              src="/earring.jpg"
              alt="Starburst Earrings"
              className="w-24 h-24 object-cover rounded border"
            />
            <div>
              <h3 className="text-lg font-semibold">Starburst Earrings</h3>
              <p className="text-sm text-gray-500">18k Gold Vermeil</p>
              <p className="mt-2 text-orange-500 font-bold">$756</p>
              <div className="flex items-center mt-2">
                <button className="px-2 py-1 border rounded-l">-</button>
                <span className="px-3">1</span>
                <button className="px-2 py-1 border rounded-r">+</button>
              </div>
              <button className="mt-2 text-sm text-orange-500 hover:underline">
                Move to Wishlist
              </button>
            </div>
          </div>

          {/* Upsell Section */}
          <RelatedProductsInDrawer />
        </div>

        <CartDrawerFooter />
      </>
    );
  };

  return { openCart };
}
