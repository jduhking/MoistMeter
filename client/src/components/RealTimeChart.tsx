import {
  AreaChart,
  Area,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

type ChartData = {
  xAxis: number;
  yAxisData: number;
};

interface ChartProps {
  data: ChartData[];
}

export default function Chart({ data }: ChartProps) {
  const [barData, setBarData] = useState(data);

  useEffect(() => {
    setBarData(data);
  }, [data]);

  return (
    <>
      <ResponsiveContainer
        width="100%"
        height="100%"
        minHeight="300px"
        minWidth="500px"
      >
        <AreaChart
          width={100}
          height={100}
          data={barData}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis dataKey="index" stroke="#428FFC" />
          <YAxis stroke="#428FFC" domain={[0, 100]} />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="yAxisData"
            fill="#428FFC"
            stroke="#428FFC"
            label=""
          />

          <ReferenceLine
            y={25}
            label=""
            stroke="#428FFC"
            strokeDasharray="3 3"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
