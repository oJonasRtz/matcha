from flask import Flask, jsonify, request
from werkzeug.exceptions import RequestEntityTooLarge
from src.loadRoutes import load_routes

app = Flask(__name__)

#upload limits
limit = 10  #in MB
app.config["MAX_CONTENT_LENGTH"] = limit * 1024 * 1024

load_routes(app)

@app.errorhandler(RequestEntityTooLarge)
def handle_file_too_large(e):
    return jsonify({"error": f"File is too large. Maximum size is {limit} MB"}), 413

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        ssl_context=(
            "/certificates/server.cert",
            "/certificates/server.key"
        )
    )