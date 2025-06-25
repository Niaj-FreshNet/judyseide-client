

export default function RelatedProductsLoading() {
    const skeletons = new Array(4).fill(0); // Adjust count as needed

    return (
        <div className="flex gap-4 overflow-hidden">
            {skeletons.map((_, index) => (
                <div
                    key={index}
                    className="min-w-[250px] flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_33%] lg:flex-[0_0_25%]"
                >
                    <div className="w-full h-72 lg:h-96 bg-gray-200 animate-pulse rounded-none mb-2" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded-none w-3/4 mb-1" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded-none w-1/2" />
                </div>
            ))}
        </div>
    );
}
