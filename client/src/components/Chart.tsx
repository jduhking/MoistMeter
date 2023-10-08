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
    xAxisMonth: "January",
    yAxisData: 1,
  },
  {
    orderMonth: 2,
    xAxisMonth: "February",
    yAxisData: 1,
  },
  {
    orderMonth: 3,
    xAxisMonth: "March",
    yAxisData: 2,
  },
  {
    orderMonth: 4,
    xAxisMonth: "April",
    yAxisData: 3,
  },
  {
    orderMonth: 5,
    xAxisMonth: "May",
    yAxisData: 3,
  },
  {
    orderMonth: 6,
    xAxisMonth: "June",
    yAxisData: 1,
  },
  {
    orderMonth: 7,
    xAxisMonth: "July",
    yAxisData: 1,
  },
  {
    orderMonth: 8,
    xAxisMonth: "August",
    yAxisData: 1,
  },
  {
    orderMonth: 9,
    xAxisMonth: "September",
    yAxisData: 2,
  },
  {
    orderMonth: 10,
    xAxisMonth: "October",
    yAxisData: 2,
  },
  {
    orderMonth: 11,
    xAxisMonth: "November",
    yAxisData: 1,
  },
  {
    orderMonth: 12,
    xAxisMonth: "December",
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
          <XAxis dataKey="xAxisMonth" stroke="green" />
          <YAxis stroke="green" domain={[0, 10]} />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="yAxisData"
            fill="green"
            stroke="green"
            label=""
          />

          <ReferenceLine
            y={getAverageYAxis()}
            label=""
            stroke="green"
            strokeDasharray="3 3"
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
