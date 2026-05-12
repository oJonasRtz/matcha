from flask import Flask
from src.endpoints.controlers.Session import SessionController
from src.endpoints.controlers.User import UserController
from src.endpoints.controlers.Profiles import ProfileController
from src.endpoints.controlers.Photos import PhotosController
from src.endpoints.controlers.Matches import MatchesController
from src.endpoints.controlers.Chat import ChatController

class Routes:
    def __init__(self):
        self.pub_routes = []
        self.priv_routes = []
        self.controlers = [
            SessionController,
            UserController,
            ProfileController,
            PhotosController,
            MatchesController,
            ChatController
        ]
        
        for controler in self.controlers:
            self.pub_routes.extend(controler.get_public_routes())
            self.priv_routes.extend(controler.get_private_routes())
            
    def get_public_routes(self):
        return self.pub_routes
    
    def get_private_routes(self):
        return self.priv_routes
    
    def load_routes(self, app):
        if not app or not isinstance(app, Flask):
            raise ValueError("Expected a Flask app instance")
        
        for endpoint, function, methods, function_name in self.pub_routes + self.priv_routes:
            app.add_url_rule(
                endpoint,
                function_name,
                function,
                methods=methods
            )
            