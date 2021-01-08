# DB connection
import psycopg2
from psycopg2 import Error, extras
import csv
import json
import requests

from flask import Flask, request
app = Flask(__name__)

# Use localhost for local database (with the default password set for your system).

def connect_db():
    connection = psycopg2.connect(user="postgres",
                                password="postgres",
                                host="localhost",
                                port="5432",
                                database="easywar")
    return connection

# Create users table


def create_users():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        create_users_table_query = '''CREATE TABLE IF NOT EXISTS users
                  (username TEXT UNIQUE NOT NULL PRIMARY KEY,
                  password TEXT NOT NULL); '''
        cursor.execute(create_users_table_query)
        connection.commit()
        print("Users table created successfully in PostgreSQL ")

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while creating users table", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Create clothings table

def create_clothings():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        create_clothings_table_query = '''CREATE TABLE IF NOT EXISTS clothings
                  (clothing_type TEXT,
                  relative_path TEXT,
                  PRIMARY KEY(clothing_type, relative_path)); '''
        cursor.execute(create_clothings_table_query)
        connection.commit()
        print("Clothings table created successfully in PostgreSQL ")

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while creating clothings table", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Create outfits table

def create_outfits():
    try:
        connection = connect_db()
        cursor = connection.cursor()

        create_outfits_table_query = '''CREATE TABLE IF NOT EXISTS outfits
                  (outfit_id SERIAL PRIMARY KEY,
                  saved_clothings TEXT[]); '''
        cursor.execute(create_outfits_table_query)
        connection.commit()
        print("Outfits table created successfully in PostgreSQL")

    except (Exception, psycopg2.DatabaseError) as error:
        print("Error while creating outfits table", error)

    finally:
        # closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            #print("PostgreSQL connection is closed")

# Create all the tables


def db_setup():
    create_users()
    create_clothings()
    create_outfits()



# # Testing if info is inserted successfully


# def insert_stuff_test():
#     insert_type("text")
#     insert_type("radio")
#     insert_patient("busy", [])
#     insert_patient("busy", [])
#     insert_answer(1, "answer", 1, 1)
#     insert_answer(1, "answer", 2, 1)

# # Insert all the stations


# def insert_stations():
#     insert_station("Registration")
#     insert_station("Tobacco Questionnare")
#     insert_station("Anemia Questionnare")
#     insert_station("BMI (Underweight measurement)")
#     insert_station("Haemoglobin (Anemia measurement)")
#     insert_station("Post campaign survey")


# def insert_stuff_test_patch_4():
#     # The commands I used to generate the output sent in the group - Wei Kit (5/8/20) This fails because I edited patient table - Rollie (10/8/20)

#     drop_tables()
#     db_setup()

#     insert_patient('Busy', [1, 0])
#     insert_patient('Available', [0, 2])
#     insert_station('oralHealth')
#     insert_station('bmi')
#     insert_question('Name', 1, 1)
#     insert_question('Age', 1, 1)

#     # for patient 1
#     insert_answer(1, 'Alice', 1, 1)
#     insert_answer(1, 20, 2, 1)

#     # for patient 2
#     insert_answer(2, 'Bob', 1, 1)
#     insert_answer(2, 35, 2, 1)


def main():
    db_setup()
    # insert_stations()
    # insert_type("text")
    # insert_question("Name", 1, 1)
    # insert_question("NRIC No.", 1, 1)

    # save_questions("question.csv")
    # insert_stuff_test()
    # get_questions("Registration")
    # get_answers(1,1)
    #update_completed(1, "registration")
    # set_availability_false("Registration")
    # get_station_availability()

    # insert_stuff_test_patch_4()

    # insert_type("text")
    # insert_question("Name", 1, 1)
    # insert_question("NRIC No.", 1, 1)


if __name__ == '__main__':
    main()
    app.run(debug=True)
