import envConfig from "@/src/config/envConfig";

// Function to fetch blogs with fallback data
export const getBlogs = async () => {
  try {
    const res = await fetch(`${envConfig.baseApi}/blog/get-all-blogs`);

    if (!res.ok) {
      throw new Error(`Failed to blogs: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];  // Return empty array as fallback
  }
};