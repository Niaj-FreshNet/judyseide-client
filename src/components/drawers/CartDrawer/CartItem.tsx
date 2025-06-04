import Image from "next/image";

export default function CartItem() {
  return (
    <div className="flex gap-6 border-b border-orange-200 py-6 my-4">
      <Image
        alt="Starburst Earrings"
        className="w-72 h-64 object-contain border border-orange-200"
        src="/products/earring.jpg"
      />
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold">Starburst Earrings</h3>
          <p className="text-lg font-bold text-black">$756</p>
        </div>

        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="w-4 h-4 rounded-full bg-yellow-400 border" />
          <span className="text-default-600">18k Gold Vermeil</span>
        </div>

        <p className="text-xs text-gray-400 mt-1">
          Lorem ipsum dolor sit amet consectetur. Mollis at in suscipit est morbi. Eget cras vitae
          imperdiet a felis et massa lorem.
        </p>

        <div className="flex items-end justify-start gap-2">
          <div className="flex items-center gap-2 mt-2 p-1 border border-orange-200">
            <button className="w-8 h-8 text-xl leading-none">+</button>
            <span className="w-6 text-center text-orange-400">1</span>
            <button className="w-8 h-8 text-xl leading-none">-</button>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="">
            <button className="text-sm font-medium underline underline-offset-2 hover:text-orange-600 transition">
              Move to Wishlist
            </button>
          </div>
          <div className="">
            <button className="text-sm font-medium underline underline-offset-2 hover:text-orange-600 transition">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
