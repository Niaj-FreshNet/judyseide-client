import envConfig from "@/src/config/envConfig";

// Function to fetch reviews with fallback data
export const getReviews = async () => {
  try {
    const res = await fetch(`${envConfig.baseApi}/review/get-all-reviews`);

    if (!res.ok) {
      throw new Error(`Failed to fetch reviews: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];  // Return empty array as fallback
  }
};