import envConfig from "@/src/config/envConfig";
import { Filters } from "@/src/types";

// Function to fetch products with filters and pagination
export const getProducts = async (
  filters: Filters = {
    availability: { inStock: false, outOfStock: false },
    price: {
      under150: false,
      "150to300": false,
      "300to500": false,
      above500: false,
    },
    sortBy: "price-low-to-high",
    category: "",
    material: "",
  },
  page: number = 1,
  limit: number = 10,
  searchTerm: string = ""
) => {
  try {
    // Initialize URLSearchParams
    const queryParams = new URLSearchParams();

    if (searchTerm) queryParams.append("searchTerm", searchTerm);
    // console.log("searchTerm", searchTerm)
    
    // console.log("filter", filters)

    // Add availability filter if any option is selected
    if (filters.availability.inStock) queryParams.append("stock", "in");
    if (filters.availability.outOfStock) queryParams.append("stock", "out");

    // Add sorting filter based on selected sort option
    if (filters.sortBy === "price-low-to-high") {
      queryParams.append("sortBy", "price_asc");
    } else if (filters.sortBy === "price-high-to-low") {
      queryParams.append("sortBy", "price_desc");
    }

    // Add category and material filters if available
    if (filters.categoryName) queryParams.append("categoryName", filters.categoryName);
    if (filters.material) queryParams.append("materialName", filters.material);

    // Add price filters (handling ranges)
    if (filters.price?.under150) queryParams.append("maxPrice", "150");
    if (filters.price["150to300"]) {
      queryParams.append("minPrice", "150");
      queryParams.append("maxPrice", "300");
    }
    if (filters.price["300to500"]) {
      queryParams.append("minPrice", "300");
      queryParams.append("maxPrice", "500");
    }
    if (filters.price.above500) queryParams.append("minPrice", "500");

    // Add pagination
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    // Make the request with the constructed query string
    const res = await fetch(`${envConfig.baseApi}/products/get-all-products?${queryParams.toString()}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const data = await res.json();

    // Map the response to match the data structure for products
    const products = data?.data?.data || [];
    return {
      products,
      meta: data?.data?.meta || {
        page: 1,
        limit: 10,
        total: 0,
        totalPage: 1,
      },
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], meta: { page: 1, limit: 10, total: 0, totalPage: 1 } }; // Return fallback structure
  }
};
