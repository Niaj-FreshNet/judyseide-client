import Image from "next/image";

export const MegaMenu = () => {
    return (
        <div className="absolute top-full -left-96 bg-[#FBF3ED] py-10 px-8 shadow-xl z-[99]">
            <div className="w-full max-w-screen-2xl mx-auto my-auto flex flex-row gap-4 justify-center items-start inset-x-0">
                {/* Left Columns: Links */}
                <div className="flex gap-8">
                    <div className="w-32">
                        <h3 className="font-semibold text-lg mb-6 text-default-800">All Category</h3>
                        <ul className="space-y-6 text-default-800">
                            <li className="hover:underline cursor-pointer">Earrings</li>
                            <li className="hover:underline cursor-pointer">Brackets</li>
                            <li className="hover:underline cursor-pointer">Necklaces</li>
                            <li className="hover:underline cursor-pointer">Rings</li>
                        </ul>
                    </div>
                    <div className="w-44">
                        <h3 className="font-semibold text-lg mb-6 text-default-800">Trending Now</h3>
                        <ul className="space-y-6 text-default-800">
                            <li className="hover:underline cursor-pointer">Pearl Jewelry</li>
                            <li className="hover:underline cursor-pointer">Organic Collections</li>
                            <li className="hover:underline cursor-pointer">Bold Statement Jewelry</li>
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
