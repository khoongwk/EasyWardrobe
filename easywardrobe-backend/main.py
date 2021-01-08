from datetime import datetime
import os

# Flask Playground
from flask import Flask, request, jsonify, send_from_directory, abort
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
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)
app.config["JWT_SECRET_KEY"] = 'secret'
app.config["IMAGE_TYPE_ACCESSORIES"] = "images\\accessories"
app.config["IMAGE_TYPE_TOP"] = "images\\top"
app.config["IMAGE_TYPE_BOTTOM"] = "images\\bottom"
app.config["IMAGE_TYPE_SHOES"] = "images\\shoes"
app.config["ALLOWED_IMAGE_EXTENSIONS"] = ["PNG", "JPG", "JPEG", "GIF"]

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

def allowed_image(filename):

    if filename == "":
        print("No file name")
        return False

    if not "." in filename:
        print("Invalid file")
        return False
    
    ext = filename.rsplit(".", 1)[1]

    if ext.upper() in app.config["ALLOWED_IMAGE_EXTENSIONS"]:
        return True
    else:
        return False

@app.route("/uploadItem/<imageType>", methods=["POST"])
def upload_item(imageType):
    if request.method == "POST":
        if request.files:
            image = request.files["image"]
            
            if not allowed_image(image.filename):
                print("Extension not allowed")
                return "Error in uploading"

            if imageType == "accessories":
                path = app.config["IMAGE_TYPE_ACCESSORIES"]
            elif imageType == "top":
                path = app.config["IMAGE_TYPE_TOP"]
            elif imageType == "bottom":
                path = app.config["IMAGE_TYPE_BOTTOM"]
            elif imageType == "shoes":
                path = app.config["IMAGE_TYPE_SHOES"]
            else:
                print("Wrong image type")
                return "Error in uploading"
            
            print(os.path.join(path, image.filename))
            image.save(os.path.join(path, image.filename))
            return "Upload Successful"

@app.route("/sendImage/<path:filename>", methods=["GET"])
def send_image(filename):
    try: 
        path = filename.split("/")
        return send_from_directory(path[0] + "\\" + path[1], filename=path[2])
    except FileNotFoundError:
        abort(404)

if __name__ == '__main__':
    # app.run(debug=True)
    # input_user("Rollie", "123")
    # login()
    app.run(host='0.0.0.0', port=5200)