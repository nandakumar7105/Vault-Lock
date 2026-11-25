import { useState } from "react";
import { Sun, Battery, Clock, CreditCard } from "lucide-react";
import { PaymentDialog } from "./PaymentDialog";

const solarData = {
  currentPower: 3.8, // kW
  maxCapacity: 5.0, // kW
  todayGenerated: 18.5, // kWh
  batteryLevel: 72, // percent
  batteryCapacity: 10, // kWh
  energyStored: 7.2, // kWh
  avgConsumption: 1.5, // kWh per hour
  hoursRemaining: 4.8, // hours of energy left
  sunlightHoursLeft: 3,
};

export const SolarModule = () => {
  const powerPercent = (solarData.currentPower / solarData.maxCapacity) * 100;

  return (
    <div className="energy-card fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-energy-green/20">
          <Sun className="w-6 h-6 text-energy-green" />
        </div>
        <h3 className="text-lg font-display font-semibold">Solar Power Monitor</h3>
      </div>

      {/* Power output display */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(220 15% 20%)" strokeWidth="12" />
            <circle
              cx="60" cy="60" r="52" fill="none"
              stroke="hsl(152 70% 45%)"
              strokeWidth="12"
              strokeDasharray={`${powerPercent * 3.27} ${326.7}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-display font-bold text-primary">{solarData.currentPower}</span>
            <span className="text-xs text-muted-foreground">kW now</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Today Generated</p>
          <p className="text-lg font-bold text-primary">{solarData.todayGenerated} kWh</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Max Capacity</p>
          <p className="text-lg font-bold">{solarData.maxCapacity} kW</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30 flex items-center gap-2">
          <Battery className="w-4 h-4 text-energy-green" />
          <div>
            <p className="text-xs text-muted-foreground">Battery</p>
            <p className="text-lg font-bold">{solarData.batteryLevel}%</p>
          </div>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Energy Stored</p>
          <p className="text-lg font-bold">{solarData.energyStored} kWh</p>
        </div>
      </div>

      {/* Time remaining */}
      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
        <Clock className="w-6 h-6 text-primary" />
        <div>
          <p className="text-sm font-medium text-primary">Energy Duration</p>
          <p className="text-2xl font-display font-bold text-primary">
            {Math.floor(solarData.hoursRemaining)}h {Math.round((solarData.hoursRemaining % 1) * 60)}m
          </p>
          <p className="text-xs text-muted-foreground">
            at {solarData.avgConsumption} kWh/hr consumption • {solarData.sunlightHoursLeft}h sunlight left
          </p>
        </div>
      </div>

      <SolarBillSection />
    </div>
  );
};

const SolarBillSection = () => {
  const [showPayment, setShowPayment] = useState(false);
  const maintenanceCost = 1500;

  return (
    <>
      <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Solar Maintenance Bill</p>
            <p className="text-xl font-bold">₹{maintenanceCost.toLocaleString()}</p>
          </div>
          <button
            onClick={() => setShowPayment(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-energy-green text-background font-semibold text-sm hover:bg-energy-green/90 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Pay Bill
          </button>
        </div>
      </div>
      <PaymentDialog
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        energyType="Solar"
        amount={maintenanceCost}
        billDetails={[
          { label: "Panel Maintenance", value: "₹800" },
          { label: "Battery Service", value: "₹500" },
          { label: "Inverter Check", value: "₹200" },
          { label: "Billing Period", value: "Q1 2026" },
        ]}
      />
    </>
  );
};
