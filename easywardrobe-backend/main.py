from datetime import datetime

# Flask Playground
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager

# DB connection
import psycopg2
from psycopg2 import Error, extras
import csv
import json
import requests

from flask import Flask, request
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = 'secret'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

# Use localhost for local database (with the default password set for your system).
def connect_db():
    connection = psycopg2.connect(user="postgres",
                                password="postgrespassword",
                                host="localhost",
                                port="5432",
                                database="easywar")
    return connection

# Start up of the flask backend
@app.route("/", methods=["GET", "POST"])
def start_up():
    print("Backend up and running")
    return "Backend up and running"


# Input user 
def input_user(username, password):
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    try:
        connection = connect_db()
        cursor = connection.cursor()

        postgres_insert_query = """ INSERT INTO users (username, password) 
                                    VALUES (%s, %s)"""
        record_to_insert = (username, hashed_password,)
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        count = cursor.rowcount
        print(count, "User inserted successfully into users table")
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print(error)
            return "Error - Username already exists"
    finally:
        if(connection):
            cursor.close()
            connection.close()
            # print("PostgreSQL connection is closed")

# Logs in user.
# Checks login username and password of user in users table.
# Returns error string if username and/or password does not match the information in the users table. 
@app.route('/login', methods=['POST'])
def login():
    username = request.get_json()["username"]
    password = request.get_json()["password"]

    try:
        connection = connect_db()
        cursor = connection.cursor()
        cursor2 = connection.cursor()

        postgres_query = """ SELECT * FROM users WHERE username = %s"""
        record_to_select = (username,)
        cursor.execute(postgres_query, record_to_select)
        result = cursor.fetchall()

        if not result:
            print("Username not found")
            return "Error - Username not found"

        queried_password = result[0][1]

        if bcrypt.check_password_hash(queried_password, password):
            print("Login successful")
            return "Login successful"
        else:
            print("Invalid password")
            return "Error - Invalid password"

        connection.commit()
        count = cursor.rowcount

    except (Exception, psycopg2.Error) as error:
        if(connection):
            raise Exception("Error while selecting record from users table.")
            print("Failed to select record from users table.", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed") 

if __name__ == '__main__':
    # app.run(debug=True)
    # input_user("Rollie", "123")
    # login()
    app.run(host='0.0.0.0', port=5200)