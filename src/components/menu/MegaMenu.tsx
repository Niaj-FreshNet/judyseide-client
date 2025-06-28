'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getNavTrendingProducts } from "@/src/services/NavTrendingProducts";

export const MegaMenu = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // trendingProducts.map((product, index) => (
    //                                 <Link href={`/products/${}`} key={index} className="hover:underline cursor-pointer">
    //                                     {product}
    //                                 </Link>
    //                             ))

    // Fetch the trending products on component mount
    useEffect(() => {
        const fetchTrendingProducts = async () => {
            try {
                const products = await getNavTrendingProducts();
                setTrendingProducts(products); // update state with trending products
                setLoading(false); // data loaded
            } catch (err) {
                setError("Failed to load trending products");
                setLoading(false);
            }
        };

        fetchTrendingProducts(); // call the fetch function
    }, []);

    // Loading or error state
    if (error) return <div>{error}</div>;

    return (
        <div className="absolute top-full -left-96 bg-[#FEF6F1] py-10 px-8 shadow-xl z-[99]">
            <div className="w-full max-w-screen-2xl mx-auto my-auto flex flex-row gap-4 justify-center items-start inset-x-0">
                {/* Left Columns: Links */}
                <div className="flex gap-8">
                    <div className="w-32 text-black">
                        <h3 className="font-semibold text-lg mb-6">All Category</h3>
                        <ul className="space-y-6">
                            <li className="hover:underline cursor-pointer">
                                <Link href="/earrings">
                                    Earrings
                                </Link>
                            </li>
                            <li className="hover:underline cursor-pointer">
                                <Link href="/bracelets">
                                    Bracelets
                                </Link>
                            </li>
                            <li className="hover:underline cursor-pointer">
                                <Link href="/necklaces">
                                    Necklaces
                                </Link>
                            </li>
                            <li className="hover:underline cursor-pointer">
                                <Link href="/rings">
                                    Rings
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-44 text-black">
                        <h3 className="font-semibold text-lg mb-6">Trending Now</h3>
                        <ul className="space-y-6">
                            {/* Check if data is loading */}
                            {loading ? (
                                // Skeleton Loader - This will show while loading
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, index) => (
                                        <li key={index} className="h-6 bg-gray-300 animate-pulse rounded-md"></li>
                                    ))}
                                </div>
                            ) : (
                                // Actual trending products list
                                trendingProducts.map((product: { id: number, name: string }, index) => (
                                    <li key={product.id} className="hover:underline cursor-pointer">
                                        <Link href={`/products/${product.id}`}>{product.name}</Link>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>

                {/* Right Column: Image Layout */}
                <div className="flex gap-4 ml-10">
                    {/* Left image - taller */}
                    <div className="w-72 h-72 border-2">
                        <Image
                            src="/menu/megaMenu1.jpg"
                            alt="earrings in hand"
                            width={320}
                            height={320}
                            className="object-cover w-72 h-72 rounded-none"
                        />
                    </div>

                    {/* Right column with two stacked images */}
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
