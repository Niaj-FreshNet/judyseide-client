export default function Loading() {
    const skeletonArray = new Array(9).fill(0); // Create an array with 9 elements to generate 9 skeleton cards

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {skeletonArray.map((_, index) => (
                <div key={index} className="border border-orange-200 rounded-md p-4">
                    <div className="animate-pulse flex space-x-4">
                        <div className="bg-gray-300 h-72 w-full rounded-md"></div>
                    </div>
                    <div className="mt-4">
                        <div className="bg-gray-300 h-6 w-3/4 rounded-md"></div>
                        <div className="bg-gray-300 h-4 w-1/2 mt-2 rounded-md"></div>
                        <div className="bg-gray-300 h-4 w-2/3 mt-2 rounded-md"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}