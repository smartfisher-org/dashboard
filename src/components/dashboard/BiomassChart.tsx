import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export type BiomassPoint = {
  date: string; // e.g., '2025-08-01'
  value: number; // assumed kilograms from data service
  label?: string;
};

type BiomassChartProps = {
  data: BiomassPoint[];
  height?: number; // pixels
};

function formatGrams(value: number) {
  return `${Math.round(value).toLocaleString()} g`;
}

export const BiomassChart: React.FC<BiomassChartProps> = ({ data, height = 192 }) => {
  // Convert kg -> g for presentation
  const dataInG = (data || []).map(d => ({ ...d, value_g: (d.value ?? 0) * 1000 }));

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dataInG} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="currentColor" />
          <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} tick={{ fontSize: 12 }} stroke="currentColor" />
          <Tooltip
            formatter={(value: any, name: any) => [formatGrams(Number(value)), 'Total biomass']}
            labelFormatter={(label) => label}
          />
          <Line type="monotone" dataKey="value_g" stroke="#22c55e" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BiomassChart;