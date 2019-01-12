from flask import Flask, url_for, request, redirect, Blueprint, jsonify
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
from flask_login import current_user, login_required
# from flask_socketio import

from models.Blogs import Blogs

blog = Blueprint('blog', __name__, url_prefix='/blog')

@blog.route('/')
def home():
    return 'blog works'

@blog.route('/test/<id>')
def test(id):
    return jsonify(Blogs.Blog(id))
    return 'dd'

@blog.route('/testI', methods=['POST'])
def testI():
    data = request.form or request.get_json()
    return Blogs.testInsert(data)
