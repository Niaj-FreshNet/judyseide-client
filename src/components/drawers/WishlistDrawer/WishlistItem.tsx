import Image from "next/image";

export default function WishlistItem() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-orange-200 py-6 my-4">
      <Image
        alt="Starburst Earrings"
        className="w-full sm:w-72 h-auto sm:h-64 object-contain border border-orange-200"
        src="/products/earring.jpg"
        width={1200}
        height={600}
      />

      <div className="flex flex-col flex-1 justify-between space-y-2">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <h3 className="text-base sm:text-lg font-semibold">Starburst Earrings</h3>
          <p className="text-base sm:text-lg font-bold text-black">$756</p>
        </div>

        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="w-4 h-4 rounded-full bg-yellow-400 border" />
          <span className="text-default-600">18k Gold Vermeil</span>
        </div>

        <p className="text-xs text-gray-400 mt-1">
          Lorem ipsum dolor sit amet consectetur. Mollis at in suscipit est morbi. Eget cras vitae
          imperdiet a felis et massa lorem.
        </p>

        <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
          <button className="text-sm font-medium underline underline-offset-2 hover:text-orange-600 transition">
            Move to Bag
          </button>
          <button className="text-sm font-medium underline underline-offset-2 hover:text-orange-600 transition">
            Remove Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
