interface DrawerHeaderProps {
  onAddToBag: () => void;
  onWishlist: () => void;
  currentDrawer: "cart" | "wishlist";
}

export function DrawerHeader({ onAddToBag, onWishlist, currentDrawer }: DrawerHeaderProps) {
  return (
    <header className="mx-auto flex justify-between items-center px-6">
      <div className="w-full mx-auto flex gap-0 justify-center items-center border border-orange-200 p-2 rounded-none">
        <button
          className={`px-6 py-2 font-semibold transition rounded-none border-none ${
            currentDrawer === "cart"
              ? "bg-orange-500 text-white"
              : "bg-white text-orange-500 hover:bg-orange-100"
          }`}
          onClick={onAddToBag}
        >
          Add to Bag
        </button>
        <button
          className={`px-6 py-2 font-medium transition rounded-none border-none ${
            currentDrawer === "wishlist"
              ? "bg-orange-500 text-white"
              : "bg-white text-orange-500 hover:bg-orange-100"
          }`}
          onClick={onWishlist}
        >
          Wishlist
        </button>
      </div>
    </header>
  );
}
