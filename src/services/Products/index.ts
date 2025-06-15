import envConfig from "@/src/config/envConfig";

export const getProducts = async () => {
    const res = await fetch(
        `${envConfig.baseApi}/products/get-all-products`,
    );

    return res.json();
};