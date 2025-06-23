import Link from "next/link";
import { CartDrawerCalculations } from "./CartDrawerCalculations";

export function CartDrawerFooter() {
  return (
    <footer className="px-8 py-4 bottom-0 bg-white">
      <CartDrawerCalculations />
      <Link href={"/checkout"}>
        <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold rounded">
          Checkout
        </button></Link>
    </footer>
  );
}
