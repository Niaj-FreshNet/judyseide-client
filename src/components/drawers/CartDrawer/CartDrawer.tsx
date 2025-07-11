"use client";

import { useCart } from "@/src/context/cart.context";
import { useDrawerManager } from "../../drawers/DrawerManager";  // Assuming you have a Drawer Manager
import { CartDrawerFooter } from "./CartDrawerFooter";
import CartItem from "./CartItem";
import { RelatedProductsInDrawer } from "./RelatedProductsInDrawer";
import { FaShoppingCart } from "react-icons/fa";
import { useUser } from "@/src/context/user.proider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const { cart } = useCart();
  const { user, isLoading: isUserLoading } = useUser();
  const router = useRouter();
  const { closeDrawer } = useDrawerManager();  // To close the drawer on checkout
  // console.log(cart)

  // Calculate Subtotal
  const subtotal = cart.reduce((total, item) => total + item.variants[0]?.price * item.quantity, 0);

  // Assuming a flat tax rate and shipping fee for this example
  const taxRate = 0.00; // 8% tax rate
  const shippingCost = 0; // Flat $10 shipping fee

  const taxes = subtotal * taxRate;
  const total = subtotal + taxes + shippingCost;

  const handleCheckout = () => {
    
    if (!user && !isUserLoading) {
      toast.error("You need to login first to proceed to checkout");
      router.push("/login");
      closeDrawer();  // Close the drawer when user clicks checkout
      return;
    }
    
    router.push("/checkout");  // Redirect to checkout page

    closeDrawer();  // Close the drawer when user clicks checkout
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-2 space-y-8">
        <div className="pt-2">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <FaShoppingCart className="text-6xl text-gray-400 mb-4" /> {/* Empty Cart Icon */}
              <p className="text-lg text-gray-600 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-500 mb-4">Start shopping now and add some items to your cart.</p>
              <button
                onClick={() => closeDrawer()} // Close drawer on button click
                className="px-6 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.variantId}
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                quantity={item.quantity}
                material={item.material?.materialName || "N/A"}
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
