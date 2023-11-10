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
        elif "hello" in command:
            response = "Hello! How can I help you?"
            break
        elif "how are you" in command:
            response = "I am fine, what about you"
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

@app.route("/voicechat", methods=["POST"])
def chat():
    return chat_view.chat_Voice(request)


@app.route("/voicechat", methods=["GET"])
def get_chats():
    return chat_view.get_Chats_Voice()


if __name__ == "__main__":
    app.run(debug=True)

