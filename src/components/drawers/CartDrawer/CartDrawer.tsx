import { useCart } from "@/src/context/cart.context";
import { CartDrawerFooter } from "./CartDrawerFooter";
import CartItem from "./CartItem";
import { RelatedProductsInDrawer } from "./RelatedProductsInDrawer";

export function CartDrawer() {
  const { cart } = useCart();
  
  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-2 space-y-8">
        <div className="pt-2">
          {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <CartItem
            key={item.variantId} // Use variantId to uniquely identify each cart item
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.variants[0]?.price} // Assuming price is inside variants
            quantity={item.quantity}
            material={item.material.materialName}
            color={item.variantId} // Assuming color is in the variantId
            size={item.variantId} // Assuming size is in the variantId
            variantId={item.variantId}
          />
        ))
      )}
        </div>
        <div className="pt-2 pb-4">
          <RelatedProductsInDrawer />
        </div>
      </div>
      <CartDrawerFooter />
    </>
  );
}
