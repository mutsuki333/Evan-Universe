from flask import Flask, Blueprint, session, jsonify

import sys

app = Flask(__name__)
app.config.update(
    DEBUG=True,
    SECRET_KEY=b'\x92d\xf2\xae\x03g\xb7\xa0O\xac[D\x13\x08\x1a\x94'
)

@app.route('/')
def index():
    return '<h1>Welcome to The Evan Universe!</h1><br>'

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000)
