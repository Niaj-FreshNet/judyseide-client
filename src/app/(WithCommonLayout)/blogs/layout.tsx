
import { ReactNode } from "react";

import Container from "@/src/components/UI/Container";

export default function layout({
  children,
  
}: {
  children: ReactNode;
 
}) {
  return (
    <Container className="pt-8">
     
      {children}
    </Container>
  );
}