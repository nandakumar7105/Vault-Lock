import { useState } from "react";
import { MainSelection } from "./MainSelection";
import { EnergyTypes } from "./EnergyTypes";
import { RoomSelection } from "./RoomSelection";
import { ApplianceCard } from "./ApplianceCard";
import { Breadcrumb } from "./Breadcrumb";
import { MonthlyChart } from "./MonthlyChart";
import { ActiveDevicesList } from "./ActiveDevicesList";
import { GasModule } from "./GasModule";
import { FuelModule } from "./FuelModule";
import { SolarModule } from "./SolarModule";
import { BusinessModule } from "./BusinessModule";
import { useApplianceState } from "@/hooks/useApplianceState";
import { Zap, TrendingUp, Activity, CreditCard } from "lucide-react";
import { PaymentDialog } from "./PaymentDialog";
import energyBg from "@/assets/energy-bg.jpeg";

type MainType = "home" | "business" | null;

export const EnergyDashboard = () => {
  const [mainType, setMainType] = useState<MainType>(null);
  const [energyType, setEnergyType] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showChart, setShowChart] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  const [showElecPayment, setShowElecPayment] = useState(false);

  const { states, toggleAppliance, getAppliancesForRoom, activeDevices, totalUsage } = useApplianceState();

  const handleReset = () => {
    setMainType(null);
    setEnergyType(null);
    setSelectedRoom(null);
    setShowChart(false);
    setShowDevices(false);
  };

  const getBreadcrumbItems = () => {
    const items: { label: string; onClick?: () => void }[] = [];
    if (mainType) {
      items.push({
        label: mainType === "home" ? "Home" : "Business",
        onClick: () => { setEnergyType(null); setSelectedRoom(null); },
      });
    }
    if (energyType) {
      items.push({
        label: energyType.charAt(0).toUpperCase() + energyType.slice(1),
        onClick: () => { setSelectedRoom(null); },
      });
    }
    if (selectedRoom) {
      items.push({
        label: selectedRoom.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      });
    }
    return items;
  };

  const getRoomLabel = (roomId: string) =>
    roomId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <div
      className="min-h-screen bg-background p-4 md:p-8 relative"
      style={{
        backgroundImage: !mainType ? `url(${energyBg})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {!mainType && <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />}
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full mb-6 fade-in">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Smart Energy Monitor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 slide-in">
            <span className="text-gradient">Smart Energy</span>{" "}
            <span className="text-foreground">Management</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto slide-in" style={{ animationDelay: "100ms" }}>
            Monitor, control, and optimize your energy consumption in real-time
          </p>
        </header>

        {mainType && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-4 fade-in">
              <div className="energy-card !p-4 cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => { setShowChart(false); setShowDevices(false); }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Usage</p>
                    <p className="text-lg font-bold text-primary">{totalUsage} kWh</p>
                  </div>
                </div>
              </div>
              <div className="energy-card !p-4 cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => { setShowChart(!showChart); setShowDevices(false); }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">This Month</p>
                    <p className="text-lg font-bold text-secondary">₹{(totalUsage * 8).toFixed(0)}</p>
                  </div>
                </div>
              </div>
              <div className="energy-card !p-4 cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => { setShowDevices(!showDevices); setShowChart(false); }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <Activity className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Active Devices</p>
                    <p className="text-lg font-bold text-accent">{activeDevices.length}</p>
                  </div>
                </div>
              </div>
            </div>

            {energyType === "electricity" && (
              <div className="mb-8 fade-in">
                <div className="energy-card !p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Electricity Bill - March 2026</p>
                      <p className="text-2xl font-bold text-primary">₹{(totalUsage * 8).toFixed(0)}</p>
                    </div>
                    <button
                      onClick={() => setShowElecPayment(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                    >
                      <CreditCard className="w-4 h-4" />
                      Pay Electricity Bill
                    </button>
                  </div>
                </div>
              </div>
            )}

            <PaymentDialog
              isOpen={showElecPayment}
              onClose={() => setShowElecPayment(false)}
              energyType="Electricity"
              amount={Math.round(totalUsage * 8)}
              billDetails={[
                { label: "Units Consumed", value: `${totalUsage} kWh` },
                { label: "Rate per Unit", value: "₹8.00" },
                { label: "Active Devices", value: `${activeDevices.length}` },
                { label: "Billing Period", value: "March 2026" },
                { label: "Due Date", value: "10 Apr 2026" },
              ]}
            />
          </>
        )}

        {showChart && <MonthlyChart onClose={() => setShowChart(false)} />}
        {showDevices && <ActiveDevicesList devices={activeDevices} onClose={() => setShowDevices(false)} />}

        <Breadcrumb items={getBreadcrumbItems()} onReset={handleReset} />

        <div className="space-y-8">
          {!mainType && (
            <section>
              <h2 className="text-xl font-display font-semibold mb-6 text-center text-muted-foreground">
                Select your energy environment
              </h2>
              <MainSelection onSelect={setMainType} selected={mainType} />
            </section>
          )}

          {mainType === "home" && !energyType && (
            <section className="fade-in">
              <h2 className="text-xl font-display font-semibold mb-6 text-muted-foreground">
                Choose energy type to monitor
              </h2>
              <EnergyTypes onSelect={setEnergyType} selected={energyType} />
            </section>
          )}

          {energyType === "electricity" && !selectedRoom && (
            <section className="fade-in">
              <h2 className="text-xl font-display font-semibold mb-6 text-muted-foreground">
                Select a room
              </h2>
              <RoomSelection onSelect={setSelectedRoom} selected={selectedRoom} />
            </section>
          )}

          {selectedRoom && (
            <section className="fade-in">
              <h2 className="text-xl font-display font-semibold mb-6 text-muted-foreground">
                {getRoomLabel(selectedRoom)} Appliances
              </h2>
              <ApplianceCard
                appliances={getAppliancesForRoom(selectedRoom)}
                states={states}
                onToggle={toggleAppliance}
              />
            </section>
          )}

          {energyType === "gas" && (
            <section className="fade-in"><GasModule /></section>
          )}
          {energyType === "fuel" && (
            <section className="fade-in"><FuelModule /></section>
          )}
          {energyType === "solar" && (
            <section className="fade-in"><SolarModule /></section>
          )}

          {mainType === "business" && (
            <section className="fade-in">
              <BusinessModule />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
