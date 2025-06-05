import Image from "next/image";

export const MegaMenu = () => {
    return (
        <div className="absolute top-full left-0 bg-orange-50 py-10 px-8 shadow-xl z-[99]">
            <div className="w-full mx-auto flex flex-row justify-between items-start">
                {/* Left Columns: Links */}
                <div className="flex gap-16">
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-gray-900">All Category</h3>
                        <ul className="space-y-4 text-gray-700">
                            <li className="hover:underline cursor-pointer">Earrings</li>
                            <li className="hover:underline cursor-pointer">Brackets</li>
                            <li className="hover:underline cursor-pointer">Necklaces</li>
                            <li className="hover:underline cursor-pointer">Rings</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-gray-900">Trending Now</h3>
                        <ul className="space-y-4 text-gray-700">
                            <li className="hover:underline cursor-pointer">Pearl Jewelry</li>
                            <li className="hover:underline cursor-pointer">Organic Collections</li>
                            <li className="hover:underline cursor-pointer">Bold Statement Jewelry</li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Image Layout */}
                <div className="flex gap-4 ml-10">
                    {/* Left image - taller */}
                    <div className="w-80 h-48 border-2 border-indigo-500">
                        <Image
                            src="/products/earring.jpg"
                            alt="earrings in hand"
                            width={220}
                            height={320}
                            className="object-cover rounded-md"
                        />
                    </div>

                    {/* Right column with two stacked images */}
                    <div className="flex flex-col gap-4">
                        <Image
                            src="/products/earring2.jpg"
                            alt="model wearing earrings"
                            width={220}
                            height={180}
                            className="object-cover rounded-md"
                        />
                        <Image
                            src="/products/earring3.jpg"
                            alt="gold rings"
                            width={220}
                            height={80}
                            className="object-cover rounded-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
