import os
from flask import jsonify, request, Flask, g
import jwt

def set_middlewares(app):
    '''
Sets global middlewares for the Flask app, including:
- JWT validation for private routes (non-public)
private routes must include a valid JWT in the "Authorization"

request exemple:
GET https://backend:5000/login 
Headers:
- Authorization: Bearer valid_jwt_token
    '''
    if not app or not isinstance(app, Flask):
        raise ValueError("Expected a Flask app instance")	
        
    JWT_SECRET = os.getenv("JWT_SECRET")
    if not JWT_SECRET:
        raise RuntimeError("JWT_SECRET not set in environment variables")
    
    @app.before_request
    def global_middleware():
        path = request.path
        
        # -- Public routes --
        if path.startswith("/public"):
            return
        
        # -- Private routes -- JWT validation
        auth_header = request.headers.get("Authorization")
        
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Unauthorized"}), 401
        
        parts = auth_header.split()
        if len(parts) != 2 or parts[0] != "Bearer":
            return jsonify({"error": "Unauthorized"}), 401
        
        token = parts[1]
        
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
            g.user = payload 
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
