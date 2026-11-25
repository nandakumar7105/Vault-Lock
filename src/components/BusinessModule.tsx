import { useState, useMemo } from "react";
import { Building2, DoorOpen, Lightbulb, Fan, Tv, Power, ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeviceState {
  isOn: boolean;
}

interface RoomDef {
  id: string;
  name: string;
  type: "classroom" | "office" | "lab";
}

interface BlockDef {
  id: string;
  name: string;
  rooms: RoomDef[];
}

const generateRooms = (block: string, prefix: string): RoomDef[] => {
  if (block === "A") {
    const classrooms: RoomDef[] = Array.from({ length: 20 }, (_, i) => ({
      id: `${prefix}${1101 + i}`,
      name: `${prefix}${1101 + i}`,
      type: "classroom" as const,
    }));
    return [...classrooms, { id: `${prefix}-office`, name: `${prefix} Office Room`, type: "office" as const }];
  }
  if (block === "B") {
    const classrooms: RoomDef[] = Array.from({ length: 10 }, (_, i) => ({
      id: `${prefix}${1101 + i}`,
      name: `${prefix}${1101 + i}`,
      type: "classroom" as const,
    }));
    return [
      ...classrooms,
      { id: `${prefix}-physics-lab-1`, name: `${prefix} Physics Lab 1`, type: "lab" as const },
      { id: `${prefix}-physics-lab-2`, name: `${prefix} Physics Lab 2`, type: "lab" as const },
      { id: `${prefix}-chemistry-lab`, name: `${prefix} Chemistry Lab`, type: "lab" as const },
      { id: `${prefix}-it-lab`, name: `${prefix} IT Lab`, type: "lab" as const },
    ];
  }
  if (block === "C") {
    const classrooms: RoomDef[] = Array.from({ length: 15 }, (_, i) => ({
      id: `${prefix}${1101 + i}`,
      name: `${prefix}${1101 + i}`,
      type: "classroom" as const,
    }));
    return [...classrooms, { id: `${prefix}-office`, name: `${prefix} Office Room`, type: "office" as const }];
  }
  if (block === "D") {
    const classrooms: RoomDef[] = Array.from({ length: 12 }, (_, i) => ({
      id: `${prefix}${1101 + i}`,
      name: `${prefix}${1101 + i}`,
      type: "classroom" as const,
    }));
    return [
      ...classrooms,
      { id: `${prefix}-ece-lab`, name: `${prefix} ECE Lab`, type: "lab" as const },
      { id: `${prefix}-eee-lab`, name: `${prefix} EEE Lab`, type: "lab" as const },
    ];
  }
  // E Block
  const classrooms: RoomDef[] = Array.from({ length: 10 }, (_, i) => ({
    id: `${prefix}${1101 + i}`,
    name: `${prefix}${1101 + i}`,
    type: "classroom" as const,
  }));
  return [
    ...classrooms,
    { id: `${prefix}-mech-lab`, name: `${prefix} Mechanical Lab`, type: "lab" as const },
    { id: `${prefix}-office`, name: `${prefix} Office Room`, type: "office" as const },
  ];
};

const blocks: BlockDef[] = [
  { id: "A", name: "A Block", rooms: generateRooms("A", "A") },
  { id: "B", name: "B Block", rooms: generateRooms("B", "B") },
  { id: "C", name: "C Block", rooms: generateRooms("C", "C") },
  { id: "D", name: "D Block", rooms: generateRooms("D", "D") },
  { id: "E", name: "E Block", rooms: generateRooms("E", "E") },
];

const DEVICES_PER_ROOM = [
  { suffix: "fan-1", name: "Fan 1", icon: Fan },
  { suffix: "fan-2", name: "Fan 2", icon: Fan },
  { suffix: "fan-3", name: "Fan 3", icon: Fan },
  { suffix: "fan-4", name: "Fan 4", icon: Fan },
  { suffix: "fan-5", name: "Fan 5", icon: Fan },
  { suffix: "light-1", name: "Light 1", icon: Lightbulb },
  { suffix: "light-2", name: "Light 2", icon: Lightbulb },
  { suffix: "light-3", name: "Light 3", icon: Lightbulb },
  { suffix: "light-4", name: "Light 4", icon: Lightbulb },
  { suffix: "smart-tv", name: "Smart TV", icon: Tv },
];

export const BusinessModule = () => {
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [deviceStates, setDeviceStates] = useState<Record<string, DeviceState>>({});

  const getDeviceState = (deviceId: string): boolean => {
    return deviceStates[deviceId]?.isOn ?? false;
  };

  const toggleDevice = (deviceId: string) => {
    setDeviceStates((prev) => ({
      ...prev,
      [deviceId]: { isOn: !(prev[deviceId]?.isOn ?? false) },
    }));
  };

  const toggleAllInRoom = (roomId: string, turnOn: boolean) => {
    setDeviceStates((prev) => {
      const next = { ...prev };
      DEVICES_PER_ROOM.forEach((d) => {
        next[`${roomId}-${d.suffix}`] = { isOn: turnOn };
      });
      return next;
    });
  };

  const currentBlock = blocks.find((b) => b.id === selectedBlock);
  const currentRoom = currentBlock?.rooms.find((r) => r.id === selectedRoom);

  const activeCount = useMemo(() => {
    let count = 0;
    Object.values(deviceStates).forEach((s) => { if (s.isOn) count++; });
    return count;
  }, [deviceStates]);

  const totalDevices = useMemo(() => {
    return blocks.reduce((sum, b) => sum + b.rooms.length * DEVICES_PER_ROOM.length, 0);
  }, []);

  // College selection
  if (!selectedBlock && !selectedRoom) {
    return (
      <div className="space-y-6 fade-in">
        <div className="energy-card text-center py-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-4 bg-primary/20 rounded-2xl">
              <Building2 className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-display font-bold mb-2">Sri Sairam Engineering College</h3>
          <p className="text-muted-foreground mb-2">Smart Campus Energy Management</p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mt-4">
            <span><strong className="text-primary">{blocks.length}</strong> Blocks</span>
            <span><strong className="text-primary">{blocks.reduce((s, b) => s + b.rooms.length, 0)}</strong> Rooms</span>
            <span><strong className="text-primary">{totalDevices}</strong> Devices</span>
            <span><strong className="text-accent">{activeCount}</strong> Active</span>
          </div>
        </div>

        <div
          className="energy-card cursor-pointer hover:scale-[1.02] transition-transform"
          onClick={() => setSelectedBlock("show-blocks")}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-gradient-primary">
                <Building2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h4 className="text-lg font-semibold">Sri Sairam Engineering College</h4>
                <p className="text-sm text-muted-foreground">{blocks.length} Blocks • Click to manage</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    );
  }

  // Block selection
  if (selectedBlock === "show-blocks" && !selectedRoom) {
    return (
      <div className="space-y-6 fade-in">
        <button
          onClick={() => setSelectedBlock(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to College
        </button>
        <h3 className="text-xl font-display font-semibold text-muted-foreground">Select a Block</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blocks.map((block, index) => {
            const blockActive = block.rooms.reduce((count, room) => {
              return count + DEVICES_PER_ROOM.filter((d) => getDeviceState(`${room.id}-${d.suffix}`)).length;
            }, 0);
            return (
              <div
                key={block.id}
                className="energy-card cursor-pointer hover:scale-[1.02] transition-transform scale-in"
                style={{ animationDelay: `${index * 80}ms` }}
                onClick={() => setSelectedBlock(block.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-xl bg-primary/20">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{block.name}</h4>
                    <p className="text-sm text-muted-foreground">{block.rooms.length} Rooms</p>
                    {blockActive > 0 && (
                      <p className="text-xs text-primary mt-1">{blockActive} devices active</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Room selection within a block
  if (currentBlock && !selectedRoom) {
    return (
      <div className="space-y-6 fade-in">
        <button
          onClick={() => setSelectedBlock("show-blocks")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blocks
        </button>
        <h3 className="text-xl font-display font-semibold text-muted-foreground">
          {currentBlock.name} — Rooms
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {currentBlock.rooms.map((room, index) => {
            const roomActive = DEVICES_PER_ROOM.filter((d) => getDeviceState(`${room.id}-${d.suffix}`)).length;
            return (
              <div
                key={room.id}
                className={cn(
                  "energy-card cursor-pointer hover:scale-[1.02] transition-transform scale-in",
                  roomActive > 0 && "energy-card-active"
                )}
                style={{ animationDelay: `${(index % 12) * 40}ms` }}
                onClick={() => setSelectedRoom(room.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    roomActive > 0 ? "bg-primary/20" : "bg-muted"
                  )}>
                    <DoorOpen className={cn(
                      "w-5 h-5",
                      roomActive > 0 ? "text-primary" : "text-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">{room.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {room.type === "lab" ? "Lab" : room.type === "office" ? "Office" : "Classroom"}
                    </p>
                    {roomActive > 0 && (
                      <p className="text-xs text-primary">{roomActive}/{DEVICES_PER_ROOM.length} on</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Device control within a room
  if (currentBlock && currentRoom) {
    const roomDevices = DEVICES_PER_ROOM.map((d) => ({
      ...d,
      id: `${currentRoom.id}-${d.suffix}`,
      isOn: getDeviceState(`${currentRoom.id}-${d.suffix}`),
    }));
    const activeInRoom = roomDevices.filter((d) => d.isOn).length;

    return (
      <div className="space-y-6 fade-in">
        <button
          onClick={() => setSelectedRoom(null)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {currentBlock.name}
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-display font-semibold">{currentRoom.name}</h3>
            <p className="text-sm text-muted-foreground">
              {activeInRoom}/{roomDevices.length} devices active
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => toggleAllInRoom(currentRoom.id, true)}
              className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              All On
            </button>
            <button
              onClick={() => toggleAllInRoom(currentRoom.id, false)}
              className="px-4 py-2 text-sm rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              All Off
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roomDevices.map((device, index) => {
            const Icon = device.icon;
            return (
              <div
                key={device.id}
                className={cn(
                  "energy-card scale-in",
                  device.isOn && "energy-card-active"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-3 rounded-xl transition-all duration-300",
                      device.isOn ? "bg-gradient-primary" : "bg-muted"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5 transition-all duration-300",
                        device.isOn ? "text-primary-foreground glow-icon" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{device.name}</h4>
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        device.isOn ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                      )}>
                        {device.isOn ? "On" : "Off"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleDevice(device.id)}
                    className={cn(
                      "w-14 h-8 rounded-full relative transition-all duration-300 flex items-center",
                      device.isOn ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <div className={cn(
                      "absolute w-6 h-6 bg-foreground rounded-full transition-all duration-300 shadow-lg",
                      device.isOn ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};
