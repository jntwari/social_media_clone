import jwt
from const import SECRET_KEY
from datetime import datetime, timedelta

def generateToken(user_id):

    try:
        payload = {
            'exp':datetime.utcnow() + timedelta(hours=12),
            'sub': user_id
        }
        return jwt.encode(
            payload,
            SECRET_KEY,
            algorithm = 'HS256'
        )
    except Exception as e:
        return e


def decodeToken(token):  
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Expired token'
    except jwt.InvalidTokenError:
        return 'Invalid token'


def authorize(auth_header):
    if auth_header:
        auth_token = auth_header.split(' ')[1]
    else:
        auth_token = ' '
    if auth_token:
        resp = decodeToken(auth_token)

        if not isinstance(resp, str):
            return resp
        else:
            return -1