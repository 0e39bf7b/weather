import os
import sqlite3
import json
from pwd import getpwnam
from constants import *

uid = -1

try:
    uid = getpwnam(USER).pw_uid
    print('user ' + USER + ' already exists')
except:
    print('create user ' + USER)
    os.system('useradd -r -s /bin/false ' + USER)
    os.system('gpasswd -a ' + USER + ' i2c')
    uid = getpwnam(USER).pw_uid

if os.path.isdir(DATA_PATH):
    print('directory ' + DATA_PATH + ' already exists')
else:
    print('create data directory ' + DATA_PATH)
    os.makedirs(DATA_PATH)

    print('init db')
    os.makedirs(os.path.dirname(DB_PATH))
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('CREATE TABLE IF NOT EXISTS data (timestamp INTEGER NOT NULL UNIQUE, temperature REAL NOT NULL, pressure REAL NOT NULL, humidity REAL NOT NULL)')
        conn.commit()
    os.chown(os.path.dirname(DB_PATH), uid, -1)
    os.chown(DB_PATH, uid, -1)

    print('init json file')
    os.makedirs(os.path.dirname(MEASUREMENTS_PATH))
    with open(MEASUREMENTS_PATH, 'w') as out:
        out.write(json.dumps([]))
    os.chown(os.path.dirname(MEASUREMENTS_PATH), uid, -1)
    os.chown(MEASUREMENTS_PATH, uid, -1)
