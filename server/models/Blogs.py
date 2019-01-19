# Data structure of Blog:
#     in db.blogs /db.blogs_tmp
#     {
#         _id:'xxx'
#         post:'time'
#         username:''
#         pic:'link'
#         Uid:''
#         title:''
#         subtitle:''
#         likes:10
#         liked:['Uid', ...]
#         dis:5
#         disd:['Uid', ...]
#         tags:[],
#         state:'ok/inpecting/trash/deleted'
#
#         last_update:'time'
#         content:'xxxx'
#         comments:[
#         {
#             userid:"xxx"
#             username:'xxx'
#             pic:'link'
#             content:'xxx'
#             date:''
#             likes:10
#             liked:['Uid', ...]
#             dis:5
#             disd:['Uid', ...]
#             reply:{
#                 userid:"xxx"
#                 name:'xxx'
#                 content:'xxx'
#                 date:''
#             }
#         },...
#         ]
#     }



import re, time, datetime
from flask import abort
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

db = PyMongo()

class Blogs():

    @staticmethod
    def Blog(id):
        blog = db.db.blogs.find_one({'_id':ObjectId(id)})
        if blog is not None:
            blog.pop('_id')
            return blog
        return abort(404)

    @staticmethod
    def testInsert(data):
        return format(db.db.blogs.insert_one(data).inserted_id)

    @staticmethod
    def owns(Uid,Bid):
        if db.db.users.find_one({'_id':ObjectId(Uid),'blogs':Bid}):
            return True
        return False

    @staticmethod
    def post(data,user):
        # Blogs.testInsert(data)
        data.update({
            'post':datetime.datetime.utcnow(),
            'username':user.name,
            'Uid':user.id,
            'pic':user.pic,
            'likes':0,
            'liked':[],
            'dis':0,
            'disd':[],
            'last_update':datetime.datetime.utcnow(),
            'comments':[],
            'state':'ok'
        })
        Bid = format(db.db.blogs.insert_one(data).inserted_id)
        user.newPost(Bid)
        return Bid

    @staticmethod
    def delete_admin(Bid):
        doc = db.db.blogs.find_one({'_id':ObjectId(Bid)})
        if doc: Uid = doc.get('Uid')
        else: return 0
        if db.db.users.update_one({'_id':ObjectId(Uid)},
        {'$pull':{'blogs':Bid}}).modified_count >= 0:
            db.db.users.update_one({'_id':ObjectId(Uid)},
            {'$push':{'notifications':{
                'type':'notification',
                'msg':"your post has been deleted by the administrator",
                'link':'',
                'read':False
            }}})
            return db.db.blogs.delete_one({'_id':ObjectId(Bid)}).deleted_count
        return 0

    @staticmethod
    def setState(state,Bid,auth_type,Uid):
        if Blogs.owns(Uid,Bid) or auth_type=='admin':
            db.db.blogs.update_one({'_id':ObjectId(Bid)},
            {'$set':{'state':state}})
            return 'success'
        return 'failed'

    def __init__(self):
        pass


    # def __repr__(self):
    #     pass
