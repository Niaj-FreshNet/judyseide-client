import { ReactNode } from 'react'

export default function layout({
  children,
  allProducts 
}: {children: ReactNode, 
    allProducts: ReactNode,
}) {
  return (
    <>
      {children}
      {allProducts}
    </>
  )
}
