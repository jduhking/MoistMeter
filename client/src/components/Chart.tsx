import {
  AreaChart,
  Area,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const barData = [
  {
    orderMonth: 1,
    xAxisMonth: "November",
    yAxisData: 1,
  },
  {
    orderMonth: 2,
    xAxisMonth: "December",
    yAxisData: 1,
  },
  {
    orderMonth: 3,
    xAxisMonth: "January",
    yAxisData: 2,
  },
  {
    orderMonth: 4,
    xAxisMonth: "February",
    yAxisData: 3,
  },
  {
    orderMonth: 5,
    xAxisMonth: "March",
    yAxisData: 3,
  },
  {
    orderMonth: 6,
    xAxisMonth: "April",
    yAxisData: 1,
  },
  {
    orderMonth: 7,
    xAxisMonth: "May",
    yAxisData: 1,
  },
  {
    orderMonth: 8,
    xAxisMonth: "June",
    yAxisData: 1,
  },
  {
    orderMonth: 9,
    xAxisMonth: "July",
    yAxisData: 2,
  },
  {
    orderMonth: 10,
    xAxisMonth: "August",
    yAxisData: 2,
  },
  {
    orderMonth: 11,
    xAxisMonth: "September",
    yAxisData: 1,
  },
  {
    orderMonth: 12,
    xAxisMonth: "October",
    yAxisData: 1,
  },
];

// if different from the others by enough then swap the text
function getAverageYAxis() {
  let sum = 0;

  // for all months
  for (let i = 0; i < 12; i++) {
    sum += barData[i].yAxisData;
  }

  const avg = sum / 12;

  return avg;
}

export default function Chart() {
  return (
    <>
      {console.log()}
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
          <XAxis dataKey="xAxisMonth" stroke="#428FFC" />
          <YAxis stroke="#428FFC" domain={[0, 10]} />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="yAxisData"
            fill="#428FFC"
            stroke="#428FFC"
            label=""
          />

          <ReferenceLine
            y={getAverageYAxis()}
            label=""
            stroke="#428FFC"
            strokeDasharray="3 3"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
