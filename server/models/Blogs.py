# Data structure of Blog:
#     in db.blogs /db.blogs_tmp
#     {
#         _id:'xxx'
#         post:'time'
#         username:''
#         pic:'link' (onreturn)
#         Uid:''
#         title:''
#         subtitle:''
#         likes:10
#         liked:['Uname', ...]
#         dis:5
#         disd:['Uname', ...]
#         tags:[],
#         state:'ok/inpecting/trash/deleted'
#
#         last_update:'time'
#         content:'xxxx'
#         commentCtr:0
#         viewed:0
#         comments:[
#         {
#             Uid:"xxx"
#             username:'xxx'
#             pic:'link' (onreturn)
#             content:'xxx'
#             date:''
#             likes:10
#             liked:['Uid', ...]
#             dis:5
#             disd:['Uid', ...]
#             replys:[{
#                 Uid:"xxx"
#                 username:'xxx'
#                 content:'xxx'
#                 date:''
#             },...]
#         },...
#         ]
#     }



import re, time, datetime
from flask import abort
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from isodate import parse_datetime

db = PyMongo()

class Blogs():

    @staticmethod
    def View(Bid=None,tag=None,search=None,limit=5):
        if Bid is None:
            timeStmp=datetime.datetime.utcnow()
            dummy_id=ObjectId.from_datetime(timeStmp)
            query = {'_id':{'$lte':dummy_id},'state':'ok'}
        else:
            query = {'_id':{'$lt':ObjectId(Bid)},'state':'ok'}
        print(tag)
        if tag is not None:
            query['tags']=tag
        field = {'title':1,'tags':1,'post':1,'subtitle':1,'likes':1,
                 'liked':1,'dis':1,'disd':1,'last_update':1,'content':1,
                 'commentCtr':1,'viewed':1,'Uid':1,'username':1}
        blogs = []
        for doc in db.db.blogs.find(query,field).limit(limit).sort('_id',-1):
            doc['id']=format(doc['_id'])
            doc['pic']=db.db.users.find_one({'_id':ObjectId(doc.get('Uid'))},{'pic':1}).get('pic')
            doc.pop('_id')
            blogs.append(doc)
            print(doc['title'])
        if len(blogs) == 0: return 'end'
        return blogs

    @staticmethod
    def Blog(Bid,Uid=None):
        blog = db.db.blogs.find_one({'_id':ObjectId(Bid)})
        if blog is not None:
            blog['id']=format(blog['_id'])
            blog.pop('_id')
            if Uid:
                viewed = False;
                for view in db.db.users.find_one({'_id':ObjectId(Uid)},{'viewedBlog':1}).get('viewedBlog'):
                    if view.get('Bid') == Bid:
                        viewed = True
                        db.db.users.update_one({'_id':ObjectId(Uid),'viewedBlog.Bid':Bid},
                        {'$set':{'viewedBlog.$.time':datetime.datetime.utcnow()}})
                        break
                if not viewed:
                    db.db.users.update_one({'_id':ObjectId(Uid)},
                    {'$push':{'viewedBlog':{'Bid':Bid,'time':datetime.datetime.utcnow()}}})
                    db.db.blogs.update_one({'_id':ObjectId(blog.get('Uid'))},
                    {'$inc':{'viewed':1}})

            blog['pic']=db.db.users.find_one({'_id':ObjectId(blog.get('Uid'))},{'pic':1}).get('pic')
            if blog['Uid']==Uid: blog['own']=True

            for comment in blog['comments']:
                comment['pic']=db.db.users.find_one({'_id':ObjectId(comment.get('Uid'))},{'pic':1}).get('pic')
                if comment['Uid']==Uid: comment['own']=True;
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
            'likes':0,
            'liked':[],
            'dis':0,
            'disd':[],
            'last_update':datetime.datetime.utcnow(),
            'commentCtr':0,
            'viewed':0,
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
                'content':"your post has been deleted by the administrator",
                'link':'',
                'emitTime':datetime.datetime.utcnow(),
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

    @staticmethod
    def AddComment(Bid,comment,User):
        comment.update({
            'Uid':User.id,
            'username':User.name,
            'date':datetime.datetime.utcnow(),
            'replys':[],
            'likes':0,
            'liked':[],
            'dis':0,
            'disd':[]
        })
        if db.db.blogs.update_one({'_id':ObjectId(Bid)},
        {'$push':{'comments':comment},'$inc':{'commentCtr':1}}).modified_count >=1:
            return Blogs.Blog(Bid)
        return 'failed'

    @staticmethod
    def AddReply(Bid,reply,IdDate,Uid,username):
        reply.update({
            'Uid':Uid,
            'username':username,
            'date':datetime.datetime.utcnow()
        })

        if db.db.blogs.update_one({'_id':ObjectId(Bid),'comments.date':parse_datetime(IdDate)},
        {'$push':{'comments.$.replys':reply}}).modified_count >=1:
            return Blogs.Blog(Bid)
        return 'failed'

    def __init__(self):
        pass

    # def __repr__(self):
    #     pass
