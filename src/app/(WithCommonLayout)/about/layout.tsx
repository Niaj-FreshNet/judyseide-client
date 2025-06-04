import Container from "@/src/components/UI/Container";
import { ReactNode } from "react";

export default function layout({
    children,
    breadcrumbs
}: {
    children: ReactNode,
    breadcrumbs: ReactNode
}) {
    return (
        <Container className="pt-8">
            {breadcrumbs}
            {children}
        </Container>
    )
}
