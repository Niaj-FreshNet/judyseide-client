import { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={clsx("max-w-screen-2xl mx-auto pt-16 px-8 lg:px-24 flex-grow", className)}>
      {children}
    </div>
  );
}
