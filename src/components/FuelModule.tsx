import { useState } from "react";
import { Fuel, Car, CreditCard } from "lucide-react";
import { PaymentDialog } from "./PaymentDialog";

const fuelData = {
  tankCapacity: 45, // liters
  currentFuel: 28, // liters
  pricePerLiter: 105.5,
  mileage: 18, // km/liter
  totalCost: 2954,
  kmRemaining: 504, // 28 * 18
};

export const FuelModule = () => {
  const fuelPercent = (fuelData.currentFuel / fuelData.tankCapacity) * 100;

  return (
    <div className="energy-card fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-destructive/20">
          <Fuel className="w-6 h-6 text-destructive" />
        </div>
        <h3 className="text-lg font-display font-semibold">Fuel Monitor</h3>
      </div>

      {/* Fuel gauge bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Fuel Level</span>
          <span className="font-semibold">{fuelData.currentFuel}L / {fuelData.tankCapacity}L</span>
        </div>
        <div className="h-6 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-destructive to-energy-amber transition-all duration-1000"
            style={{ width: `${fuelPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Empty</span>
          <span>Full</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Current Fuel</p>
          <p className="text-lg font-bold">{fuelData.currentFuel} L</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Fuel Cost</p>
          <p className="text-lg font-bold">₹{fuelData.totalCost}</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Mileage</p>
          <p className="text-lg font-bold">{fuelData.mileage} km/L</p>
        </div>
        <div className="p-3 rounded-xl bg-muted/50 border border-border/30">
          <p className="text-xs text-muted-foreground">Price/Liter</p>
          <p className="text-lg font-bold">₹{fuelData.pricePerLiter}</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
        <Car className="w-6 h-6 text-primary" />
        <div>
          <p className="text-sm font-medium text-primary">Distance Remaining</p>
          <p className="text-2xl font-display font-bold text-primary">{fuelData.kmRemaining} km</p>
        </div>
      </div>

      <FuelBillSection />
    </div>
  );
};

const FuelBillSection = () => {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <>
      <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Fuel Bill</p>
            <p className="text-xl font-bold">₹{fuelData.totalCost.toLocaleString()}</p>
          </div>
          <button
            onClick={() => setShowPayment(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground font-semibold text-sm hover:bg-destructive/90 transition-colors"
          >
            <CreditCard className="w-4 h-4" />
            Pay Bill
          </button>
        </div>
      </div>
      <PaymentDialog
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        energyType="Fuel"
        amount={fuelData.totalCost}
        billDetails={[
          { label: "Fuel Purchased", value: `${fuelData.currentFuel} L` },
          { label: "Price per Liter", value: `₹${fuelData.pricePerLiter}` },
          { label: "Billing Period", value: "March 2026" },
          { label: "Due Date", value: "10 Apr 2026" },
        ]}
      />
    </>
  );
};
