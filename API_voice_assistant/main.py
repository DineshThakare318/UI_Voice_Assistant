# import speech_recognition as sr
# import pyttsx3
# import datetime
# import webbrowser
# import os

# # Initialize the speech recognition engine
# recognizer = sr.Recognizer()

# # Initialize the text-to-speech engine
# engine = pyttsx3.init()

# # Function to speak text
# def speak(text):
#     engine.say(text)
#     engine.runAndWait()

# # Function to recognize speech
# def listen():
#     with sr.Microphone() as source:
#         print("Listening...")
#         audio = recognizer.listen(source)
#         command = ""
#         try:
#             command = recognizer.recognize_google(audio)
#             print("You said: " + command)
#         except sr.UnknownValueError:
#             print("Sorry, I couldn't understand that.")
#         return command

# # Main program
# if __name__ == "__main__":
#     speak("Hello! How can I assist you today?")

#     while True:
#         command = listen().lower()

#         if "time" in command:
#             current_time = datetime.datetime.now().strftime("%H:%M:%S")
#             speak(f"The current time is {current_time}")

#         elif "search" in command:
#             speak("What do you want to search for?")
#             search_query = listen()
#             url = f"https://www.google.com/search?q={search_query}"
#             webbrowser.open(url)

#         elif "exit" in command:
#             speak("Goodbye!")
#             exit()


import collections
import datetime
import webbrowser
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from pymongo import MongoClient
import speech_recognition as aa
import pyttsx3
import pywhatkit
import datetime
import wikipedia
from app.controllers.auth_controller import AuthController
from app.controllers.chat_controller import ChatController
from app.views.user_view import UserView
from app.views.auth_view import AuthView
from app.views.chat_view import ChatView
from app import mongo_db
from app.service.chat_service import voice_chat_service

app = Flask(__name__)
CORS(app)

auth_controller = AuthController()
chat_controller = ChatController()
auth_view = AuthView(auth_controller)
chat_view = ChatView(chat_controller)


@app.route("/api/command", methods=["POST"])
def process_command():
    a = True
    data = request.get_json()
    command = data["command"].lower()
    # sites = [["youtube","https://www.youtube.com"], ["wikipedia" "https://www.wikipedia.com"],["google" "https://www.google.com"]]
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

        if len(response)==0:
            response = voice_chat_service(request)
        return jsonify({"response": response})


@app.route("/voicechat", methods=["POST"])
def chat():
    return chat_view.chat_Voice(request)


@app.route("/voicechats", methods=["GET"])
def get_chats():
    return chat_view.get_Chats_Voice()


if __name__ == "__main__":
    app.run(debug=True)

