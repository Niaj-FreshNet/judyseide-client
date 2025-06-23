import TrendingProductsClient from "@/src/components/client/TrendingProductsClient";
import { getTrendingProducts } from "@/src/services/TrendingProducts";

export default async function Page() {
  const res = await getTrendingProducts();
  const products = res.data;
  // console.log("Trending Products:", products);

  return <TrendingProductsClient products={products} />;
}
