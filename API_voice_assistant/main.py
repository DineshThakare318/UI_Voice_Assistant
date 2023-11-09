import collections
import webbrowser
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import speech_recognition as aa
import pyttsx3
import pywhatkit
import datetime
import wikipedia
from app.controllers.chat_controller import ChatController
from app.views.chat_view import ChatView
from app import mongo_db
from datetime import datetime
from app.service.chat_service import voice_chat_service

app = Flask(__name__)
CORS(app)

chat_controller = ChatController()
chat_view = ChatView(chat_controller)


@app.route("/api/command", methods=["POST"])
def process_command():
    a = True
    data = request.get_json()
    command = data["command"].lower()
   
    response = ""
    sites = [{"siteName":"youtube","url":"https://www.youtube.com", "response":"Opening youtube"},
             {"siteName":"google","url":"https://www.google.com", "response":"Opening google"},
             {"siteName":"wikipedia","url":"https://www.wikipedia.com","response":"Opening Wikipedia"}
             ] 
    for site in sites:
        if f"open {site['siteName']}".lower() in command:
            a = webbrowser.open(site['url'])
            if a:
                response = site['response']
            else:
                response = f"Error in opening {site['siteName']}"
        elif "hello" in command:
            response = "Hello! How can I help you?"

        elif "how are you" in command:
            response = "I am fine, what about you"

        elif "time" in command:
            current_time = datetime.datetime.now().strftime("%H:%M:%S")
            response = f"The current time is {current_time}"
        elif "play" in command:
            song = command.replace("play", "")
            response = pywhatkit.playonyt(song)
        elif "who is" in command:
            human = command.replace("who is", "")
            info = wikipedia.summary(human, 1)
            response = info
        elif "exit" in command:
            response = "Goodbye! Have a great day....!!"
         

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

@app.route("/voicechat", methods=["POST"])
def chat():
    return chat_view.chat_Voice(request)


@app.route("/voicechat", methods=["GET"])
def get_chats():
    return chat_view.get_Chats_Voice()


if __name__ == "__main__":
    app.run(debug=True)

