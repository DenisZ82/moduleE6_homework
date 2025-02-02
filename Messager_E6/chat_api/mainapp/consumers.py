import json
from .models import User, Room, Post
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


# def roomlist():
#     objects = Room.objects.filter()
#     list = {'RoomList': 'RoomList'}
#     for object in objects:
#         list[object.id] = object.name
#     return list


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        self.send(text_data=json.dumps({"message": message}))


# class ChatConsumer(WebsocketConsumer):
#
#     # def connect(self, event):
#     #     self.user = self.scope["user"]
