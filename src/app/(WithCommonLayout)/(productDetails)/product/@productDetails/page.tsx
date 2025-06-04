import ProductActions from "@/src/components/modules/product/ProductActions";
import ProductImages from "@/src/components/modules/product/ProductImages";
import ProductInfo from "@/src/components/modules/product/ProductInfo";

const mockImages = ["/products/earring.jpg", "/products/earring2.jpg", "/products/earring3.jpg"];

export default function ProductDetails() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mx-auto">
      <ProductImages images={mockImages} />
      <div className="space-y-24">
        <ProductInfo
          badge="New"
          description="Lorem ipsum dolor sit amet consectetur. Mollis at in suscipit est morbi. Eget cras vitae imperdiet a felis et massa lorem. Enim nec tincidunt vehicula elit in leo vestibulum egestas blandit. Sapien sed ullamcorper est sit morbi nam."
          material="14k Yellow Gold"
          price="425"
          title="Starburst Earring"
        />
        <ProductActions />
      </div>
    </div>
  );
}
