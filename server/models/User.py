import re, time
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
    def exsit(email):
        if db.db.users.find_one({'email':email}) is None:
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

    def reload(self):
        doc = db.db.users.find_one({'_id':ObjectId(self.id)})
        self.__dict__.update(doc)
        self.id=format(doc['_id'])

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
            'games':[],
            'join_date':time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
        }).inserted_id)
        return 'success'

    def update_profile(self,dict):
        if dict is not None:
            if dict.get('_id'):dict.pop('_id')
            if len(dict)<1:return'failed'
            db.db.users.update_one({'_id':self._id},{'$set':dict})
            return 'success'
        else: return 'failed'

    def __repr__(self):
        return 'User class with name {}, id {}'.format(self.name,self.id)
