import { ReactNode } from 'react'

export default function layout({
  children, 
  trendingProducts,
  catalogSection,
  storyAndServices,
  gallerySection,
  reviewSection,
  faqSection,
}: {children: ReactNode, 
  trendingProducts: ReactNode,
  catalogSection: ReactNode,
  storyAndServices: ReactNode,
  gallerySection: ReactNode,
  reviewSection: ReactNode,
  faqSection: ReactNode,
}) {
  return (
    <>
      {children}
      {trendingProducts}
      {catalogSection}
      {storyAndServices}
      {gallerySection}
      {reviewSection}
      {faqSection}
    </>
  )
}
