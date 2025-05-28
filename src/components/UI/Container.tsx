import { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={clsx("container max-w-full mx-auto pt-16 lg:px-6 flex-grow", className)}>
      {children}
    </div>
  );
}
