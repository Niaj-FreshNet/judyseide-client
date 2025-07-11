'use client';

import { HeartIcon } from "lucide-react";
import { useDrawerManager } from "../../drawers/DrawerManager";
import { useCart } from "@/src/context/cart.context";
import { Product } from "@/src/types";
import { toast } from "sonner";
import { addToWishlist } from "@/src/services/Wishlist";
import { useRouter } from "next/navigation";

export default function ProductActions({
  product,
  // variantId,
  selectedSize,
  selectedColor,
  quantity,
  variants = [],
}: {
  product: Product;
  // variantId: string;
  selectedSize: string | null;
  selectedColor: string | null;
  quantity: number;
  variants: { size: string; color: string; price: number; quantity: number }[]; // Adding variants to check availability
}) {
  const { openDrawer } = useDrawerManager();
  const { addToCart } = useCart(); // Get the addToCart function from the CartContext
  const router = useRouter();

  // Check if the selected variant (size & color) is available
  const selectedVariant = variants.find(
    (variant) => variant.size === selectedSize && variant.color === selectedColor
  );

  const variantId = product.variants?.find(
    (variant) => variant.size === selectedSize && variant.color === selectedColor
  )?.id || "";


  // console.log(product)

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error(`This product with ${selectedSize} size and ${selectedColor} color is not available.`, {
        position: "top-right",
        style: {
          backgroundColor: "#FB923C",
          color: "#fff",
        }
      });
      return;
    };
    if (selectedSize && selectedColor) {
      toast.success("Item added to cart!", {
        position: "top-center",
        style: {
          backgroundColor: "#FB923C",
          color: "#fff",
        }
      });
      addToCart(product, variantId, quantity);
      openDrawer("cart");
    } else {
      toast.error("Please select size and color.", {
        position: "top-right",
        style: {
          backgroundColor: "#FB923C",
          color: "#fff",
        }
      });
    }
  };

  const handleAddToWishlist = async () => {
    if (!selectedVariant) {
      toast.error(`This product with ${selectedSize} size and ${selectedColor} color is not available.`, {
        position: "top-right",
        style: {
          backgroundColor: "#FB923C",
          color: "#fff",
        }
      });
      return;
    };
    if (selectedSize && selectedColor) {
      try {
        // Add to wishlist using the API function
        const response = await addToWishlist(variantId); // Wait for the response from API function

        if (response) { // If the response is successful (not null)
          toast.success("Item added to wishlist!", {
            position: "top-center",
            style: {
              backgroundColor: "#FB923C",
              color: "#fff",
            }
          });
          openDrawer("wishlist"); // Open the drawer after a successful addition
        } else {
          throw new Error("Failed to add item to wishlist.");
        }
      } catch (error) {
        toast.error("You must be log in to add wishlist", {
          position: "top-right",
          style: {
            backgroundColor: "#FB923C",
            color: "#fff",
          }
        });
        router.push("/login");
      }
    } else {
      toast.error("Please select size and color.", {
        position: "top-right",
        style: {
          backgroundColor: "#FB923C",
          color: "#fff",
        }
      });
    }
  };

  return (
    <div className="w-full flex gap-4 mt-8">
      <button
        className="w-2/3 bg-orange-500 hover:bg-orange-600 text-lg text-white px-6 py-4"
        onClick={handleAddToCart} // Use handleAddToCart on click
      >
        Add To Bag
      </button>

      <button
        className="w-1/3 border border-orange-200 text-white px-6 py-4 flex justify-center items-center"
        onClick={handleAddToWishlist}
      >
        <HeartIcon className="w-6 h-6 text-orange-300" />
      </button>
    </div>
  );
}
