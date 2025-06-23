import envConfig from "@/src/config/envConfig";

export const getTrendingProducts = async () => {
  try {
    const res = await fetch(`${envConfig.baseApi}/products/get-trending-products`);

    if (!res.ok) {
      throw new Error(`Failed to fetch trending products: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching trending products:', error);
    return [];  // Return empty array as fallback in case of error
  }
};