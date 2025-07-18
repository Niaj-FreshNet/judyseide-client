'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getNavTrendingProducts } from "@/src/services/NavTrendingProducts";

export const MegaMenu = () => {
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
  const [trendingByCategory, setTrendingByCategory] = useState<Record<string, any[]>>({});
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const { overallTrending, trendingByCategory } = await getNavTrendingProducts();
        setTrendingProducts(overallTrending);
        setTrendingByCategory(trendingByCategory);
      } catch (err) {
        setError("Failed to load trending products");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  const categories = ["EARRINGS", "BRACELETS", "NECKLACES", "RINGS"];

  const renderProducts = () => {
    const productsToShow =
      hoveredCategory && trendingByCategory[hoveredCategory]
        ? trendingByCategory[hoveredCategory]
        : trendingProducts;

    return productsToShow.map((product) => (
      <li key={product.id} className="hover:underline cursor-pointer">
        <Link href={`/products/${product.id}`}>{product.name}</Link>
      </li>
    ));
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="absolute top-full -left-96 bg-[#FEF6F1] py-10 px-8 shadow-xl z-[99]">
      <div className="w-full max-w-screen-2xl mx-auto my-auto flex flex-row gap-4 justify-center items-start inset-x-0">
        {/* Left Column: Categories */}
        <div className="flex gap-8">
          <div className="w-32 text-black">
            <h3 className="font-semibold text-lg mb-6">All Category</h3>
            <ul className="space-y-6">
              {categories.map((category) => (
                <li
                  key={category}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="hover:underline cursor-pointer"
                >
                  <Link href={`/${category.toLowerCase()}`}>
                    {category.charAt(0) + category.slice(1).toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Trending or Hovered Products */}
          <div className="w-44 text-black">
            <h3 className="font-semibold text-lg mb-6">
              {hoveredCategory
                ? `${hoveredCategory.charAt(0) + hoveredCategory.slice(1).toLowerCase()}`
                : "Trending Now"}
            </h3>
            <ul className="space-y-6">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <li
                      key={index}
                      className="h-6 bg-gray-300 animate-pulse rounded-md"
                    ></li>
                  ))}
                </div>
              ) : (
                renderProducts()
              )}
            </ul>
          </div>
        </div>

        {/* Right Column: Images */}
        <div className="flex gap-4 ml-10">
          <div className="w-72 h-72 border-2">
            <Image
              src="/menu/megaMenu1.jpg"
              alt="earrings in hand"
              width={320}
              height={320}
              className="object-cover w-72 h-72 rounded-none"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="w-72 h-48 border-2">
              <Image
                src="/menu/megaMenu2.jpg"
                alt="model wearing earrings"
                width={220}
                height={180}
                className="object-cover w-72 h-48 rounded-none"
              />
            </div>
            <div className="w-72 h-20 border-2">
              <Image
                src="/menu/megaMenu3.jpg"
                alt="gold rings"
                width={220}
                height={80}
                className="object-cover w-72 h-20 rounded-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
