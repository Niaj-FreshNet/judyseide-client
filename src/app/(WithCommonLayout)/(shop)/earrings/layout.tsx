import { ReactNode } from "react";

import Container from "@/src/components/UI/Container";

export default function layout({
  breadcrumbs,
  children,
  earringProducts,
}: {
  breadcrumbs: ReactNode;
  children: ReactNode;
  earringProducts: ReactNode;
}) {
  return (
    <Container className="pt-8">
      {breadcrumbs}
      {children}
      {earringProducts}
    </Container>
  );
}
