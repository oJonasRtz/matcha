from flask import jsonify
from src.endpoints.utils.get_body import get_body
from src.objects.Database import Database
from src.endpoints.utils.check_strong_password import is_strong_password
import bcrypt

class public_routes:
	__ROUTES = [
		('/health', "_health", ["GET"], "health"),
		('/register', "_register", ["POST"], "register"),
		('/login', "_login", ["POST"], "login")
	]

	@classmethod 
	def get_routes(cls):
		prefixed = []
		
		for endpoint, function, methods, function_name in cls.__ROUTES:
			func = getattr(cls, function, None)
			if not func:
				raise ValueError(f"Function '{function}' not found in public_routes class")
			prefixed.append((f"/public{endpoint}", func, methods, function_name))
		
		return prefixed
		  
	@staticmethod  
	def _health():
		return jsonify({"status": "ok"}), 200
	
	@staticmethod
	def _register():
		data, error = get_body(
			required_fields=[
       			"username",
          		"password",
            	"email",
             	"firstname",
              	"lastname",
               	"gender"
            ],
			optional_fields={
				"sexual_orientation": "bisexual",
			}
		)
		if error:
			return jsonify({"error": error}), 400
		
		#strong password check
		password = data["password"]
		if not is_strong_password(password):
			return jsonify({"error": "Weak password."}), 400
		hashed_password = bcrypt.hashpw(
				password.encode('utf-8'),
				bcrypt.gensalt()
			).decode('utf-8')

		try:
			user = Database.run_query(
				"""
				INSERT INTO users (username, email, firstname, lastname, gender, sexual_orientation)
				VALUES (%s, %s, %s, %s, %s, %s)
				RETURNING id, public_id
    			""",
				(
					data["username"],
					data["email"],
					data["firstname"],
					data["lastname"],
					data["gender"],
					data["sexual_orientation"]
				),
				fetch_one=True
			)

			user_id = user[0]
			public_id = user[1]
   
			Database.run_query(
				"""
    			INSERT INTO auth (user_id, password_hash)
				VALUES (%s, %s)
       			""",
				(
					user_id,
					hashed_password
				)
			)
		except Exception:
			return jsonify({"error": "Registration failed."}), 400

		return jsonify({
			"message": "User registered successfully.",
			"user_id": public_id,
		}), 201
	
	@staticmethod
	def _login():
		pass
