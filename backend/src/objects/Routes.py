from src.endpoints.public.health import health
from src.endpoints.private.getInfo import get_info
from flask import Flask

class Routes:
    def __init__(self):
        # Define routes as tuples of (endpoint, function, methods, function_name)
        #public routes start with /public
        self.routes = [
            ('/getInfo', get_info, ["GET"], "get_info"),
            ("/public/health", health, ["GET"], "health")
        ]
        
    def load_routes(self, app):
        if not app or not isinstance(app, Flask):
            raise ValueError("Expected a Flask app instance")
        
        for endpoint, function, methods, function_name in self.routes:
            app.add_url_rule(
                endpoint,
                function_name,
                function,
                methods=methods
            )
