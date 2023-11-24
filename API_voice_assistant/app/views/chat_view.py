from flask import jsonify
from app.controllers.chat_controller import ChatController

chat_controller = ChatController()  


class ChatView:
    def __init__(self, chat_controller):
        self.chat_controller = chat_controller

    def chat(self, request):
        chat = self.chat_controller.chat(request)
        return jsonify(chat), 201

    def get_chats(self):
        return jsonify(self.chat_controller.get_chats()), 200
    
    def get_Search_List(self):
        return jsonify(self.chat_controller.get_Search_List()), 200

    def chat_Voice(self, request):
        chat = self.chat_controller.chat_Voice(request)
        return jsonify(chat), 201

    def get_Chats_Voice(self):
        chat = self.chat_controller.get_chats_Voice()
        return jsonify(chat), 201
