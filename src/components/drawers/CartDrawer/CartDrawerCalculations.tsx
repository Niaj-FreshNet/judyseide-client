export function CartDrawerCalculations() {
  return (
    <div className="space-y-4 text-sm">
      <div className="space-y-2 text-md font-bold border-y border-orange-200 py-4">
        <div className="flex justify-between"><span>Subtotal</span><span>$543</span></div>
        <div className="flex justify-between"><span>Taxes</span><span>$4</span></div>
        <div className="flex justify-between"><span>Estimated Shipping</span><span>Calculated at checkout</span></div>
      </div>
      <div className="flex justify-between font-bold text-base"><span>Total</span><span>$547</span></div>
    </div>
  );
}
 