"use client";

interface LoadMoreFooterProps {
  viewed: number;
  total: number;
  onLoadMore: () => void;
  isLoading?: boolean;
}

export default function LoadMoreFooter({
  viewed,
  total,
  onLoadMore,
  isLoading = false,
}: LoadMoreFooterProps) {
  console.log("LoadMoreFooter Props:", { viewed, total, isLoading });

  const cappedViewed = Math.min(viewed, total); // Ensure viewed is never more than total

  if (isLoading) {
    return (
      <div className="w-full mt-8 flex justify-center">
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-md" />
      </div>
    );
  }

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="text-center mt-24 mb-8">
      <p className="text-sm text-default-900 mb-4">
        You’ve viewed {String(cappedViewed).padStart(2, "0")} of{" "}
        {String(total).padStart(2, "0")} products.
      </p>
      <button
        className="text-default-900 font-semibold px-6 py-2 text-md border border-orange-200 rounded-none hover:bg-orange-400 transition"
        onClick={cappedViewed < total ? onLoadMore : handleBackToTop}
      >
        {cappedViewed < total ? "Load More" : "Back to Top"}
      </button>
    </div>
  );
}
