import network
import socket
from time import sleep
from picozero import pico_temp_sensor, pico_led
from config import MQTT_BROKER_URL, MQTT_BROKER_UNAME, MQTT_BROKER_PWORD
from config import ssid, password
from machine import ADC, Pin
import utime
import ussl
import network
from umqtt import MQTTClient

#config for the wood
wood = ADC(Pin(26))
min_moisture=0
max_moisture=65535

# Fill in your Authentication and Feed MQTT Topic details
mqtt_host = MQTT_BROKER_URL
mqtt_username = MQTT_BROKER_UNAME
mqtt_password = MQTT_BROKER_PWORD
mqtt_publish_topic = "moistsensor"  # The MQTT topic for your Adafruit IO Feed

# Enter a random ID for this MQTT Client
# It needs to be globally unique across all of Adafruit IO.
mqtt_client_id = "hardware_moist"

def connect_to_wifi():
    # Fill in your WiFi network name (ssid) and password here:
    wifi_ssid = ssid
    wifi_password = password

    # Connect to WiFi
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(wifi_ssid, wifi_password)
    while wlan.isconnected() == False:
        #print('Waiting for connection...')
        sleep(1)
    print("Connected to WiFi")

def set_up_mqtt():


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
    return mqtt_client

def get_moisture_data():
    moisture=(max_moisture-wood.read_u16())*100/(max_moisture-min_moisture)
    return moisture


try:
    connect_to_wifi()
    mqtt_client = set_up_mqtt()
    
    while True:
        # Generate some dummy data that changes every loop
        moisture = get_moisture_data()
        
        print(f'Publish {moisture:.2f}')
        mqtt_client.publish(mqtt_publish_topic, str(moisture))
        
        # Delay a bit to avoid hitting the rate limit
        sleep(2)
except Exception as e:
    print(f'Failed to publish message: {e}')
finally:
    mqtt_client.disconnect()
