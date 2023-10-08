// Import required modules using ES modules
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { newMqttClient } from "./mqtt-client.js";

// Create an Express application
const app = express();
const server = http.createServer(app);
app.use(cors());

// Create a Socket.io instance and attach it to the server
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const mqttClient = newMqttClient();
// Set up a Socket.io connection event handler
io.on("connection", (socket) => {
  console.log("A user connected");

  mqttClient.removeAllListeners();
  mqttClient.on("message", function (topic, message) {
    console.log(message.toString());
    // message is Buffer
    //Normalize data and convert to int
    const [sensor1, sensor2] = message
      .toString()
      .split(" ")
      .map((x) => {
        if (x < 1) return Math.floor(Math.random() * 4);
        else return parseInt(x);
      });

    console.log(sensor1, sensor2);
    io.emit(
      "moist-to-client",
      JSON.stringify({ sensor1, sensor2 })
    );
  });

  // Handle disconnect event
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
