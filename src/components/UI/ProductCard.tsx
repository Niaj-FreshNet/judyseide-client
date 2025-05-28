type Product = {
  name: string;
  price: number;
  image: string;
  badge: string;
  material: string;
};

interface ProductCardProps {
  product: Product;
  showAddToBag?: boolean;
}

export default function ProductCard({ product, showAddToBag }: ProductCardProps) {
  return (
    <div className="w-full border border-orange-100 text-default-900 rounded-none group relative transition-all duration-300">
      {/* Badge */}
      <span className="absolute top-2 left-2 bg-orange-100 text-default-600 text-sm px-2 py-1 rounded-none z-10">
        {product.badge}
      </span>

      {/* Image Wrapper with hover button */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {showAddToBag && (
          <button
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-4 py-2 text-sm rounded-none shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Add to Bag
          </button>
        )}
      </div>       
       <div className="border-b border-orange-100 " />


      {/* Info */}
      <div className="mt-4 space-y-2">
        <div className="px-4 py-1">
          <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-md font-semibold">${product.price}</p>
        </div>
        <div className="border-b border-orange-100 " />
        <div className="flex items-center px-4 py-2 gap-2 text-xs">
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
          <span className="">{product.material}</span>
        </div>
      </div>
    </div>
  );
}
