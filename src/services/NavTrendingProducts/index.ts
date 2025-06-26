import envConfig from "@/src/config/envConfig";

export const getNavTrendingProducts = async () => {
    const response = await fetch(`${envConfig.baseApi}/products/get-navbar-products`);
    const data = await response.json();
    if (response.ok) {
        return data.data.overallTrending; // return the trending products list
    } else {
        throw new Error(data.message); // handle error if needed
    }
};
