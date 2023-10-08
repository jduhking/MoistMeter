/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "../components/Navbar";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";

const socket = io(import.meta.env.VITE_API_URL as string, {
  rejectUnauthorized: false,
});
const circleStartSize = 25;
export default function FloorPlan() {
  const [sensor1, setSensor1] = useState(0);
  const [sensor2, setSensor2] = useState(0);
  const sensor1CircleRef = useRef<HTMLDivElement>(null);
  const sensor2CircleRef = useRef<HTMLDivElement>(null);

  function updateCircles(
    sensor1Val: number,
    sensor2Val: number
  ) {
    let circle1Color = "green";
    let circle2Color = "green";
    const scaleFactor = 0.4; // Adjust the scaling factor as needed

    if (sensor1Val > 10) {
      circle1Color = "red";
    }
    if (sensor2Val > 10) {
      circle2Color = "red";
    }

    const size1 = circleStartSize + sensor1Val * scaleFactor;
    const size2 = circleStartSize + sensor2Val * scaleFactor;

    sensor1CircleRef.current!.style.transform = `scale(${
      size1 / circleStartSize
    })`;
    sensor2CircleRef.current!.style.transform = `scale(${
      size2 / circleStartSize
    })`;

    sensor1CircleRef.current!.style.backgroundColor =
      circle1Color;
    sensor2CircleRef.current!.style.backgroundColor =
      circle2Color;
  }

  useEffect(() => {
    if (!socket.hasListeners("moist-to-client")) {
      socket.on("moist-to-client", (unparsedData: string) => {
        const data = JSON.parse(unparsedData);
        console.log("data", data);
        setSensor1(data.sensor1);
        setSensor2(data.sensor2);
        updateCircles(data.sensor1, data.sensor2);
      });
    }
  });
  useEffect(() => {
    updateCircles(sensor1, sensor2);
  }, [sensor1]);

  return (
    <div>
      <Navbar />
      <img className="mt-4" src="floor-plan.png"></img>
      <div className="sensor1-circle" ref={sensor1CircleRef}>
        <p>{sensor1}%</p>
      </div>
      <div className="sensor2-circle" ref={sensor2CircleRef}>
        <p>{sensor2}%</p>
      </div>
    </div>
  );
}
