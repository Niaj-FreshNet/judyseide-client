import envConfig from "@/src/config/envConfig";

// Function to fetch a product by its ID
export const getProductById = async (productId: string) => {
  try {
    const res = await fetch(`${envConfig.baseApi}/products/get-product/${productId}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;  // Return null as fallback
  }
};
