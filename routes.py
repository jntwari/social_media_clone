from app import app, db
from models import Users, Tweet
from werkzeug.security import generate_password_hash, check_password_hash
from auth import generateToken, authorize
from flask import request, jsonify
from datetime import datetime



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
        total_tweets = len(tweets)

        return jsonify({ 'tweets': tweets, 'totalTweets': total_tweets}), 200
    else:
        return jsonify({'message': 'Anauthorized access'}), 404


@app.route('/profile', methods=['POST'])
def get_user_profile():
    userName = None,
    userName = request.get_json()['username']
    if userName:
        user = Users.query.filter_by(username = userName).first()
        
        if not user:
            return jsonify({'message': 'invalid user'}), 404
        else:
            userId = user.id
            tweets = Tweet.query.filter_by(user_id = userId).all()
            followed_by = user.followed_by.all()
            followees = user.following.all()

            profile_info = {
                'fullNames': user.name,
                'handle': user.username,
                'tweets': tweets,
                'followers': followed_by,
                'followees': followees
            }

            return jsonify(profile_info), 200 


#this is the follow method 
@app.route('/follow', methods=['POST'])
def follow():
    auth_header = request.headers.get('Authorization')
    authenticate_id = authorize(auth_header)
    if  authenticate_id != - 1:
        username = request.get_json()['username']

        follower = Users.query.filter_by(id = authenticate_id).first()
        user_to_follow = Users.query.filter_by(username = username).first()

        follower.following.append(user_to_follow)

        db.session.commit()

        return jsonify({'message': 'success'}), 200
    else:
        return jsonify({'message': 'success'}), 404

