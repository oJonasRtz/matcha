import os
from dotenv import load_dotenv
from flask import jsonify, request, Flask

def set_middlewares(app):
        if not app or not isinstance(app, Flask):
            raise ValueError("Expected a Flask app instance")	
        
        load_dotenv()
        
        #API_KEY checker
        API_KEY = os.getenv("API_KEY")
        @app.before_request
        def check_api_key():
            public_routes = ['/public']
            
            if any(request.path.startswith(p) for p in public_routes):
                return None
            
            client_key = request.headers.get("X-API-KEY")
            if not client_key:
                return jsonify({"error": "API key is missing"}), 401
            
            if client_key != API_KEY:
                return jsonify({"error": "Invalid API key"}), 403