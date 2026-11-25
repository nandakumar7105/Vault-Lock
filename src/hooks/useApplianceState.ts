import { useState, useEffect, useMemo } from "react";
import { Lightbulb, Fan, Tv, Power } from "lucide-react";

export interface Appliance {
  id: string;
  name: string;
  icon: typeof Lightbulb;
  hasToggle: boolean;
  room: string;
  roomLabel: string;
}

const allAppliances: Appliance[] = [
  { id: "living-room-light", name: "Light", icon: Lightbulb, hasToggle: false, room: "living-room", roomLabel: "Living Room" },
  { id: "living-room-fan", name: "Fan", icon: Fan, hasToggle: true, room: "living-room", roomLabel: "Living Room" },
  { id: "living-room-tv", name: "TV", icon: Tv, hasToggle: true, room: "living-room", roomLabel: "Living Room" },
  { id: "bedroom-light", name: "Light", icon: Lightbulb, hasToggle: true, room: "bedroom", roomLabel: "Bedroom" },
  { id: "bedroom-fan", name: "Fan", icon: Fan, hasToggle: true, room: "bedroom", roomLabel: "Bedroom" },
  { id: "bedroom-ac", name: "AC", icon: Fan, hasToggle: true, room: "bedroom", roomLabel: "Bedroom" },
  { id: "kitchen-light", name: "Light", icon: Lightbulb, hasToggle: true, room: "kitchen", roomLabel: "Kitchen" },
  { id: "kitchen-exhaust", name: "Exhaust Fan", icon: Fan, hasToggle: true, room: "kitchen", roomLabel: "Kitchen" },
  { id: "kitchen-fridge", name: "Refrigerator", icon: Power, hasToggle: false, room: "kitchen", roomLabel: "Kitchen" },
];

export interface ApplianceState {
  isOn: boolean;
  usage: number;
}

const randomUsage = () => parseFloat((Math.random() * 3 + 0.5).toFixed(1));

export function useApplianceState() {
  const [states, setStates] = useState<Record<string, ApplianceState>>({});

  useEffect(() => {
    const initial: Record<string, ApplianceState> = {};
    allAppliances.forEach((a) => {
      const isOn = !a.hasToggle || Math.random() > 0.5;
      initial[a.id] = { isOn, usage: isOn ? randomUsage() : 0 };
    });
    setStates(initial);
  }, []);

  const toggleAppliance = (id: string) => {
    setStates((prev) => {
      const current = prev[id];
      if (!current) return prev;
      const newIsOn = !current.isOn;
      return { ...prev, [id]: { isOn: newIsOn, usage: newIsOn ? randomUsage() : 0 } };
    });
  };

  const getAppliancesForRoom = (roomId: string) =>
    allAppliances.filter((a) => a.room === roomId);

  const activeDevices = useMemo(() => {
    return allAppliances
      .filter((a) => states[a.id]?.isOn)
      .map((a) => ({
        id: a.id,
        name: `${a.roomLabel} ${a.name}`,
        icon: a.icon,
        usage: `${states[a.id]?.usage ?? 0} kWh`,
        room: a.roomLabel,
      }));
  }, [states]);

  const totalUsage = useMemo(() => {
    return parseFloat(
      Object.values(states)
        .reduce((sum, s) => sum + s.usage, 0)
        .toFixed(1)
    );
  }, [states]);

  return { states, toggleAppliance, getAppliancesForRoom, activeDevices, totalUsage };
}
