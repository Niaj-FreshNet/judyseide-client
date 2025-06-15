import envConfig from "@/src/config/envConfig";
// import { delay } from "@/src/utils/delay";

export const getTrendingProducts = async () => {
    const res = await fetch(
        `${envConfig.baseApi}/products/get-trending-products`,
    );

    // await delay(2000);

    return res.json();
};
