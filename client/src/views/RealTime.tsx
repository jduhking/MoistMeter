import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { io } from "socket.io-client";
import RealTimeChart from "../components/RealTimeChart";

type ChartData = {
  xAxis: number;
  yAxisData: number;
};

const socket = io(import.meta.env.VITE_API_URL as string);
console.log(import.meta.env.VITE_API_URL);
const initialData: ChartData[] = [
  {
    xAxis: 1,
    yAxisData: 0,
  },
];

const fakeData: ChartData[] = [
  {
    xAxis: 1,
    yAxisData: 0,
  },
  {
    xAxis: 2,
    yAxisData: 1,
  },
  {
    xAxis: 3,
    yAxisData: 2,
  },
  {
    xAxis: 4,
    yAxisData: 3,
  },
  {
    xAxis: 5,
    yAxisData: 4,
  },
  {
    xAxis: 6,
    yAxisData: 5,
  },
  {
    xAxis: 7,
    yAxisData: 6,
  },
  {
    xAxis: 8,
    yAxisData: 7,
  },
  {
    xAxis: 9,
    yAxisData: 8,
  },
  {
    xAxis: 10,
    yAxisData: 9,
  },
  {
    xAxis: 11,
    yAxisData: 10,
  },
];
type Data = {
  sensor1: number;
  sensor2: number;
};
export default function RealTime() {
  const [chartData1, setChartData1] =
    useState<ChartData[]>(initialData);
  const [chartData2, setChartData2] =
    useState<ChartData[]>(initialData);

  useEffect(() => {
    if (!socket.hasListeners("moist-to-client")) {
      socket.on("moist-to-client", (data: string) => {
        data = JSON.parse(data as string);
        console.log("data", data);
        setChartData1((prevChartData) => {
          const updatedChartData = [...prevChartData];
          if (updatedChartData.length >= 10) {
            updatedChartData.shift();
          }
          updatedChartData.push({
            xAxis: 0,
            yAxisData: data.sensor1 as number,
          });
          updatedChartData.forEach((item, index) => {
            item.xAxis = index;
          });
          return updatedChartData;
        });
        setChartData2((prevChartData) => {
          const updatedChartData = [...prevChartData];
          if (updatedChartData.length >= 10) {
            updatedChartData.shift();
          }
          updatedChartData.push({
            xAxis: 0,
            yAxisData: data.sensor2 as number,
          });
          updatedChartData.forEach((item, index) => {
            item.xAxis = index;
          });
          return updatedChartData;
        });
      });
    }

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("moist-to-client");
    };
  }, []); // Empty dependency array, so this effect runs only once
  useEffect(() => {
    console.log("chartData1", chartData1);
    console.log("chartData2", chartData2);
  }, [chartData1]);

  return (
    <div>
      <Navbar />
      <RealTimeChart data={chartData1} />
      <RealTimeChart data={chartData2} />
    </div>
  );
}
