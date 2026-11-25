import { Home, Building2 } from "lucide-react";
import { EnergyCard } from "./EnergyCard";

interface MainSelectionProps {
  onSelect: (type: "home" | "business") => void;
  selected: "home" | "business" | null;
}

export const MainSelection = ({ onSelect, selected }: MainSelectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <EnergyCard
        onClick={() => onSelect("home")}
        active={selected === "home"}
        delay={0}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div className={`p-6 rounded-2xl ${selected === "home" ? "bg-gradient-primary" : "bg-muted"} transition-all duration-300`}>
            <Home className={`w-12 h-12 ${selected === "home" ? "text-primary-foreground glow-icon" : "text-muted-foreground"}`} />
          </div>
          <h3 className="text-xl font-display font-semibold">Home</h3>
          <p className="text-sm text-muted-foreground text-center">
            Monitor and control your home energy
          </p>
        </div>
      </EnergyCard>

      <EnergyCard
        onClick={() => onSelect("business")}
        active={selected === "business"}
        delay={1}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          <div className={`p-6 rounded-2xl ${selected === "business" ? "bg-gradient-secondary" : "bg-muted"} transition-all duration-300`}>
            <Building2 className={`w-12 h-12 ${selected === "business" ? "text-secondary-foreground" : "text-muted-foreground"}`} />
          </div>
          <h3 className="text-xl font-display font-semibold">Business</h3>
          <p className="text-sm text-muted-foreground text-center">
            Enterprise energy management
          </p>
        </div>
      </EnergyCard>
    </div>
  );
};
