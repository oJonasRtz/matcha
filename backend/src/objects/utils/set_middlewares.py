import os
from flask import Flask, jsonify, request, g
import src.endpoints.utils.logout as logout
import jwt

def set_middlewares(app, pub_routes):
    if not app or not isinstance(app, Flask) or not isinstance(pub_routes, list):
        raise ValueError("Expected a Flask app instance")
    
    
    JWT_SECRET = os.getenv("JWT_SECRET")
    JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
    if not JWT_SECRET or JWT_SECRET == "":
        raise RuntimeError("JWT_SECRET not set in environment variables")
    
    @app.before_request
    def global_middleware():
        path = request.path
        
        # -- Public routes --
        if any(path.startswith(route) for route, _, _, _ in pub_routes):
            g.user = None
            return
        
        # -- Private Routes --
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Unauthorized"}), 401
        
        parts = auth_header.split()
        if len(parts) != 2:
            return jsonify({"error": "Unauthorized"}), 401
            
        token = parts[1]
        
        try:
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            g.user = {
                "public_id": payload.get("public_id"),
            }
        except jwt.ExpiredSignatureError:
            logout.logout()  # Invalidate the token in the database
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        