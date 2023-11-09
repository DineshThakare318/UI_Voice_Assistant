from flask import Flask
from pymongo import MongoClient
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

# MongoDB Connection Initialization
mongo_client = MongoClient(app.config['MONGO_URI'])
mongo_db = mongo_client[app.config['MONGO_DB_NAME']]

__all__ = ['app', 'mongo_db', 'user', 'user_controller', 'user_view']
