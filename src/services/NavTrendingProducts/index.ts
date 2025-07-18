import envConfig from "@/src/config/envConfig";

export const getNavTrendingProducts = async () => {
  const response = await fetch(`${envConfig.baseApi}/products/get-navbar-products`);
  const data = await response.json();

  if (response.ok) {
    return {
      overallTrending: data.data.overallTrending,
      trendingByCategory: data.data.trendingByCategory,
    };
  } else {
    throw new Error(data.message || "Failed to fetch navbar products");
  }
};
