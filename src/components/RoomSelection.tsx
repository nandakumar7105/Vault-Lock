import { Sofa, Bed, CookingPot } from "lucide-react";
import { EnergyCard } from "./EnergyCard";

const rooms = [
  { id: "living-room", name: "Living Room", icon: Sofa },
  { id: "bedroom", name: "Bedroom", icon: Bed },
  { id: "kitchen", name: "Kitchen", icon: CookingPot },
];

interface RoomSelectionProps {
  onSelect: (room: string) => void;
  selected: string | null;
}

export const RoomSelection = ({ onSelect, selected }: RoomSelectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {rooms.map((room, index) => (
        <EnergyCard
          key={room.id}
          onClick={() => onSelect(room.id)}
          active={selected === room.id}
          delay={index}
        >
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-xl ${selected === room.id ? "bg-gradient-primary" : "bg-muted"} transition-all duration-300`}>
              <room.icon className={`w-6 h-6 ${selected === room.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
            </div>
            <div>
              <h4 className="font-semibold">{room.name}</h4>
              <p className="text-sm text-muted-foreground">3 devices</p>
            </div>
          </div>
        </EnergyCard>
      ))}
    </div>
  );
};
