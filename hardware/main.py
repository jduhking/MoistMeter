import network
import socket
from time import sleep
from picozero import pico_temp_sensor, pico_led
from config import MQTT_BROKER_URL, MQTT_BROKER_UNAME, MQTT_BROKER_PWORD
from config import ssid, password
import ussl
"""
A simple example that connects to the Adafruit IO MQTT server
and publishes values that represent a sine wave
"""

import network
import time
from math import sin
from umqtt import MQTTClient

# Fill in your WiFi network name (ssid) and password here:
wifi_ssid = ssid
wifi_password = password

# Connect to WiFi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(wifi_ssid, wifi_password)
while wlan.isconnected() == False:
    #print('Waiting for connection...')
    time.sleep(1)
print("Connected to WiFi")

# Fill in your Adafruit IO Authentication and Feed MQTT Topic details
mqtt_host = MQTT_BROKER_URL
mqtt_username = MQTT_BROKER_UNAME
mqtt_password = MQTT_BROKER_PWORD
mqtt_publish_topic = "moistsensor"  # The MQTT topic for your Adafruit IO Feed

# Enter a random ID for this MQTT Client
# It needs to be globally unique across all of Adafruit IO.
mqtt_client_id = "hardware_moist"

# Initialize our MQTTClient and connect to the MQTT server

mqtt_client = MQTTClient(
        client_id=mqtt_client_id,
        server=mqtt_host,
        user=mqtt_username,
        password=mqtt_password,
        keepalive=3600,
        ssl=True,
        ssl_params={'server_hostname': mqtt_host}
        )

mqtt_client.connect()

# Publish a data point to the Adafruit IO MQTT server every 3 seconds
# Note: Adafruit IO has rate limits in place, every 3 seconds is frequent
#  enough to see data in realtime without exceeding the rate limit.

counter = 0
try:
    while True:
        # Generate some dummy data that changes every loop
        sine = sin(counter)
        counter += .8
        
        # Publish the data to the topic!
        print(f'Publish {sine:.2f}')
        mqtt_client.publish(mqtt_publish_topic, str(sine))
        
        # Delay a bit to avoid hitting the rate limit
        time.sleep(3)
except Exception as e:
    print(f'Failed to publish message: {e}')
finally:
    mqtt_client.disconnect()
