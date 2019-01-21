# User data structure:
#     in users:
#     { name real_name password_hash email auth_type ...  //user infos
#       join_date last_login pic
#      notification:[#see announce, ...]
#      games[{name:'xxx',id:'xxx',link:'' }, ...]
#      blogs[ id:'xxx' ],
#      viewedBlog:[{Bid,time}...]
#      last_blog_view:time,
#     }


import re, time, datetime
from flask_login import UserMixin
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

db = PyMongo();

class User(UserMixin):
    # is_active = True
    # is_anonymous = False
    # is_authenticated = True

    def __init__(self,Dict=None ,**kwargs):
        self.games = None
        self.id = None
        self.password_hash = None
        if Dict is None:
            self.__dict__.update(**kwargs)
        else:
            self.__dict__.update(Dict)

    @staticmethod
    def exsitEmail(email):
        if db.db.users.find_one({'email':email}) is None:
            return False
        return True

    @staticmethod
    def exsitName(name):
        if db.db.users.find_one({'name':name}) is None:
            return False
        return True

    @staticmethod
    def load(id):
        doc = db.db.users.find_one({'_id':ObjectId(id)})
        if doc is None:return
        user=User(
            Dict=doc
        )
        user.id=format(doc['_id'])
        return user

    @staticmethod
    def filter(email):
        doc = db.db.users.find_one({'email':email})
        if doc is None:return None
        return User.load(format(doc['_id']))

    @staticmethod
    def addNotification(
            name,
            content=None,
            type="notification",
            link=None,
            fromName=None):
        if name is None or not User.exsitName(name):return 'failed'
        db.db.users.update_one({'name':name},
        {'$push':{'notification':{
            'type':type,
            'content':content,
            'link':link,
            'from':fromName,
            'read':False,
            'emitTime':datetime.datetime.utcnow()
        }}})
        return 'success'

    def login(self):
        db.db.users.update_one({'_id':self._id},{'$set':{'last_login':datetime.datetime.utcnow()}})

    def reload(self):
        doc = db.db.users.find_one({'_id':ObjectId(self.id)})
        self.__dict__.update(doc)
        self.id=format(doc['_id'])
        self.login()

    def user_obj(self):
        obj = self.__dict__
        if obj.get('_id') is not None: obj['_id']=format(obj['_id'])
        obj.pop('password_hash')
        return obj

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def add_user(self):
        self.id=format(
        db.db.users.insert_one({
            'auth_type':self.auth_type,
            'name':self.name,
            'password_hash':self.password_hash,
            'email':self.email,
            'real_name':self.real_name,
            'pic':'http://54.71.220.94/EU/resource/img/?base=img&id_str=5c4306f771ca3d4632f81127',
            'games':[],
            'notification':[],
            'blogs':[],
            'viewedBlog':[],
            'join_date':datetime.datetime.utcnow()
        }).inserted_id)
        return 'success'

    def update_profile(self,dict):
        if dict is not None:
            if dict.get('_id'):dict.pop('_id')
            if len(dict)<1:return'failed'
            db.db.users.update_one({'_id':self._id},{'$set':dict})
            return 'success'
        else: return 'failed'

    def viewBlog(self):
        db.db.users.update_one({'_id':self._id},{'$set':{'last_blog_view':datetime.datetime.utcnow()}})

    def newPost(self,Bid):
        db.db.users.update_one({'_id':self._id},{'$push':{'blogs':Bid}})

    def __repr__(self):
        return 'User class with name {}, id {}'.format(self.name,self.id)
