import os
USER = 'weather'
DATA_PATH = '/var/lib/weather'
DB_PATH = os.path.join(DATA_PATH, 'db/data.db')
MEASUREMENTS_PATH = os.path.join(DATA_PATH, 'data/measurements.json')
