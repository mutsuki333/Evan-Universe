# Data structure of Blog:
#     in db.blogs
#     {
#         _id:'xxx'
#         post:'time'
#         username:''
#         userid:''
#         title:''
#         likes:10
#         liked:['Uid', ...]
#         dis:5
#         disd:['Uid', ...]
#         tags:[]
#
#         last_update:'time'
#         content:'xxxx'
#         comments:{
#             userid:"xxx"
#             name:'xxx'
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
#         }
#     }



import re, time
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

db = PyMongo()

class Blogs():

    @staticmethod
    def Blog(id):
        blog = db.db.blogs.find_one({'_id':ObjectId(id)})
        blog.pop('_id')
        return blog

    @staticmethod
    def testInsert(data):
        return format(db.db.blogs.insert_one(data).inserted_id)

    def __init__(self):
        pass


    # def __repr__(self):
    #     pass
