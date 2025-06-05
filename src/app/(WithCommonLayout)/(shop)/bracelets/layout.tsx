import { ReactNode } from "react";

import Container from "@/src/components/UI/Container";

export default function layout({
  breadcrumbs,
  children,
  braceletProducts,
}: {
  breadcrumbs: ReactNode;
  children: ReactNode;
  braceletProducts: ReactNode;
}) {
  return (
    <Container className="pt-8">
      {breadcrumbs}
      {children}
      {braceletProducts}
    </Container>
  );
}
