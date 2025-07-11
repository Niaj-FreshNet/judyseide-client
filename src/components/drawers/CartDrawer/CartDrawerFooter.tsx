import { useUser } from "@/src/context/user.proider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CartDrawerFooter({
  subtotal,
  taxes,
  shipping,
  total,
  onCheckout,
}: {
  subtotal: number;
  taxes: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}) {
  // const { user, isLoading: isUserLoading } = useUser();
  // const router = useRouter();

  // onCheckout = () => {
  //   if (!user && !isUserLoading) {
  //     toast.error("You need to login first to proceed to checkout");
  //     router.push("/login");
  //     return;
  //   }
  //   else {
  //     onCheckout(); // Call the passed in onCheckout function
  //   }
  // }

  return (
    <footer className="px-8 py-4 bottom-0 bg-white">
      <div className="space-y-4 text-sm">
        <div className="space-y-2 text-md font-bold border-y border-orange-200 py-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      {/* <Link href={"/checkout"}> */}

        <button
          className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold rounded"
          onClick={onCheckout}  // Trigger checkout when clicked
        >
          Checkout
        </button>
      {/* </Link> */}
    </footer>
  );
}
