import { useState } from "react";
import { Flame, CreditCard } from "lucide-react";
import { PaymentDialog } from "./PaymentDialog";

const gasData = {
  totalCapacity: 14.2, // kg
  used: 8.7, // kg
  remaining: 5.5, // kg
  dailyUsage: 0.4, // kg/day
  daysRemaining: 14,
  costPerKg: 75,
};

export const GasModule = () => {
  const usedPercent = (gasData.used / gasData.totalCapacity) * 100;
  const remainingPercent = 100 - usedPercent;

  return (
    <div className="energy-card fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-energy-amber/20">
          <Flame className="w-6 h-6 text-energy-amber" />
        </div>
        <h3 className="text-lg font-display font-semibold">Gas Usage Monitor</h3>
      </div>

      {/* Circular gauge */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(220 15% 20%)" strokeWidth="12" />
            <circle
              cx="60" cy="60" r="52" fill="none"
              stroke="hsl(45 90% 55%)"
              strokeWidth="12"
              strokeDasharray={`${remainingPercent * 3.27} ${326.7}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-display font-bold text-energy-amber">{gasData.remaining}</span>
            <span className="text-xs text-muted-foreground">kg left</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Total Capacity</p>
          <p className="text-lg font-bold">{gasData.totalCapacity} kg</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Used</p>
          <p className="text-lg font-bold text-destructive">{gasData.used} kg</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Daily Usage</p>
          <p className="text-lg font-bold">{gasData.dailyUsage} kg/day</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Days Remaining</p>
          <p className="text-lg font-bold text-energy-amber">{gasData.daysRemaining} days</p>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-xl bg-energy-amber/10 border border-energy-amber/20">
        <p className="text-sm text-energy-amber font-medium">
          💡 Estimated refill cost: ₹{(gasData.totalCapacity * gasData.costPerKg).toLocaleString()}
        </p>
      </div>

      <BillSection />
    </div>
  );
};

const BillSection = () => {
  const [showPayment, setShowPayment] = useState(false);
  const billAmount = Math.round(gasData.used * gasData.costPerKg);

  return (
    <>
      <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Monthly Gas Bill</p>
            <p className="text-xl font-bold">₹{billAmount.toLocaleString()}</p>
          </div>
          <button
            onClick={() => setShowPayment(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-energy-amber text-background font-semibold text-sm hover:bg-energy-amber/90 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Pay Bill
          </button>
        </div>
      </div>
      <PaymentDialog
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        energyType="Gas"
        amount={billAmount}
        billDetails={[
          { label: "Gas Used", value: `${gasData.used} kg` },
          { label: "Rate per kg", value: `₹${gasData.costPerKg}` },
          { label: "Billing Period", value: "March 2026" },
          { label: "Due Date", value: "15 Apr 2026" },
        ]}
      />
    </>
  );
};
