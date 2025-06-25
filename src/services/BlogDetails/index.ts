import envConfig from "@/src/config/envConfig";

// Function to fetch a single blog by ID
export const getBlogDetails = async (id: string) => {
  try {
    const res = await fetch(`${envConfig.baseApi}/blog/get-blog/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch blog: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog details:", error);
    return null; // Return null as fallback
  }
};
