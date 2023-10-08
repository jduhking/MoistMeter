import { newMqttClient } from "./mqtt-client.js";

const mqttClient = newMqttClient();
setInterval(() => {
  console.log("Publishing");
  const r1 = Math.floor(Math.random() * 100);
  const r2 = Math.floor(Math.random() * 100);
  const r = `${r1} ${r2}`;
  console.log(r);
  mqttClient.publish("moist", r.toString());
}, 1000);
