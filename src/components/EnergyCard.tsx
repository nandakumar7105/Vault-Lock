import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EnergyCardProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  delay?: number;
}

export const EnergyCard = ({ children, onClick, active, className, delay = 0 }: EnergyCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "energy-card cursor-pointer slide-in",
        active && "energy-card-active",
        className
      )}
      style={{ animationDelay: `${delay * 100}ms` }}
    >
      {children}
    </div>
  );
};
