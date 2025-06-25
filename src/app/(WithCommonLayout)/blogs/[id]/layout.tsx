import { ReactNode } from "react";

import Container from "@/src/components/UI/Container";

export default function layout({
  breadcrumbs,
 blogDetails,
  children,
}: {
  breadcrumbs: ReactNode;
  blogDetails: ReactNode;
  children: ReactNode;
}) {
  return (
    <Container className="pt-8">
      {breadcrumbs}
      {blogDetails}
      {children}
    </Container>
  );
}
