'use client';

import WishlistItem from "./WishlistItem";
import { RelatedProductsInDrawer } from "../CartDrawer/RelatedProductsInDrawer";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getWishlist } from "@/src/services/Wishlist";
import Link from "next/link";
import { useDrawerManager } from "../DrawerManager";

export function WishlistDrawer() {
  const [wishlist, setWishlist] = useState<any[]>([]); // Initialize wishlist as an array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const { closeDrawer } = useDrawerManager();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlist(); // Fetch wishlist from the API
        // console.log("API Response:", response); // Log full response to inspect its structure

        // Check if response contains the 'data' property
        if (response && response.data) {
          // console.log("Response Data Structure:", response.data); // Log the structure of response.data

          // If 'data' is an object and has an array of wishlist items
          if (Array.isArray(response.data.data)) {
            // console.log("Wishlist Items:", response.data.data); // Log actual wishlist items
            setWishlist(response.data.data); // Set wishlist with the nested data array
          } else {
            // console.log("No valid wishlist data found.");
            setWishlist([]); // If data is not valid, set as empty array
          }
        } else {
          // console.log("No data found in the response");
          setWishlist([]); // If no valid data found, set as empty array
        }
      } catch (error) {
        setError("Failed to load wishlist"); // Handle error case
        console.error("Error fetching wishlist:", error); // Log error
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchWishlist();
  }, []); // Ensure fetching only once when component mounts

  // Displaying loading or error message
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-2 space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-orange-200 py-6 my-4 animate-pulse">
          <div className="w-full sm:w-72 h-auto sm:h-64 bg-gray-200"></div> {/* Placeholder for image */}
          <div className="flex flex-col flex-1 justify-between space-y-2">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div className="h-6 w-1/2 bg-gray-300 rounded"></div> {/* Placeholder for name */}
              <div className="h-6 w-1/4 bg-gray-300 rounded"></div> {/* Placeholder for price */}
            </div>

            <div className="flex items-center gap-2 text-sm mt-1">
              <div className="h-4 w-1/3 bg-gray-300 rounded"></div> {/* Placeholder for material */}
            </div>

            <div className="text-xs text-gray-600 mt-1">
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div> {/* Placeholder for size */}
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div> {/* Placeholder for color */}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0">
              <div className="h-6 w-1/3 bg-gray-300 rounded"></div> {/* Placeholder for button */}
            </div>
          </div>
        </div>
        <div className="pt-2 pb-4">
          <RelatedProductsInDrawer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-2">
        <div className="flex flex-col items-center justify-center py-8">
          <FaHeart className="text-6xl text-gray-400 mb-4" /> {/* Heart icon */}
          <p className="text-lg text-gray-600 mb-2">Your wishlist is empty</p>
          <p className="text-sm text-gray-500 mb-4">Start adding items to your wishlist.</p>
          <Link href="/new-in" >
            <button
              onClick={() => closeDrawer()} // Close drawer on button click
              className="px-6 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none"
            >
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-2 space-y-8">
      <div className="pt-2">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <FaHeart className="text-6xl text-gray-400 mb-4" /> {/* Heart icon */}
            <p className="text-lg text-gray-600 mb-2">Your wishlist is empty</p>
            <p className="text-sm text-gray-500 mb-4">Start adding items to your wishlist.</p>
            <Link href="/new-in" >
            <button
              onClick={() => closeDrawer()} // Close drawer on button click
              className="px-6 py-2 text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none"
            >
              Browse Products
            </button>
          </Link>
          </div>
        ) : (
          wishlist.map((item) => (
            <WishlistItem
              key={item.variantId}
              variant={item.variant}
              product={{
                ...item.variant?.product,
              }}
              variantId={item.variantId}
            />
          ))
        )}
      </div>
      <div className="pt-2 pb-4">
        <RelatedProductsInDrawer />
      </div>
    </div>
  );
}
