"use client";

interface LoadMoreFooterProps {
  viewed: number;
  total: number;
  onLoadMore: () => void;
}

export default function LoadMoreFooter({ viewed, total, onLoadMore }: LoadMoreFooterProps) {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="text-center mt-24 mb-8">
      <p className="text-sm text-default-900 mb-4">
        You’ve viewed {String(viewed).padStart(2, "0")} of {String(total).padStart(2, "0")}{" "}
        products.
      </p>
      <button
        className="text-default-900 font-semibold px-6 py-2 text-md border border-orange-200 rounded-none hover:bg-orange-400 transition"
        onClick={viewed < total ? onLoadMore : handleBackToTop}
      >
        {viewed < total ? "Load More" : "Back to Top"}
      </button>
    </div>
  );
}
