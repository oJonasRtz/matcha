from flask import jsonify
from src.endpoints.utils.get_body import get_body
from src.objects.Database import Database
from src.endpoints.utils.check_strong_password import is_strong_password
import bcrypt
from src.endpoints.utils.generate_jwt import generate_jwt

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
		data, error = get_body(
			required_fields=[
				"username",
				"password"
			]
		)
		if error:
			return jsonify({"error": error}), 400

		try:
			user = Database.run_query(
				"""
    			SELECT u.id, u.public_id, a.password_hash, u.is_online
				FROM users u
				JOIN auth a ON u.id = a.user_id
				WHERE u.username = %s
       			""",
				(data["username"],),
				fetch_one=True
			)
			if not user:
				return jsonify({"error": "Invalid username or password."}), 401

			user_id, public_id, password_hash, is_online = user

			# if is_online:
			# 	return jsonify({"error": "User is already logged in."}), 400
   
			if not bcrypt.checkpw(data["password"].encode('utf-8'), password_hash.encode('utf-8')):
				return jsonify({"error": "Invalid username or password."}), 401
			
			Database.run_query(
				"""
    			UPDATE users
				SET is_online = TRUE, last_online = NOW()
				WHERE id = %s
	   			""",
				(user_id,)
			)
   
			token = generate_jwt(public_id)
			return jsonify({
				"message": "Login successful.",
				"token": token
			}), 200
		except Exception as e:
			return jsonify({"error": f"Login failed. {str(e)}"}), 400
