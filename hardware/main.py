import network
import socket
from time import sleep
from picozero import pico_temp_sensor, pico_led
from config import MQTT_BROKER_URL, MQTT_BROKER_UNAME, MQTT_BROKER_PWORD
from config import ssid, password

import machine


def connect():
    #Connect to WLAN
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)
    while wlan.isconnected() == False:
        print('Waiting for connection...')
        sleep(1)
    ip = wlan.ifconfig()[0]
    print(f'Connected on {ip}')




try:
    connect()
except KeyboardInterrupt:
    machine.reset()
    
