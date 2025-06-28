import Cookies from 'js-cookie'; // Import js-cookie to handle cookies on the client side
import envConfig from "@/src/config/envConfig";

// Helper function to get the auth headers with the token from cookies
const getAuthHeaders = () => {
  const accessToken = Cookies.get("accessToken"); // Get the token from cookies using js-cookie

  console.log("accessToken", accessToken);

  if (accessToken) {
    return new Headers({
      'Authorization': `${accessToken}`, // Add the Authorization header with the token
    });
  }

  return new Headers(); // Return empty headers if no token is found
};

// Fetch wishlist function
export const getWishlist = async () => {
  try {
    const res = await fetch(`${envConfig.baseApi}/wishlist/get-wishlist`, {
      headers: getAuthHeaders(), // Add authorization header
    });
    
    if (!res.ok) {
        throw new Error(`Failed to fetch wishlists: ${res.statusText}`);
    }
    
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    return [];
  }
};

// Add to wishlist function
export const addToWishlist = async (itemId: string) => {
  try {
    const res = await fetch(`${envConfig.baseApi}/wishlist/add-to-wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...Object.fromEntries(getAuthHeaders().entries()), // Merge headers from getAuthHeaders
      },
      body: JSON.stringify({ itemId }),
    });

    if (!res.ok) {
      throw new Error(`Failed to add item to wishlist: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return null;
  }
};

// Remove from wishlist function
export const removeFromWishlist = async (wishlistId: string) => {
  try {
    const res = await fetch(`${envConfig.baseApi}/wishlist/remove-from-wishlist/${wishlistId}`, {
      method: "DELETE",
      headers: getAuthHeaders(), // Add authorization header
    });

    if (!res.ok) {
      throw new Error(`Failed to remove item from wishlist: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return null;
  }
};
