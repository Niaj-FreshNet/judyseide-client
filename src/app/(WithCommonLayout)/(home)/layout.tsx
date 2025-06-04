import { ReactNode } from "react";

export default function layout({
  children,
  categorySection,
  trendingProducts,
  catalogSection,
  storyAndServices,
  gallerySection,
  reviewSection,
  faqSection,
}: {
  children: ReactNode;
  categorySection: ReactNode;
  trendingProducts: ReactNode;
  catalogSection: ReactNode;
  storyAndServices: ReactNode;
  gallerySection: ReactNode;
  reviewSection: ReactNode;
  faqSection: ReactNode;
}) {
  return (
    <>
      {children}
      {categorySection}
      {trendingProducts}
      {catalogSection}
      {storyAndServices}
      {gallerySection}
      {reviewSection}
      {faqSection}
    </>
  );
}
