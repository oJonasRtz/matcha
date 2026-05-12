from flask import jsonify, request, g
from src.objects.Database import Database
import jwt

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
		try:
			public_id = g.user.get("public_id")
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
