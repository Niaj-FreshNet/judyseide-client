import envConfig from "@/src/config/envConfig";

// Function to fetch categories with fallback data
export const getCategories = async () => {
  try {
    const res = await fetch(`${envConfig.baseApi}/category/get-all-categories`);

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];  // Return empty array as fallback
  }
};