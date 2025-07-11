import AllProductsClient from "@/src/components/client/AllProductsClient";
import { getProducts } from "@/src/services/Products";
import { Product } from "@/src/types";

type ProductsProps = {
  products: Product[];
  meta: any
};

export default async function AllProductPage() {
  try {
    const { products }: ProductsProps = await getProducts(); // You can pass filters here if needed
    // console.log("Fetched products:", products);

    return <AllProductsClient allProducts={products} />;
  } catch (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>;
  }
}
