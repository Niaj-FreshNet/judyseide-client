export default function Loading() {
  return (
    <div className="w-full flex flex-col items-center space-y-6">
      <div className="animate-pulse bg-gray-300 w-full h-[200px] rounded-md"></div>
      <div className="animate-pulse bg-gray-300 w-3/4 h-8 rounded-md"></div>
      <div className="animate-pulse bg-gray-300 w-2/3 h-6 rounded-md"></div>
      <div className="animate-pulse bg-gray-300 w-1/2 h-6 rounded-md"></div>
    </div>
  );
}