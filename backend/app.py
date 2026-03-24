from flask import Flask, jsonify, request

app = Flask(__name__)

# health check (útil pra debug)
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200

# exemplo de endpoint
@app.route("/api/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello from Flask"}), 200

# exemplo POST
@app.route("/api/echo", methods=["POST"])
def echo():
    data = request.json
    return jsonify({"you_sent": data}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)