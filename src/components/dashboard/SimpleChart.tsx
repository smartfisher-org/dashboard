import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface SimpleChartProps {
  type: 'line' | 'bar' | 'area';
  data: Array<{ name: string; value: number; [key: string]: any }>;
  color?: string;
  height?: number;
  showGrid?: boolean;
  dataKey?: string;
}

const generateSampleData = (type: string) => {
  const months = ['May 2019', 'Feb 2020', 'Nov 2020', 'Aug 2021', 'May 2022', 'Feb 2023', 'Nov 2023'];
  
  switch (type) {
    case 'fish-count':
      return months.map((month, i) => ({ name: month, value: 80 + Math.sin(i * 0.8) * 15 + Math.random() * 10 }));
    case 'biomass':
      return months.map((month, i) => ({ name: month, value: 45 + Math.cos(i * 0.6) * 10 + Math.random() * 5 }));
    case 'speed-activity':
      return months.map((month, i) => ({ 
        name: month, 
        speed: 15 + Math.sin(i * 0.5) * 5 + Math.random() * 3,
        food: 20 + Math.cos(i * 0.7) * 6 + Math.random() * 4
      }));
    case 'weight-distribution':
      return Array.from({ length: 10 }, (_, i) => ({ name: `${i * 10}-${(i + 1) * 10}g`, value: Math.random() * 30 + 5 }));
    default:
      return months.map((month, i) => ({ name: month, value: 50 + Math.random() * 30 }));
  }
};

export function SimpleChart({ 
  type, 
  data, 
  color = "hsl(var(--primary))", 
  height = 200,
  showGrid = true,
  dataKey = "value"
}: SimpleChartProps) {
  const chartData = data.length > 0 ? data : generateSampleData('default');

  const commonProps = {
    width: "100%",
    height,
    data: chartData,
    margin: { top: 5, right: 5, left: 5, bottom: 5 }
  };

  if (type === 'line') {
    return (
      <ResponsiveContainer {...commonProps}>
        <LineChart>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={false}
            activeDot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'area') {
    return (
      <ResponsiveContainer {...commonProps}>
        <AreaChart>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            fill={`${color}20`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer {...commonProps}>
      <BarChart>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
        <XAxis dataKey="name" hide />
        <YAxis hide />
        <Bar dataKey={dataKey} fill={color} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}