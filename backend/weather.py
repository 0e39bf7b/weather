import sqlite3
import time
from BME280 import *
import json
from constants import DB_PATH, MEASUREMENTS_PATH

ps = BME280()
ps_data = ps.get_data()

timestamp = round(time.time())
temperature = ps_data['t']
pressure = round(ps_data['p'] * 0.00750061683, 2)
humidity = ps_data['h']


conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.execute('INSERT INTO data (timestamp, temperature, pressure, humidity) VALUES (?, ?, ?, ?)', (timestamp, temperature, pressure, humidity))

conn.commit()

cursor.execute('SELECT temperature, humidity, pressure, timestamp FROM data ORDER BY timestamp DESC LIMIT 48')
temps = cursor.fetchall()

measurements = []

for temp in temps:
    measurements.insert(0, {'temperature': temp[0], 'humidity': temp[1], 'pressure': temp[2], 'timestamp': temp[3]})

with open(MEASUREMENTS_PATH, 'w') as out:
    out.write(json.dumps(measurements))
