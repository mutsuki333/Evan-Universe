from flask import Flask, url_for, request, redirect, Blueprint, jsonify
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
from flask_login import current_user, login_required
# from flask_socketio import

db = PyMongo()
announce = Blueprint('announce', __name__, url_prefix='/announce')

@announce.route('/')
def home():
    # print(current_user.user_obj())
    return jsonify({"announce":"The Big Bang is starting!!"})
