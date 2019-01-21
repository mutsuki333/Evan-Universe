# announce/notification:
# {
#     'type':'announce/notification/mentioned/alert/ads/msg_to_admin/msg_to_user',
#     'content':"markdown_string",
#     'from':"id/name",
#     'toId':"id/None",
#     'toAuthType':['basic',...],
#     'toGroup':'groupId',
#     'emitTime':'time',
#     'validTrough':'time/null',
#     'read': True/False
# }


from flask import Flask, url_for, request, redirect, Blueprint, jsonify
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
from flask_login import current_user, login_required

from models.User import User
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

@announce.route('/mentioned/<Bid>/<name>')
def mentioned(Bid,name):
    if current_user.is_authenticated:
        if name == current_user.name:return 'failed'
        User.addNotification(name,type='mentioned',link='/blog/{}'.format(Bid),fromName=current_user.name)
    else:
        User.addNotification(name,type='mentioned',link='/blog/{}'.format(Bid))
    return 'success'
