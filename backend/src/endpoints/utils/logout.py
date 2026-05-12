from flask import g, jsonify
from src.objects.Database import Database

def logout():
	try:
		id = g.user.get("public_id")
		Database.run_query(
			"""
			UPDATE users
			SET is_online = FALSE, last_online = NOW()
			WHERE public_id = %s
			""",
			(id,)
		)
		g.user = None
  
		return jsonify({"message": "Logged out successfully"}), 200
	except:
		return jsonify({"error": "Invalid token"}), 401
