from flask import Flask, Blueprint, session, jsonify
from flask_login import LoginManager
from flask_cors import CORS
from flask.json import JSONEncoder
from datetime import date

import sys

LOGINVIEW='http://54.71.220.94/Evan-Universe/auth/login'

app = Flask(__name__)
app.config.update(
    DEBUG=True,
    SECRET_KEY=b'\x92d\xf2\xae\x03g\xb7\xa0O\xac[D\x13\x08\x1a\x94'
)

class CustomJSONEncoder(JSONEncoder):

    def default(self, obj):
        try:
            if isinstance(obj, date):
                return obj.isoformat()
            iterable = iter(obj)
        except TypeError:
            pass
        else:
            return list(iterable)
        return JSONEncoder.default(self, obj)

app.json_encoder = CustomJSONEncoder

# initialize database
from models.User import db as user_db
user_db.init_app(app,uri='mongodb://localhost:27017/evan_universe')
from blueprints.resource import imgdb as resource_imgdb, rdb as resource_rdb
resource_imgdb.init_app(app,uri='mongodb://localhost:27017/img')
resource_rdb.init_app(app,uri='mongodb://localhost:27017/evan_universe')
from blueprints.game import db as game_db
game_db.init_app(app, uri='mongodb://localhost:27017/evan_universe')
from blueprints.announce import db as announce_db
announce_db.init_app(app, uri='mongodb://localhost:27017/evan_universe')
from models.Blogs import db as blogs_db
blogs_db.init_app(app, uri='mongodb://localhost:27017/evan_universe')

# set user_loader
from models.User import User
login_manager = LoginManager(app)
login_manager.login_view=LOGINVIEW
@login_manager.user_loader
def load_user(id):
    user = User.load(id)
    return user

# register blueprints
from blueprints.auth import auth
app.register_blueprint(auth)
from blueprints.resource import resource
app.register_blueprint(resource)
from blueprints.game import game
app.register_blueprint(game)
from blueprints.announce import announce
app.register_blueprint(announce)
from blueprints.blog import blog
app.register_blueprint(blog)

@app.route('/')
def index():
    return '<h1>Welcome to The Evan Universe!</h1><br>'

if __name__ == '__main__':
    CORS(app,supports_credentials=True)
    app.run(host='0.0.0.0',port=5000)
