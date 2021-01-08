from datetime import datetime

# Flask Playground
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = 'secret'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)


# Start up of the flask backend
@app.route("/", methods=["GET", "POST"])
def start_up():
    print("Backend up and running")
    return "Backend up and running"


# Register user
@app.route('/register', methods=['POST'])
def register():
    user_name = request.get_json()["username"]
    password = bcrypt.generate_password_hash(request.get_json()["password"]).decode("utf-8")
    created = datetime.now()
    
    # check if username already taken


# Login user
@app.route('/login', methods=['POST'])
def login():
    user_name = request.get_json()["username"]
    password = request.get_json()["password"]

    # Basically check if username exist, if yes check the hash password to see if match


    # arg_dict = {
    #     "username": user_name.lower()
    # }
    # print(arg_dict)
    # hits = esMethod.search_exact_docs(client=es, index="user", arg_dict=arg_dict)
    # if len(hits) == 0:
    #     return "Error - Username not found"
    # else:
    #     body = hits[0]["body"]
    #     to_check_password = body["password"]
    #     if bcrypt.check_password_hash(to_check_password, password):
    #         access_token = create_access_token(identity={"email": body["email"], "uuid": hits[0]["uuid"]})
    #         print(type(access_token))
    #         dic = {"token": access_token}
    #         return dic
    #     else:
    #         return "Error - Invalid password"
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5200)