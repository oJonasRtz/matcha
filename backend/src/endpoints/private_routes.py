from flask import jsonify, request
from src.objects.Database import Database
import jwt
from src.endpoints.utils.generate_jwt import JWT_SECRET, JWT_ALGORITHM, JWT_EXP_DELTA_HOURS

class private_routes:
	_ROUTES = [
		("/logout", "_logout", ["POST"], "logout"),
	]
	
	@classmethod
	def get_routes(cls):
		routes = []
  
		for endpoint, function, methods, function_name in cls._ROUTES:
			func = getattr(cls, function, None)
			if not func:
				raise ValueError(f"Function '{function}' not found in private_routes class")	
			routes.append((endpoint, func, methods, function_name))
		return routes

	@staticmethod
	def _logout():
		#under development, it can fail sometimes, but it will be fixed in the future
		auth_header = request.headers.get('Authorization')
		if not auth_header or not auth_header.startswith("Bearer "):
			return jsonify({"error": "Unauthorized"}), 401

		token = auth_header.split(" ")[1]
		try:
			payload = jwt.decode(token, str(JWT_SECRET), algorithms=[JWT_ALGORITHM])
			public_id = payload.get("public_id")
			Database.run_query(
				"""
    			UPDATE users
				SET is_online = FALSE, last_online = NOW()
				WHERE public_id = %s
       			""",
				(public_id,)
			)

			return jsonify({"message": "Logged out successfully"}), 200
		except Exception as e:
			return jsonify({"error": "Invalid token"}), 401
