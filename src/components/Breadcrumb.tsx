import { ChevronRight, Home, Zap, Sofa, RotateCcw } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onReset: () => void;
}

export const Breadcrumb = ({ items, onReset }: BreadcrumbProps) => {
  if (items.length === 0) return null;

  return (
    <div className="flex items-center justify-between mb-6 fade-in">
      <div className="flex items-center gap-2 text-sm flex-wrap">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
            <button
              onClick={item.onClick}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                index === items.length - 1
                  ? "bg-primary/20 text-primary font-medium"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {index === 0 && <Home className="w-3 h-3" />}
              {item.label}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 rounded-lg transition-all duration-200"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
};
