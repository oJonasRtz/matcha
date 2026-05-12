import jwt
import os
import datetime

def generate_jwt(public_id: str):
	JWT_SECRET = os.getenv("JWT_SECRET")
	JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
	JWT_EXP_DELTA_HOURS = int(os.getenv("JWT_EXP_HOURS", "1"))
	
	payload = {
		"public_id": public_id,
		"exp": datetime.datetime.utcnow() + datetime.timedelta(hours=JWT_EXP_DELTA_HOURS)
	}
	secret = str(JWT_SECRET)
	return jwt.encode(payload, secret, algorithm=JWT_ALGORITHM)
