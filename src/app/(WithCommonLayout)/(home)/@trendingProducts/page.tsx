import Container from "@/src/components/UI/Container";
import ProductCard from "@/src/components/UI/ProductCard";
import SectionTitle from "@/src/components/UI/SectionTitle";

const sampleProducts = [
  {
    name: "Starburst Earrings",
    price: 756,
    image: "/hero1.jpg",
    badge: "Best selling",
    material: "18k Gold Vermeil",
  },
  {
    name: "Starburst Earrings",
    price: 756,
    image: "/hero2.jpg",
    badge: "Best selling",
    material: "18k Gold Vermeil",
  },
  {
    name: "Starburst Earrings",
    price: 756,
    image: "/hero1.jpg",
    badge: "Best selling",
    material: "18k Gold Vermeil",
  },
  {
    name: "Starburst Earrings",
    price: 756,
    image: "/hero2.jpg",
    badge: "Best selling",
    material: "18k Gold Vermeil",
  },
];

export default function TrendingProducts() {
  return (
    <Container className="">
      <div className="flex flex-col gap-6">
        <SectionTitle 
          title="Top Trending Products"
          subtitle=""
          align="left"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8">
          {sampleProducts.map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              showAddToBag
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
