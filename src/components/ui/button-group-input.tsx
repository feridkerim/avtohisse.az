import { ReactNode } from "react";

interface ButtonGroupProps {
  children: ReactNode;
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return (
    <div className="inline-flex rounded-md grow" role="group">
      {children}
    </div>
  );
}
