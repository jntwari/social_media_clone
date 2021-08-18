from app import db
from dataclasses import dataclass
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

#Models section
#---------------------------------------------------------------

followers = db.Table('follower',
    db.Column('follower_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('followee_id', db.Integer, db.ForeignKey('users.id')))


@dataclass
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    username = db.Column(db.String(100))
    image = db.Column(db.String(100))
    password = db.Column(db.String(400))
    join_date = db.Column(db.DateTime)

    tweets = db.relationship('Tweet', backref='users', lazy='dynamic')

    following = db.relationship('Users', secondary= followers,
        primaryjoin=(followers.c.follower_id == id),
        secondaryjoin=(followers.c.followee_id == id),
        backref = db.backref('followers', lazy='dynamic'), lazy='dynamic')

    followed_by = db.relationship('Users', secondary= followers,
        primaryjoin=(followers.c.followee_id == id),
        secondaryjoin=(followers.c.follower_id == id),
        backref = db.backref('followers', lazy='dynamic'), lazy='dynamic')
    

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


