import Footer from '@/src/components/UI/footer';
import { Navbar } from '@/src/components/UI/navbar';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Full-width sticky Navbar */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Main content area (optional max-width applied here) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full mt-10">
        <Footer />
      </footer>
    </div>
  );
}
