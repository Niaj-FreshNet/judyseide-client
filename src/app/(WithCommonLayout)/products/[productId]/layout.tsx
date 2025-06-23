import { ReactNode } from "react";

import Container from "@/src/components/UI/Container";

export default function layout({
  breadcrumbs,
  productDetails,
  children,
}: {
  breadcrumbs: ReactNode;
  productDetails: ReactNode;
  children: ReactNode;
}) {
  return (
    <Container className="pt-8">
      {breadcrumbs}
      {productDetails}
      {children}
    </Container>
  );
}
