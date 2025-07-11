import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Product } from "@/src/types";

// Cart structure will store full product data, including variants
interface CartProduct extends Product {
  variantId: string; // Store the variant ID (e.g., size, color)
  quantity: number;  // Quantity of the product/variant in the cart
}

const CART_STORAGE_KEY = "cart";

interface CartContextType {
  cart: CartProduct[];
  addToCart: (product: Product, variantId: string, quantity: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, variantId: string, quantity: number) => {
    console.log("Adding to cart:", product.id, variantId, quantity);
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        // (item) => item.id === product.id && item.variantId === variantId
        (item) => item.variantId === variantId
      );

      if (existingProduct) {
        // If product with this variant already exists in the cart, increase the quantity
        return prevCart.map((item) =>
          // item.id === product.id && item.variantId === variantId
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add the new product with its variant as a separate entry
        return [
          ...prevCart,
          { ...product, variantId, quantity }
        ];
      }
    });
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId || item.variantId !== variantId));
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.variantId === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY); // Remove cart from localStorage
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
