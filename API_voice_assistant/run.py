from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# MongoDB configuration
client = MongoClient("mongodb+srv://dineshthakare0319:3PRTY9FX07dQtgF1@cluster0.sgpxqmf.mongodb.net/Voice_Assistant?retryWrites=true&w=majority")
db = client["Voice_Assistant"]  # Change "your_database_name" to your actual database name
users_collection = db["users"]

# Register endpoint
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    email = data.get("email")

    if not username or not password or not email:
        return jsonify({"error": "All fields are required"}), 400

    if users_collection.find_one({"$or": [{"username": username}, {"email": email}]}):
        return jsonify({"error": "Username or email already exists"}), 400

    hashed_password = generate_password_hash(password, method="pbkdf2:sha256")

    users_collection.insert_one({
        "username": username,
        "password": hashed_password,
        "email": email
    })

    return jsonify({"message": "Registration successful"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = users_collection.find_one({"username": username})

    if user and check_password_hash(user["password"], password):
        # Passwords match, user is authenticated
        return jsonify({"message": "Login successful"}), 200
    else:
        # Invalid credentials
        return jsonify({"error": "Invalid username or password"}), 401

if __name__ == "__main__":
    app.run(debug=True)
