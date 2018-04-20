# executer ces commandes avant de lancer ce programme :
# pip install pyserial
# pip install pymongo
import serial
import time
import datetime
from pymongo import MongoClient

# Configuration
serial_port          = '/dev/ttyACM0'
mongodb_host         = 'kvm.neo-se.fr'
mongodb_port         = '27002'
mongodb_db           = 'iot'
temperature_location = "Nantes"

# Connect to Serial Port for communication
ser = serial.Serial(serial_port, 9600, timeout=0)

# Connect to MongoDB
client = MongoClient(mongodb_host, mongodb_port)
db = client[mongodb_db]
collection = db['mesures']
led_pin = {"verte": 12, "rouge": 13}

# Setup a loop to send Temperature values at fixed intervals in seconds
fixed_interval = 5
while 1:
    try:
        # Temperature value obtained from Arduino + LM35 Temp Sensor
        temp_string = ser.readline().rstrip()

        # If we received a measurement, print it and send it to MongoDB.
        if temp_string:
            temperature_c = float(temp_string)
            doc_id = collection.insert_one({ 'temperature': temperature_c,
                                             'datetime': datetime.datetime.now(),
                                             'location': temperature_location}).inserted_id
            print(str(doc_id) + ': ' + str(temperature_c) + ',' + temperature_location)
    except serial.SerialTimeoutException:
        print('Error! Could not read the Temperature Value from unit')
        ser.write(led_pin["rouge"], 'H')
    except ValueError:
        print('Error! Could not convert temperature to float')
        write(led_pin["rouge"], 'H') # les données n'ont pas été enregistrées, la led rouge s'allume
    finally:
        write(led_pin["verte"], 'H') # les données ont bien été enregistrées, la led verte s'allume
        time.sleep(fixed_interval)

# Ce script fonctionne avec des sondes LM35 reliées à une carte Arduino par câble direct