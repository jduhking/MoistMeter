from flask import Flask, send_file
import matplotlib.pyplot as plt
import paho.mqtt.client as paho
from paho import mqtt
import dotenv
import os

dotenv.load_dotenv()

app = Flask(__name__)

sensor1_loc = (855, 367)
sensor2_loc = (295, 360)

# Draw a grid on the floor plan picture with no axis to see the pixel coordinates
def create_floor_plan(data1, data2):
    #Get the parent directory of the current file
    parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    #Get the path to the floor plan picture
    path = os.path.join(parent_dir, 'floor_plan.png')
    img = plt.imread(path)

    #Plot the floor plan picture
    fig, ax = plt.subplots()
    ax.imshow(img)
    #Draw a circle with radius of 100 pixels around the sensor location with a bit of transparency
    c1 = 'r'
    c2 = 'r'
    size1 = data1
    size2 = data2
    if data1 < 30:
        c1 = 'g'
        size1 = 20
    if data2 < 30:
        c2 = 'g'
        size2 = 20
    


    ax.add_patch(plt.Circle(sensor1_loc, size1 + 10, color=c1, alpha=0.7))
    ax.add_patch(plt.Circle(sensor2_loc, size2 + 10, color=c2, alpha=0.7))
    #Put the numbers on the picture
    ax.text(sensor1_loc[0], sensor1_loc[1], str(data1) + '%', color='w', ha='center', va='center', fontsize=10)
    ax.text(sensor2_loc[0], sensor2_loc[1], str(data2) + '%', color='w', ha='center', va='center', fontsize=10)

    #Remove the axis
    ax.axis('off')
    #Save the picture
    plt.savefig('floor_plan_grid.png', bbox_inches='tight', pad_inches=0)
    #Close the picture
    plt.close(fig)

def on_message(client, userdata, msg):
    
    #Get the data from the MQTT message
    data = msg.payload.decode("utf-8")
    #Split the data into two values
    data1, data2 = data.split(' ')
    #Create the floor plan picture
    print(data1, data2)
    create_floor_plan(int(float(data1)), int(float(data2)))

def on_timeout():
    client.disconnect()
    assert False, "Timeout"

client = paho.Client(client_id="", userdata=None, protocol=paho.MQTTv5)
client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
#MQTT_BROKER_UNAME and MQTT_BROKER_PWORD are the username and password for the MQTT broker
client.username_pw_set(os.getenv('MQTT_BROKER_UNAME'), os.getenv('MQTT_BROKER_PWORD'))
#MQTT_BROKER_IP is the IP address of the MQTT broker

client.connect(os.getenv('MQTT_BROKER_URL'), 8883)
client.subscribe("moistsensor")
client.on_message = on_message
client.on_timeout = on_timeout
# Create a flag to control whether the client should keep running
client_running = True

def on_keyboard_interrupt(signum, frame):
    global client_running
    client_running = False

try:
    while client_running:
        client.loop()
except KeyboardInterrupt:
    pass

# Disconnect the client when it exits
client.disconnect()
