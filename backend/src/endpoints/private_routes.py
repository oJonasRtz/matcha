from flask import jsonify, request, g
from src.objects.Database import Database
from src.endpoints.utils.logout import logout
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
		return logout()
