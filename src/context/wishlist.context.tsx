import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Product } from "@/src/types"; // Make sure to adjust the import path for your types

interface WishlistProduct extends Product {
  variantId: string; // Variant ID
  price: number;
  color: string;
  size: string;
}

const WISHLIST_STORAGE_KEY = "wishlist";

interface WishlistContextType {
  wishlist: WishlistProduct[];
  addToWishlist: (product: Product, variantId: string) => void;
  removeFromWishlist: (productId: string, variantId: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  }, [wishlist]);

const addToWishlist = (product: Product, variantId: string) => {
  setWishlist((prevWishlist) => {
    const existingProduct = prevWishlist.find(
      (item) => item.id === product.id && item.variantId === variantId
    );
    if (existingProduct) {
      return prevWishlist; // Don't add duplicate products
    }

    // Ensure the product has the necessary properties
    const wishlistItem: WishlistProduct = {
      ...product,
      variantId,
      price: product.price,  // Add price
      color: product.color,  // Add color
      size: product.size,    // Add size
    };

    return [...prevWishlist, wishlistItem];
  });
};
  const removeFromWishlist = (productId: string, variantId: string) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== productId || item.variantId !== variantId));
  };

  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
