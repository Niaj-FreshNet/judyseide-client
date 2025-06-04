import { ReactNode } from "react";

import Footer from "@/src/components/layout/footer";
import { Navbar } from "@/src/components/layout/navbar";
import { Topbar } from "@/src/components/layout/topbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full">
        <Topbar />
      </header>

      {/* Full-width sticky Navbar */}
      <header className="w-full max-w-full">
        <Navbar />
      </header>

      {/* Main content area (optional max-width applied here) */}
      <main className="flex-1 w-full max-w-full mx-auto">{children}</main>

      {/* Footer */}
      <footer className="w-full mt-10">
        <Footer />
      </footer>
    </div>
  );
}
