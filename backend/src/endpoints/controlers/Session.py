from flask import jsonify, g
from src.endpoints.utils.get_body import get_body
from src.objects.Database import Database
import bcrypt
from src.endpoints.utils.generate_jwt import generate_jwt
from src.endpoints.utils.logout import logout

class SessionController:
	@classmethod
	def get_public_routes(cls):
		return [
			("/sessions/login", cls._login, ["POST"], "login")
		]

	@classmethod
	def get_private_routes(cls):
		return [
			("/sessions/logout", cls._logout, ["POST"], "logout")
		]
	
	@staticmethod
	def _login():
		data = g.body

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

	@staticmethod
	def login_validator(req):
		data, error = get_body(
			required_fields=[
				"username",
				"password"
			]
		)
  
		if error:
			return None, error

		return data, None

	@staticmethod
	def _logout():
		return logout()
