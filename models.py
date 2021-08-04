from app import db
from dataclasses import dataclass
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

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




