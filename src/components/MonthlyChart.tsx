import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { X } from "lucide-react";

const data = [
  { month: "Jan", amount: 1800 },
  { month: "Feb", amount: 2100 },
  { month: "Mar", amount: 1950 },
  { month: "Apr", amount: 2300 },
  { month: "May", amount: 2000 },
  { month: "Jun", amount: 2450 },
  { month: "Jul", amount: 2600 },
  { month: "Aug", amount: 2200 },
  { month: "Sep", amount: 1900 },
  { month: "Oct", amount: 2350 },
  { month: "Nov", amount: 2500 },
  { month: "Dec", amount: 2450 },
];

interface MonthlyChartProps {
  onClose: () => void;
}

export const MonthlyChart = ({ onClose }: MonthlyChartProps) => {
  return (
    <div className="energy-card fade-in mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold">Monthly Energy Cost (₹)</h3>
        <button onClick={onClose} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 15% 20%)" />
            <XAxis dataKey="month" stroke="hsl(215 20% 65%)" fontSize={12} />
            <YAxis stroke="hsl(215 20% 65%)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220 18% 12%)",
                border: "1px solid hsl(220 15% 20%)",
                borderRadius: "0.75rem",
                color: "hsl(210 40% 98%)",
              }}
              formatter={(value: number) => [`₹${value}`, "Amount"]}
            />
            <Bar dataKey="amount" fill="hsl(152 70% 45%)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
