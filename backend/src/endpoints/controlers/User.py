import bcrypt
from src.endpoints.utils.get_body import get_body
from src.endpoints.utils.check_strong_password import is_strong_password
from src.objects.Database import Database
from flask import jsonify
from src.endpoints.utils.generate_jwt import generate_jwt

class UserController:
	@classmethod
	def get_public_routes(cls):
		return [
			("/user/register", cls._register, ["POST"], "register"),
		]
  
	@classmethod
	def get_private_routes(cls):
		return []

	@staticmethod
	def register_validator():
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

		password = data["password"]
		if not is_strong_password(password):
			return jsonify({"error": "Weak password."}), 400
      
		return None

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
		
		password = data["password"]
		hashed_password = bcrypt.hashpw(
				password.encode('utf-8'),
				bcrypt.gensalt()
			).decode('utf-8')

		try:
			user = Database.run_query(
				"""
				WITH new_user AS (
					INSERT INTO users (
						username,
						email,
						firstname,
						lastname,
						gender,
						sexual_orientation
					)
					VALUES (%s, %s, %s, %s, %s, %s)
					RETURNING id, public_id
				)
				INSERT INTO auth (user_id, password_hash)
				SELECT id, %s
    			FROM new_user
				RETURNING (SELECT public_id FROM new_user)
	   			""",
				(
					data["username"],
					data["email"],
					data["firstname"],
					data["lastname"],
					data["gender"],
					data["sexual_orientation"],
					hashed_password
				),
				fetch_one=True
			)
			public_id = user[0]
			token = generate_jwt(public_id)
			return jsonify({"token": token}), 201
		except Exception:
			return jsonify({"error": "Something went wrong."}), 400
      
		
