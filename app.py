from datetime import date, datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate, migrate
from sqlalchemy.orm import query
from werkzeug.datastructures import auth_property
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from const import SECRET_KEY
from auth import generateToken, authorize
from sqlalchemy_serializer import SerializerMixin
from dataclasses import dataclass

app = Flask(__name__)
app.config ['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/engage'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True

CORS(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

current_user = ''


#Models section
#---------------------------------------------------------------
@dataclass
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    username = db.Column(db.String(100))
    image = db.Column(db.String(100))
    password = db.Column(db.String(400))
    join_date = db.Column(db.DateTime)

    

@dataclass
class Tweet(db.Model,SerializerMixin ):
    id: int
    user_id: int
    content: str
    date_create: datetime
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    content = db.Column(db.String(400))
    date_create = db.Column(db.DateTime)



#routes section
#-------------------------------------------------------------
@app.route('/register', methods=['POST'])
def register():
    user_data = request.get_json()
    fullname, user_name, password = user_data['full_names'], user_data['user_name'], user_data['password']

    new_user = Users(name=fullname, username=user_name, password = generate_password_hash(password))
  
    db.session.add(new_user)
    db.session.commit()
  
    user_info = {
        'username' : user_name,
        'full_names': fullname,
        'user_id': new_user.id,
        'token' : generateToken(new_user.id)
    }
    print(new_user.id)
    return jsonify(user_info),200


    
@app.route('/login', methods=['POST'])
def login():
    user_data = request.get_json() 
    user_name, password = user_data['user_name'], user_data['password']

    user = Users.query.filter_by(username = user_name).first()
    if not user:
        message = {'message': 'your password or user name is not valid'}
        return jsonify(message), 404
   
    if check_password_hash(user.password , password):
        
        user_info = {
            'username' : user_name,
            'full_names': user.name,
            'id': user.id,
            'token': generateToken(user.id)
        }
        return jsonify(user_info), 200
    else:
        message = {'message': 'your password or user name is not valid'}
        
        return jsonify(message), 404

@app.route('/tweet', methods=['POST'])
def post_tweet():
    auth_header = request.headers.get('Authorization')
    authenticate_id = authorize(auth_header)
    if  authenticate_id != - 1:
        tweet_text = request.get_json()['tweet']
        tweet = Tweet(user_id = authenticate_id, content = tweet_text, date_create=datetime.now())
        print(tweet)
        db.session.add(tweet)
        db.session.commit()


        return jsonify({'message': 'Success'}), 200
    else:
        return jsonify({'message': 'fail'}), 404


@app.route('/tweet', methods=['GET'])
def get_my_tweets():
    auth_header = request.headers.get('Authorization')
    authenticate_id = authorize(auth_header)
    if  authenticate_id != - 1:
        tweets = Tweet.query.filter_by(user_id=authenticate_id).all()
        for tweet in tweets:
            print(tweet.to_dict())
        return jsonify({'tweets': tweets}), 200
    else:
        return jsonify({'message': 'Anauthorized access'}), 404



    


if __name__ == '__main__':
    app.run(debug=True)
    