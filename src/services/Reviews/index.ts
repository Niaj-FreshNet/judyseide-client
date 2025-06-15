import envConfig from "@/src/config/envConfig";

export const getReviews = async () => {
    const res = await fetch(
        `${envConfig.baseApi}/review/get-all-reviews`,
    );

    return res.json();
};