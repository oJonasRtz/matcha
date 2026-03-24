from flask import Flask, jsonify, request
from werkzeug.exceptions import RequestEntityTooLarge

app = Flask(__name__)

#upload limits
limit = 10  #in MB
app.config["MAX_CONTENT_LENGTH"] = limit * 1024 * 1024

@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    # Aqui você pode salvar o arquivo ou processá-lo como quiser
    # Exemplo: file.save(os.path.join("uploads", file.filename))
    return jsonify({"message": f"File '{file.filename}' received successfully"}), 200

@app.errorhandler(RequestEntityTooLarge)
def handle_file_too_large(e):
    return jsonify({"error": f"File is too large. Maximum size is {limit} MB"}), 413

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)