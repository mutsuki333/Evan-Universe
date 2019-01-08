from flask import Flask, url_for, request, redirect, Blueprint
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
# from flask_socketio import

db = PyMongo()
game = Blueprint('game', __name__, url_prefix='/game')

@game.route('/')
def home():
    return 'game works!'
