import envConfig from "@/src/config/envConfig";

export const getWishlist = async () => {
  try {
    const res = await fetch(`${envConfig.baseApi}/wishlist/get-wishlist`);

    if (!res.ok) {
      throw new Error(`Failed to fetch wishlists: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching wishlists:', error);
    return [];
  }
};

