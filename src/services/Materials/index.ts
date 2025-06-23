import envConfig from "@/src/config/envConfig";

// Adjusting the getMaterials function to handle errors better
export const getMaterials = async () => {
  try {
    const res = await fetch(`${envConfig.baseApi}/materials/get-all-materials`);

    if (!res.ok) {
      throw new Error(`Failed to fetch materials: ${res.statusText}`);
    }

    const data = await res.json();

    // Check if 'data' exists in the response before accessing it
    if (!data || !data.data) {
      throw new Error('Materials data is missing from the response');
    }

    return data;
  } catch (error) {
    console.error('Error fetching materials:', error);
    return { data: [] };  // Return empty array if an error occurs
  }
};
