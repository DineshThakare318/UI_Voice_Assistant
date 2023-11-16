import jwt
import datetime

def generate_jwt_token(secret_key, user):
    payload = {
        "_id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1),
    }
    token = jwt.encode(payload, secret_key, algorithm="HS256")
    return token


def validate_jwt_token(token, secret_key):
    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        # Token has expired
        return None
    except jwt.InvalidTokenError:
        # Invalid token
        return None
