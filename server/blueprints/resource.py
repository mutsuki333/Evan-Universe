from flask import Flask, url_for, request, redirect, Blueprint
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
import uuid


resource = Blueprint('resource', __name__, url_prefix='/resource')
imgdb = PyMongo() #DB for img
rdb = PyMongo() #DB for resources

@resource.route('/')
def home():
    return 'resource works!'

@resource.route('/upload_img', methods=["POST"])
@resource.route('/upload_img/<base>/<filename>', methods=["POST"])
def upload(filename=None,base=None):
    filename = filename or request.args.get('filename')
    if base is None:
        base = request.args.get('base') or 'img'
    if filename is None:
        filename = '{}.jpg'.format(str(uuid.uuid4().hex))
    id_str=imgdb.save_file(filename,request.files["file"],base=base)
    return url_for('resource.IMG',id_str=id_str,base=base)

@resource.route('/img/')
@resource.route('/img/<base>/<id_str>')
def IMG(id_str=None,base=None):
    id_str = id_str or request.args.get('id_str')
    base = base or request.args.get('base')
    if base is None:return imgdb.send_file(id_str=id_str)
    else:return imgdb.send_file(base=base,id_str=id_str)

@resource.route('/delete_img/<base>/<id_str>')
def delete_id(id_str=None,base=None):
    id_str = id_str or request.args.get('id_str')
    base =  base or request.args.get('base')
    if base is None:return imgdb.delete_id(id_str=id_str)
    else:return imgdb.delete_id(base=base,id_str=id_str)
