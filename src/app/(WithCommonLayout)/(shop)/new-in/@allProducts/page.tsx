import AllProductsClient from "@/src/components/client/AllProductsClient";
import { getProducts } from "@/src/services/Products";

export default async function AllProductPage() {
  const res = await getProducts();

  const products = res?.data?.data || []; // ensure fallback

  return <AllProductsClient allProducts={products} />;
}