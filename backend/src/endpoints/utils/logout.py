from flask import g, jsonify
from src.objects.Database import Database


def logout(role: str | None = None, public_id: str | None = None):
	try:
		user_id = public_id or g.user.get("public_id")
		user_role = role
		if user_role is None and g.user:
			user_role = g.user.get("role")

		if user_role == "mod":
			Database.run_query(
				"""
				UPDATE moderators
				SET is_online = FALSE, last_online = NOW()
				WHERE public_id = %s
				""",
				(user_id,)
			)
		else:
			Database.run_query(
				"""
				UPDATE users
				SET is_online = FALSE, last_online = NOW()
				WHERE public_id = %s
				""",
				(user_id,)
			)
		g.user = None
  
		return jsonify({"message": "Logged out successfully"}), 200
	except:
		return jsonify({"error": "Invalid token"}), 401
