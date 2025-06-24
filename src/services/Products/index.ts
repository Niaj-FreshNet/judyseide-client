// services/Products.ts
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
  limit: number = 10
) => {
  try {
    // Initialize URLSearchParams
    const queryParams = new URLSearchParams();

    // Only add filters if they are set
    if (filters.category) queryParams.append("categories", filters.category);
    if (filters.material) queryParams.append("materials", filters.material);
    
    // Add price range filters if selected
    if (filters.price?.above500) queryParams.append("priceRange", "above500");
    if (filters.price["300to500"]) queryParams.append("priceRange", "300to500");
    if (filters.price["150to300"]) queryParams.append("priceRange", "150to300");
    if (filters.price.under150) queryParams.append("priceRange", "under150");

    // Add availability filter if any option is selected
    if (filters.availability.inStock) queryParams.append("availability", "in stock");
    if (filters.availability.outOfStock) queryParams.append("availability", "out of stock");

    // Add sorting filter
    queryParams.append("sortPrice", filters.sortBy);

    // Add pagination
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    // Log the query string for debugging
    console.log("Fetching products with query:", queryParams.toString());

    // Make the request with the constructed query string
    const res = await fetch(`${envConfig.baseApi}/products/get-all-products?${queryParams.toString()}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }
    
    const data = await res.json();

    // Map the response to match the data structure for products
    const products = data?.data?.data || []; // Adjust based on the API response structure
    console.log("Products:", products); // Log fetched products for debugging

    return {
      products: products.map((product: any) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl[0], // Assuming you want the first image URL
        tags: product.tags,
        salesCount: product.salesCount,
        published: product.published,
        category: product.category?.categoryName,
        material: product.material?.materialName,
        variants: product.variants.map((variant: any) => ({
          size: variant.size,
          color: variant.color,
          price: variant.price,
          quantity: variant.quantity,
        })),
      })),
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
