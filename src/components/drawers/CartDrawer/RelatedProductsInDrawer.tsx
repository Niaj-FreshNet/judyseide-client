export function RelatedProductsInDrawer() {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">You May Also Like</h4>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="min-w-[140px] border rounded p-2 text-center text-sm"
          >
            <img
              src="/earring.jpg"
              alt="Similar"
              className="w-full h-24 object-cover mb-2 rounded"
            />
            <p>Starburst Earrings</p>
            <p className="text-orange-500 font-bold">$756</p>
          </div>
        ))}
      </div>
    </div>
  );
}
