from flask import Flask, jsonify, request
from src.objects.Routes import Routes
from src.objects.utils.set_middlewares import set_middlewares

class Server:
    def __init__(self):
        self.app = Flask(__name__)
        self.routes = Routes()
        
        set_middlewares(self.app)
        self._set_upload_limit(10)
        self.routes.load_routes(self.app)
        self._set_error_handlers()

    def _set_upload_limit(self, limit_mb):
        self.app.config['MAX_CONTENT_LENGTH'] = limit_mb * 1024 * 1024
    
    def _set_error_handlers(self):
        @self.app.errorhandler(413)
        def handle_file_too_large():
            return jsonify({"error": f"File is too large. Maximum size is {self.app.config['MAX_CONTENT_LENGTH'] // (1024 * 1024)} MB"}), 413
    
    def run(self, host="", port=5000, ssl_context=None):
        self.app.run(host=host, port=port, ssl_context=ssl_context)
