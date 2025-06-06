import { ReactNode } from "react";

import Container from "@/src/components/UI/Container";

export default function layout({
  breadcrumbs,
  children,
  allProducts,
}: {
  breadcrumbs: ReactNode;
  children: ReactNode;
  allProducts: ReactNode;
}) {
  return (
    <Container className="pt-8">
      {breadcrumbs}
      {children}
      {allProducts}
    </Container>
  );
}
