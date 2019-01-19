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

@blog.route('/testI', methods=['POST'])
def testI():
    data = request.form or request.get_json()
    return Blogs.testInsert(data)


@blog.route('/post', methods=['POST'])
@login_required
def post():
    data = request.get_json()
    return Blogs.post(data,current_user)

@blog.route('/trash/<Bid>')
@blog.route('/trash')
@login_required
def trash(Bid=None):
    Bid = Bid or request.args.get('Bid')
    return Blogs.setState('trash',Bid,current_user.auth_type,current_user.id)

@blog.route('/delete/<Bid>')
@blog.route('/delete')
@login_required
def delete(Bid=None):
    Bid = Bid or request.args.get('Bid')
    return Blogs.setState('deleted',Bid,current_user.auth_type,current_user.id)


@blog.route('/delete_admin/<Bid>')
@blog.route('/delete_admin')
@login_required
def delete_admin(Bid=None):
    if current_user.auth_type!='admin':
        return 'unauthorized'
    Bid = Bid or request.args.get('Bid')
    return format(Blogs.delete_admin(Bid))


@blog.route('/view')
def view():
    if current_user.is_authenticated:
        current_user.viewBlog()
    # request.args.get('base')...
    return jsonify({'d':'d'})

@blog.route('/id/<Bid>')
def id(Bid):
    blog = Blogs.Blog(Bid)
    if current_user.is_authenticated:
        blog['owns']=Blogs.owns(current_user.id,Bid)
    else:
        blog['owns']=False
    return jsonify(blog)
