import React from "react";

const SearchResults = ({ results, isLoading }: { results: any[]; isLoading: boolean }) => {
  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Searching for products...
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No products found
      </div>
    );
  }

  return (
    <div className="px-2 py-4">
      <h2 className="text-xl font-semibold mb-4 text-left text-orange-400 ml-4 ">Popular Search</h2>
      <ul className="space-y-4">
        {results.map((product) => (
          <li key={product.id} className="border-b p-1 hover:bg-gray-50 transition-colors rounded-md">
            <div className="flex items-center gap-4">
              {/* Product Image (Optional: Uncomment if you have an image field) */}
              {/* <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-md" /> */}

              <div className="flex-1 p-4">
                <h3 className="text-lg font-medium text-black">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>

              {/* Optional: Add price field if available */}
              {/* <p className="text-sm font-semibold text-orange-500">
                ${product.price}
              </p> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
