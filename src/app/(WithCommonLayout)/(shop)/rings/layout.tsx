import { ReactNode } from "react";

import Container from "@/src/components/UI/Container";

export default function layout({
  breadcrumbs,
  children,
  ringProducts,
}: {
  breadcrumbs: ReactNode;
  children: ReactNode;
  ringProducts: ReactNode;
}) {
  return (
    <Container className="pt-8">
      {breadcrumbs}
      {children}
      {ringProducts}
    </Container>
  );
}
