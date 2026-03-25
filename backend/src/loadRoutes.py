from flask import Flask
from src.endpoints.health import health
from src.endpoints.getInfo import get_info

def load_routes(app):
	if not isinstance(app, Flask):
		raise ValueError("Expected a Flask app instance")

	# {'/endpoint', function, methods=['GET', 'POST'], function_name='endpoint_function'}
	routes = [
		('/getInfo', get_info, ["GET"], "get_info"),
		("/health", health, ["GET"], "health")
	]
 
	for endpoint, function, methods, function_name in routes:
		def make_route(func):
			def route_func(*args, **kwargs):
				return func(*args, **kwargs)
			return route_func
		app.route(endpoint, methods=methods, endpoint=function_name)(make_route(function))