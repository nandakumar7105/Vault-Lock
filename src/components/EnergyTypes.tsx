import { Zap, Flame, Fuel, Sun } from "lucide-react";
import { EnergyCard } from "./EnergyCard";

const energyTypes = [
  { id: "electricity", name: "Electricity", icon: Zap, color: "text-energy-blue" },
  { id: "gas", name: "Gas", icon: Flame, color: "text-energy-amber" },
  { id: "fuel", name: "Fuel", icon: Fuel, color: "text-destructive" },
  { id: "solar", name: "Solar", icon: Sun, color: "text-energy-green" },
];

interface EnergyTypesProps {
  onSelect: (type: string) => void;
  selected: string | null;
}

export const EnergyTypes = ({ onSelect, selected }: EnergyTypesProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {energyTypes.map((type, index) => (
        <EnergyCard
          key={type.id}
          onClick={() => onSelect(type.id)}
          active={selected === type.id}
          delay={index}
        >
          <div className="flex flex-col items-center gap-3 py-2">
            <div className={`p-4 rounded-xl bg-muted transition-all duration-300 ${selected === type.id ? "pulse-glow" : ""}`}>
              <type.icon className={`w-8 h-8 ${type.color} ${selected === type.id ? "glow-icon" : ""}`} />
            </div>
            <span className="font-medium">{type.name}</span>
          </div>
        </EnergyCard>
      ))}
    </div>
  );
};
