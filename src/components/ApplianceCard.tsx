import { Lightbulb, Fan, Tv, Power } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Appliance, ApplianceState } from "@/hooks/useApplianceState";

interface ApplianceCardProps {
  appliances: Appliance[];
  states: Record<string, ApplianceState>;
  onToggle: (id: string) => void;
}

export const ApplianceCard = ({ appliances, states, onToggle }: ApplianceCardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {appliances.map((appliance, index) => {
        const state = states[appliance.id] || { isOn: false, usage: 0 };
        const Icon = appliance.icon;

        return (
          <div
            key={appliance.id}
            className={cn(
              "energy-card scale-in",
              state.isOn && "energy-card-active"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-3 rounded-xl transition-all duration-300",
                    state.isOn ? "bg-gradient-primary" : "bg-muted"
                  )}>
                    <Icon className={cn(
                      "w-6 h-6 transition-all duration-300",
                      state.isOn ? "text-primary-foreground glow-icon" : "text-muted-foreground"
                    )} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{appliance.name}</h4>
                    <span className={cn(
                      "text-xs font-medium px-2 py-0.5 rounded-full",
                      state.isOn ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                    )}>
                      {state.isOn ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {appliance.hasToggle && (
                  <button
                    onClick={() => onToggle(appliance.id)}
                    className={cn(
                      "w-14 h-8 rounded-full relative transition-all duration-300 flex items-center",
                      state.isOn ? "bg-primary" : "bg-muted"
                    )}
                  >
                    <div className={cn(
                      "absolute w-6 h-6 bg-foreground rounded-full transition-all duration-300 shadow-lg",
                      state.isOn ? "right-1" : "left-1"
                    )} />
                  </button>
                )}
              </div>

              <div className="flex items-end justify-between pt-2 border-t border-border/50">
                <div>
                  <p className="text-xs text-muted-foreground">Energy Usage</p>
                  <p className={cn(
                    "text-2xl font-display font-bold transition-all duration-300",
                    state.isOn ? "text-primary glow-text" : "text-muted-foreground"
                  )}>
                    {state.usage} <span className="text-sm font-normal">kWh</span>
                  </p>
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs",
                  state.isOn ? "text-primary" : "text-muted-foreground"
                )}>
                  <Power className="w-3 h-3" />
                  <span>{state.isOn ? "In Use" : "Standby"}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
