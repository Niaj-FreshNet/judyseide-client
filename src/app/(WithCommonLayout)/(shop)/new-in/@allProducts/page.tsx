import AllProductsClient from "@/src/components/client/AllProductsClient";
import { getProducts } from "@/src/services/Products";
import { Product } from "@/src/types";

type ProductsProps = {
  products: Product[];
  meta: any
};

export default async function AllProductPage() {
  try {
    // Fetch products from the backend (can include filters here)
    const { products }: ProductsProps = await getProducts(); // You can pass filters here if needed
    console.log("Fetched products:", products);

    // Pass the fetched products to the client-side component
    return <AllProductsClient allProducts={products} />;
  } catch (error) {
    console.error("Error fetching products:", error);
    // You can return a fallback UI here in case of an error
    return <div>Error fetching products</div>;
  }
}
