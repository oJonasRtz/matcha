from flask import jsonify, request
from app import app
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("API_KEY")

@app.before_request
def check_api_key():
    public_routes = ['/health']
    
    if request.path in public_routes:
        return None
    
    client_key = request.headers.get("X-API-KEY")
    if not client_key:
        return jsonify({"error": "API key is missing"}), 401
    
    if client_key != API_KEY:
        return jsonify({"error": "Invalid API key"}), 403