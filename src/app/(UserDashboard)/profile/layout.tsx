import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">

            {/* Main content area (optional max-width applied here) */}
            <main className="flex-1 w-full max-w-full mx-auto">
                {children}
            </main>

        </div>
    );
}
