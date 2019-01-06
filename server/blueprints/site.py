from flask import Flask, url_for, request, redirect, Blueprint, jsonify


site = Blueprint('site', __name__, url_prefix='/site')


@site.route('/')
def home():
    return 'Not in my house!'
