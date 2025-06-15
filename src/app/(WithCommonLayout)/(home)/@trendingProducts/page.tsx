import TrendingProductsClient from "@/src/components/client/TrendingProductsClient";
import { getTrendingProducts } from "@/src/services/TrendingProducts";

export default async function Page() {
  const res = await getTrendingProducts();
  const products = res.data;

  return <TrendingProductsClient products={products} />;
}
