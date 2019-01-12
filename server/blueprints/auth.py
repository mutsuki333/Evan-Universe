from flask import Flask, url_for, request, redirect, Blueprint, jsonify
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user, login_required

from models.User import User

auth = Blueprint('auth', __name__, url_prefix='/auth')


@auth.route('/')
def home():
    return 'Not in my house!'


@auth.route('/logout')
def logout():
    logout_user()
    return 'logged out!'

@auth.route('/update', methods=['GET', 'POST'])
@login_required
def update():
    data = request.form or request.get_json()
    current_user.update_profile(data)
    current_user.reload()
    return jsonify(current_user.user_obj())
    return 'success'

@auth.route('/reload')
@login_required
def reload():
    return jsonify(current_user.user_obj())

@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        if current_user.is_authenticated:
            # return jsonify(current_user.get_user_obj())
            return 'is logged in'
        data = request.form or request.get_json()
        if User.exsitEmail(data.get('email')):
            return 'email used'
        if User.exsitName(data.get('name')):
            return 'name used'
        auth_type = request.args.get('auth_type') or 'basic'
        user = User(
            name=data['name'],
            real_name=data['real_name'],
            email=data['email'],
            auth_type=auth_type
        )
        user.set_password(data.get('password'))
        user.add_user()
        return jsonify(user.user_obj())
        return 'success'
    return 'login require'

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        if current_user.is_authenticated:
            return 'is logged in'
        data = request.form or request.get_json()
        user = User.filter(data.get('email'))
        if user is None or not user.check_password(data.get('password')):
            return 'Invalid username or password'
        user.login()
        login_user(user, remember=True)
        # return 'success'
        return jsonify(user.user_obj())
    return 'login require'

@auth.route('auth_type')
def auth_type():
    # print('current user: {}'.format(current_user))
    return jsonify({'auth_type' :current_user.is_authenticated and current_user.auth_type or 'unauthorized'})
