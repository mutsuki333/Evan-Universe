from flask import Flask, url_for, request, redirect, Blueprint, jsonify
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
from flask_login import current_user, login_required
# from flask_socketio import

db = PyMongo()
announce = Blueprint('announce', __name__, url_prefix='/announce')

@announce.route('/')
def home():
    t = {
    'ddd':"dafd","ijaid":"addsd"
    }
    k = {
    'kkk':"sss","addd":"addssdad"
    }
    v =[t,k]
    # print(current_user.user_obj())
    o = {"announce":"The Big Bang is starting!!"}
    print(v+[o])
    return jsonify(o)
