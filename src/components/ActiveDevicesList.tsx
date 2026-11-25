import { X } from "lucide-react";

interface ActiveDevice {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  usage: string;
  room: string;
}

interface ActiveDevicesListProps {
  devices: ActiveDevice[];
  onClose: () => void;
}

export const ActiveDevicesList = ({ devices, onClose }: ActiveDevicesListProps) => {
  return (
    <div className="energy-card fade-in mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold">Active Devices ({devices.length})</h3>
        <button onClick={onClose} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      {devices.length === 0 ? (
        <p className="text-muted-foreground text-center py-6">No active devices</p>
      ) : (
        <div className="space-y-3">
          {devices.map((device, index) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border/30 scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/20">
                  <device.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{device.name}</p>
                  <p className="text-xs text-muted-foreground">{device.room}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-primary">{device.usage}</p>
                <p className="text-xs text-primary/70">Active</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
