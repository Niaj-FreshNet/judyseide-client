import Container from "@/src/components/UI/Container";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <Container>
      {children}
    </Container>
  );
}
