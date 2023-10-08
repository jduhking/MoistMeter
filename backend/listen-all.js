const mqtt = require("mqtt");
require('dotenv').config()
const fs = require("fs");
const { parse } = require("path");
const {saveDataToFile } = require('./mongodb')

var options = {
  host: process.env.MQTT_BROKER_URL,
  port: 8883,
  protocol: "mqtts",
  username: process.env.MQTT_BROKER_UNAME,
  password: process.env.MQTT_BROKER_PWORD,
};


const mqttClient = mqtt.connect(options);
const topicName = "moistsensor";
mqttClient.on("error", function (err) {
  console.log("error");
  console.log(err);
});
mqttClient.on("connect", function () {
  mqttClient.subscribe(topicName, function (err) {
    if (err) return console.log(err);
    console.log("Subscribed to topic: " + topicName);
  });
});




mqttClient.on("message", function (topic, message) {
  const d = new Date();
  console.log("Message recieved! " + d.getSeconds().toString());
  data = message.toString().split(' ');
  saveDataToFile(data[0], true)
  saveDataToFile(data[1], false)
  console.log(data[0], data[1]);

});
process.on("exit", () => {
  client.end();
});

