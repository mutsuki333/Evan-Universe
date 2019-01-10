from flask import Flask, Blueprint, session, jsonify
from flask_login import LoginManager
from flask_cors import CORS

import sys

LOGINVIEW='http://localhost:8080/auth/login'

app = Flask(__name__)
app.config.update(
    DEBUG=True,
    SECRET_KEY=b'\x92d\xf2\xae\x03g\xb7\xa0O\xac[D\x13\x08\x1a\x94'
)

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

# set user_loader
from models.User import User
login_manager = LoginManager(app)
login_manager.login_view=LOGINVIEW
@login_manager.user_loader
def load_user(id):
    user = User.load(id)
    return user

# register blueprints
from blueprints.site import site
app.register_blueprint(site)
from blueprints.resource import resource
app.register_blueprint(resource)
from blueprints.game import game
app.register_blueprint(game)
from blueprints.announce import announce
app.register_blueprint(announce)

@app.route('/')
def index():
    return '<h1>Welcome to The Evan Universe!</h1><br>'

if __name__ == '__main__':
    CORS(app,supports_credentials=True)
    app.run(host='0.0.0.0',port=5000)
