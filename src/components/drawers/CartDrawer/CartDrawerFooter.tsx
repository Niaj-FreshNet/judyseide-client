import { CartDrawerCalculations } from "./CartDrawerCalculations";

export function CartDrawerFooter() {
  return (
    <footer className="p-6 border-t border-gray-200 sticky bottom-0 bg-white">
      <CartDrawerCalculations />
      <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold rounded">
        Proceed to Checkout
      </button>
    </footer>
  );
}
