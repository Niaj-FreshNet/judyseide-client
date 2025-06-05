import Image from "next/image";

export default function CatalogSection() {
  const catalogs = [
    {
      title: "There’s A Hoop For That",
      image: "/catalog/catalog1.jpg",
      link: "/shop/minimal",
    },
    {
      title: "Emeralds For This Month",
      image: "/catalog/catalog2.jpeg",
      link: "/shop/bold",
    },
    {
      title: "Create your own jewelry!",
      image: "/catalog/catalog3.jpeg",
      link: "/shop/gold",
    },
  ];

  return (
    <div className="max-w-full mx-auto pt-16 flex-grow">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-0">
        {/* Top two side-by-side */}
        {catalogs.slice(0, 2).map((catalog, index) => (
          <div
            key={index}
            className="relative h-[512px] lg:h-[720px] group overflow-hidden rounded-none shadow-md"
          >
            <Image
              src={catalog.image}
              alt={catalog.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              width={1200}
              height={600}
            />

            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-end text-white text-center p-4">
              <h3 className="text-3xl font-sans sm:text-2xl font-bold mb-3 px-3 py-1 rounded-sm">
                {catalog.title}
              </h3>
              <a
                href={catalog.link}
                // className="bg-white text-orange-500 font-semibold px-5 py-2 rounded-sm shadow hover:bg-orange-100 transition"
                className="text-white text-xl underline font-semibold px-5 py-2 rounded-sm hover:text-gray-300 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}

        {/* Bottom full-width */}
        <div className="sm:col-span-2">
          <div className="relative h-[448px] lg:h-[540px] group overflow-hidden rounded-none shadow-md">
            <Image
              src={catalogs[2].image}
              alt={catalogs[2].title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              width={1200}
              height={600}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center p-4">
              <h3 className="text-3xl font-sans font-bold mb-3 px-3 py-1 rounded-sm">
                {catalogs[2].title}
              </h3>
              <a
                href={catalogs[2].link}
                // className="bg-white text-orange-500 font-semibold px-6 py-2 rounded-sm shadow hover:bg-orange-100 transition"
                className="text-white underline text-xl font-semibold px-5 py-2 rounded-sm hover:text-gray-300 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
