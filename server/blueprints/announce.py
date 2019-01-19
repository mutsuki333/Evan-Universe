# announce/notification:
# {
#     'type':'announce/notification/alert/ads/msg_to_admin/msg_to_user',
#     'content':"markdown_string",
#     'from':"id",
#     'toId':"id/None",
#     'toAuthType':['basic',...],
#     'toGroup':'groupId',
#     'emitTime':'time',
#     'validTrough':'time/null'
# }


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
    'type':'announce', 'content':'# The Big Bang is starting!!'
    }
    k = {
    'type': 'ads', 'content': '# Welcome to The Evan Universe\n### here is the [link](http://54.71.220.94/Evan-Universe) to future'
    }
    o = {
    'type': 'notification', 'content':'## Plz remember to change your user infos'
    }
    v=[t,k,o]
    return jsonify(v)
