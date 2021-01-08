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
                                password="postgres",
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
<<<<<<< HEAD

=======
>>>>>>> 405b5152f3dc33da434a6a2e2d02d288d990d1cf
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
            
            insert_clothing(imageType, os.path.join(path, image.filename))

            # print(os.path.join(path, image.filename))
            image.save(os.path.join(path, image.filename))
            return "Upload Successful"

# Input user 
def insert_clothing(imageType, relative_path):
    try:
        connection = connect_db()
        cursor = connection.cursor()

        postgres_insert_query = """ INSERT INTO clothings (clothing_type, relative_path) 
                                    VALUES (%s, %s)"""
        record_to_insert = (imageType, relative_path,)
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        count = cursor.rowcount
        return("Clothing item inserted successfully into clothings table")
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Error while inserting into clothings table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            # print("PostgreSQL connection is closed")


@app.route("/sendImage/<path:filename>", methods=["GET"])
def send_image(filename):
    try: 
        path = filename.split("/")
        return send_from_directory(path[0] + "\\" + path[1], filename=path[2])
    except FileNotFoundError: 
        abort(404)

@app.route("/getImage/<image_type>", methods=["GET"])

def get_image(image_type): 
    try:
        connection = connect_db()
        cursor = connection.cursor()

        postgres_select_query = """ SELECT * FROM clothings WHERE clothing_type = %s """
        record_to_select = (image_type,)
        cursor.execute(postgres_select_query, record_to_select)
        connection.commit()
        count = cursor.rowcount
        print(count, "Clothing item successfully selected from clothings table")

        output = {}
        raw_arr = cursor.fetchall()
        output_arr = []

        for i in raw_arr:
            output_arr.append(i[1])
        output.update({"items": output_arr})
        return json.dumps(output)
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Error while selecting from clothings table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            # print("PostgreSQL connection is closed")

@app.route("/deleteItem", methods=["POST"])
def delete_item():
    try:
        relative_path = request.get_json()["relative_path"]
        connection = connect_db()
        cursor = connection.cursor()

        delete_statement = "DELETE FROM clothings WHERE relative_path=%s;"
        record_to_delete = (relative_path,)
        cursor.execute(delete_statement, record_to_delete)
        connection.commit()
        count = cursor.rowcount
        print(count, "Item deleted successfully from clothings table")

        return "Successfully Deleted Record"
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Error while deleting from clothings table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            # print("PostgreSQL connection is closed")

@app.route("/addOutfit", methods=["POST"]) 
def add_outfit(): 
    outfit_arr = request.get_json()["item"]
    print(outfit_arr)

    try:
        connection = connect_db()
        cursor = connection.cursor()

        postgres_insert_query = """ INSERT INTO outfits (outfit_id, saved_clothings) 
                                    VALUES (DEFAULT, %s)"""
        record_to_insert = (outfit_arr,)
        cursor.execute(postgres_insert_query, record_to_insert)
        connection.commit()
        count = cursor.rowcount
        return("Outfit inserted successfully into outfits table")
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Error while inserting into outfits table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            # print("PostgreSQL connection is closed")

@app.route("/getOutfits", methods=["GET"]) 
def getOutfits():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        quote_select_query = """SELECT * FROM outfits"""
        cursor.execute(quote_select_query)
        # connection.commit()
        # count = cursor.rowcount
        data = cursor.fetchall()

        outfits = []
        for outfits_raw in data:
            outfit = {
                "outfit_id": outfits_raw[0],
                "items" : outfits_raw[1]
            }
            outfits.append(outfit)

        print("Outfits successfully selected from outfits table")
        print (outfits)
        return { "outfits" : outfits}
    
    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Error while selecting from outfits table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            # print("PostgreSQL connection is closed")

@app.route("/deleteOutfit/<int:outfit_id>", methods=["POST"])
def delete_outfits(outfit_id):
    try:
        connection = connect_db()
        cursor = connection.cursor()
        delete_statement = "DELETE FROM outfits WHERE outfit_id={0};".format(outfit_id)

        cursor.execute(delete_statement)
        connection.commit()
        count = cursor.rowcount
        print(count, "Outfit deleted successfully from outfits table")
        return "Successfully Deleted Record"

    except (Exception, psycopg2.Error) as error:
        if(connection):
            print("Error while deleting from outfits table", error)
    finally:
        if(connection):
            cursor.close()
            connection.close()
            # print("PostgreSQL connection is closed")

if __name__ == '__main__':
    # app.run(debug=True)
    input_user("Rollie", "123")
    # login()
    app.run(host='0.0.0.0', port=5200)