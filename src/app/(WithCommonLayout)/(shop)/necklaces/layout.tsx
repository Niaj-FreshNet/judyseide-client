import { ReactNode } from "react";

import Container from "@/src/components/UI/Container";

export default function layout({
  breadcrumbs,
  children,
  necklaceProducts,
}: {
  breadcrumbs: ReactNode;
  children: ReactNode;
  necklaceProducts: ReactNode;
}) {
  return (
    <Container className="pt-8">
      {breadcrumbs}
      {children}
      {necklaceProducts}
    </Container>
  );
}
