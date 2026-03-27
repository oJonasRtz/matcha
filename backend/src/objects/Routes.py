from flask import Flask
from src.endpoints.public_routes import public_routes
from src.endpoints.private_routes import private_routes


class Routes:
    def __init__(self):
        # Define routes as tuples of (endpoint, function, methods, function_name)
        #public routes start with /public
        self.routes = []
        self.routes.extend(public_routes.get_routes())
        self.routes.extend(private_routes.get_routes())
        
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
