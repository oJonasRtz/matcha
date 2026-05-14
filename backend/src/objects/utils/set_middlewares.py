import os
from flask import Flask, jsonify, request, g
import src.endpoints.utils.logout as logout
import jwt
from src.endpoints.controlers.User import UserController
from src.endpoints.controlers.Session import SessionController

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
        
    @app.before_request
    def validator():
        # <route, method>: validator_function
        # validade return should be
        #   data[the request body, if applied]
        #   error[if something happens]
        val = {
            "/sessions/login": SessionController.login_validator,
            "/sessions/logout": None,  # No validation needed for logout since it just checks the token
            "/user/register": UserController.register_validator,
        }
        
        route = request.path
        if route not in val:        
            return jsonify({"error": "Validator not found"}), 500    
        
        validate = val[route]
        if validate is None:
            return None
        
        data, error = validate()
        if error:
            return jsonify({"error": error}), 400
        
        g.body = data
        
        return None
