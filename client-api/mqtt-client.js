import mqtt from "mqtt";

function newMqttClient() {
  const options = {
    host: process.env.MQTT_BROKER_URL,
    port: 8883,
    protocol: "mqtts",
    username: process.env.MQTT_BROKER_UNAME,
    password: process.env.MQTT_BROKER_PWORD,
  };

  const mqttClient = mqtt.connect(options);
  const topicName = process.env.MQTT_TOPIC_NAME;
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
  return mqttClient;
}

export { newMqttClient };
