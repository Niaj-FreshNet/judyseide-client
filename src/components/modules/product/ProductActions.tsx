"use client";

import { HeartIcon } from "lucide-react";

import { useDrawerManager } from "../../drawers/DrawerManager";

export default function ProductActions() {
  const { openDrawer } = useDrawerManager();

  return (
    <div className="w-full flex gap-4 mt-8">
      <button
        className="w-2/3 bg-orange-500 hover:bg-orange-600 text-lg text-white px-6 py-4"
        onClick={() => openDrawer("cart")}
      >
        Add To Bag
      </button>

      <button
        className="w-1/3 border border-orange-200 text-white px-6 py-4 flex justify-center items-center"
        onClick={() => openDrawer("wishlist")}
      >
        <HeartIcon className="w-6 h-6 text-orange-300" />
      </button>
    </div>
  );
}
