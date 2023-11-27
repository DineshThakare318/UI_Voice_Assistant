import collections
import webbrowser
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
import pywhatkit
import datetime
import wikipedia
from app.controllers.chat_controller import ChatController
from app.views.chat_view import ChatView
from app import mongo_db
from datetime import datetime
from app.service.chat_service import voice_chat_service
import psutil
import pyautogui
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from app.service.auth import validate_jwt_token, generate_jwt_token
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
app = Flask(__name__)
CORS(app)

chat_controller = ChatController()
chat_view = ChatView(chat_controller)

def close_tab():
     pyautogui.hotkey('ctrl', 'w')


def get_weather_data(weather_Api_key, city):
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {"q": city, "appid": weather_Api_key, "units": "metric"}
    try:
        response = requests.get(base_url, params=params)
        data = response.json()
        if response.status_code == 200:
            return data
        else:
            return None
    except Exception as e:
        print(f"Error fetching weather data: {e}")
        return None

@app.route("/api/command", methods=["POST"])
def process_command():
    auth_result = authorize_request()
    if auth_result:
        return auth_result
    else:
        data = request.get_json()
        command = data["command"].lower()
        response = ""

        
        weather_Api_key = "f5191924548c56d6150aec375bc44a38"
        news_Api_key = "82fb77eec4ac4a97acca92bd08114d08"

        sites = [
            {"siteName": "youtube", "url": "https://www.youtube.com", "response": "Opening youtube"},
            {"siteName": "google", "url": "https://www.google.com", "response": "Opening google"},
            {"siteName": "wikipedia", "url": "https://www.wikipedia.com", "response": "Opening Wikipedia"}
        ]

        for site in sites:
            if f"open {site['siteName']}".lower() in command:
                a = webbrowser.open(site['url'])
                if a:
                    response = site['response']
                else:
                    response = f"Error in opening {site['siteName']}"
                break  


            elif "google search" in command:
                query = command.replace("google search", "")
                google_search_url = f"https://www.google.com/search?q={query}"
                webbrowser.open(google_search_url)
                response = f"Searching Google : {query}"
                break
            elif "hello" in command:
                response = "Hello! How can I help you?"
                break
            elif "how are you" in command:
                response = "I am fine, what about you"

            elif "your name" in command:
                response = "I am your virtual assistant. How can I assist you today"  
                break
            elif "who are you" in command:
                response = "I am a voice assistant. How can I assist you today?"    
                break
            elif "time" in command:
                current_time = datetime.now().strftime("%H:%M:%S")
                response = f"The current time is {current_time}"
                break
            elif "play" in command:
                song = command.replace("play", "")
                response = pywhatkit.playonyt(song)
                break
            elif "who is" in command:
                human = command.replace("who is", "")
                info = wikipedia.summary(human, 1)
                response = info
                break
            elif "exit" in command:
                response = "Goodbye! Have a great day....!!"
                break
            
            elif "close browser" in command:
                os.system("taskkill /im chrome.exe /f")
                response = "Closing the browser"
                break

            elif "close tab" in command:  
                close_tab()
                response = "Closing the current tab"
                break

            elif "weather" in command:
                command_words = command.split()
                city = command_words[-1].strip()
                if city:
                    weather_data = get_weather_data(weather_Api_key, city)
                    if weather_data:
                        response = f"The weather in {city} is {weather_data['weather'][0]['description']} with a temperature of {weather_data['main']['temp']}°C."
                    else:
                        response = "Sorry, I couldn't fetch the weather information at the moment."
                else:
                    response = "Please specify a city for weather information."

            elif "news update" in command:
                news_url = f"https://newsapi.org/v2/top-headlines?country=in&apiKey={news_Api_key}"
                try:
                    news_response = requests.get(news_url)
                    news_data = news_response.json()
                    if news_response.status_code == 200 and news_data.get("status") == "ok":
                        articles = news_data.get("articles", [])
                        if articles:
                            response = "Here are the latest news headlines:\n"
                            for index, article in enumerate(articles[:5], start=1):
                                response += f"{index}. {article['title']}\n"
                                response += f"Source: {article['source']['name']}\n"
                                response += f"URL: {article['url']}\n\n"
                        else:
                            response = "No news articles available at the moment."
                    else:
                        response = "Sorry, I couldn't fetch the latest news at the moment."
                except Exception as e:
                    response = f"Error fetching news: {e}"      
        if len(response) == 0:
            response = voice_chat_service(request)

        chat_message = {
            "command": command,
            "response": response,
            "time": datetime.now().strftime("%H:%M")
        }
        mongo_db.chats.insert_one(chat_message)

        return jsonify({"response": response})





@app.route("/chathistory", methods=["GET"])
def get_chat_History():
    return chat_view.get_chats()

@app.route("/chatSearch" , methods=["GET"])
def get_chat_Search():
    return chat_view.get_Search_List()

@app.route("/voicechat", methods=["POST"])
def chat():
    return chat_view.chat_Voice(request)


@app.route("/voicechat", methods=["GET"])
def get_chats():
    return chat_view.get_Chats_Voice()

               ###############################             Login SignUp Page              #########################################

# MongoDB configuration
client = MongoClient("mongodb+srv://dineshthakare0319:3PRTY9FX07dQtgF1@cluster0.sgpxqmf.mongodb.net/Voice_Assistant?retryWrites=true&w=majority")
db = client["Voice_Assistant"] 
users_collection = db["users"]
feedback_collection = db["feedback"]

#Feedback

@app.route("/submit-feedback", methods=["POST"])
def submit_feedback():
    try:
        data = request.get_json()

        # if "feedback" not in data or not data["feedback"].strip() or "rating" not in data or not data["rating"]:
        #     raise ValueError("Both feedback and rating are required and cannot be empty")

        if ("feedback" in data and data["feedback"].strip()) or ("rating" in data and data["rating"]):
            print("Form submitted successfully!")
        else:
            raise ValueError("At least one of feedback or rating should be filled.")


        feedback = data["feedback"]
        rating = data["rating"]
        timestamp = datetime.now()

        feedback_data = {
            "feedback": feedback,
            "rating": rating,
            "timestamp": timestamp
        }

        feedback_collection.insert_one(feedback_data)

        return jsonify({"message": "Feedback submitted successfully"}), 200

    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


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

    return jsonify({"message": "Registration successful"}), 200

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

        token = generate_jwt_token('This is the secret', user)

        return jsonify({"message": "Login successful","isSuccess":True, 'accessToken':token, 'username':username}), 200
    else:
        # Invalid credentials
        return jsonify({"error": "Invalid username or password"}), 401




def authorize_request():
    token = request.headers.get('Authorization')
    
    if not token:
        return jsonify({'error': 'Token is missing'}), 401
    
    token = token.split("Bearer ")[1]  # Remove 'Bearer ' from the token string
    
    payload = validate_jwt_token(token, 'This is the secret')
    
    if payload:
        # The token is valid, you can now use the payload to authorize the user
        user_id = payload['_id']
        return None
    else:
        return jsonify({'error': 'Invalid or expired token'}), 401


@app.route("/check", methods=["GET"])
def check():
    auth_result = authorize_request()
    if auth_result == None:
        return jsonify({'isSuccess':True}), 200
    else:
        return jsonify({'isSuccess':False}), 401


if __name__ == "__main__":
    app.run(debug=True)

