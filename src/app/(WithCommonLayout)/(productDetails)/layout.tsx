import { ReactNode } from 'react';

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 w-full max-w-full mx-auto">
        {children}
      </main>

    </div>
  );
}
