import jwt
import os
import datetime

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = "HS256"
JWT_EXP_DELTA_HOURS = 2

def generate_jwt(public_id: str):
    payload = {
		"public_id": public_id,
		"exp": datetime.datetime.utcnow() + datetime.timedelta(hours=JWT_EXP_DELTA_HOURS)
	}
    secret = str(JWT_SECRET)
    return jwt.encode(payload, secret, algorithm=JWT_ALGORITHM)
