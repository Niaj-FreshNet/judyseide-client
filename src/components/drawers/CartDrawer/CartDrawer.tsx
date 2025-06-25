"use client";

import { useCart } from "@/src/context/cart.context";
import { useDrawerManager } from "../../drawers/DrawerManager";  // Assuming you have a Drawer Manager
import { CartDrawerFooter } from "./CartDrawerFooter";
import CartItem from "./CartItem";
import { RelatedProductsInDrawer } from "./RelatedProductsInDrawer";

export function CartDrawer() {
  const { cart } = useCart();
  const { closeDrawer } = useDrawerManager();  // To close the drawer on checkout

  // Calculate Subtotal
  const subtotal = cart.reduce((total, item) => total + item.variants[0]?.price * item.quantity, 0);

  // Assuming a flat tax rate and shipping fee for this example
  const taxRate = 0.00; // 8% tax rate
  const shippingCost = 0; // Flat $10 shipping fee

  const taxes = subtotal * taxRate;
  const total = subtotal + taxes + shippingCost;

  const handleCheckout = () => {
    closeDrawer();  // Close the drawer when user clicks checkout
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-2 space-y-8">
        <div className="pt-2">
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.variantId}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.variants[0]?.price}
                quantity={item.quantity}
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
      <CartDrawerFooter
        subtotal={subtotal}
        taxes={taxes}
        shipping={shippingCost}
        total={total}
        onCheckout={handleCheckout}  // Pass the handleCheckout function to the footer
      />
    </>
  );
}
