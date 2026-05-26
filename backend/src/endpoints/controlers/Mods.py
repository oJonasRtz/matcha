from flask import jsonify, g
from src.objects.Database import Database
import bcrypt
from src.endpoints.utils.generate_jwt import generate_jwt

class ModsController:
    @classmethod
    def get_public_routes(cls):
        return [
            ("/mod/login", cls._login, ["POST"], "mod_login"),
        ]
  
    @classmethod
    def get_private_routes(cls):
        return [
            ("/mod/logout", cls._logout, ["POST"], "mod_logout"),
            ("/mod/register", cls._register, ["POST"], "mod_register"),
        ]
    
    @staticmethod
    def _login():
        data = g.body
        query = {
            "email": """
                SELECT id, public_id, password_hash, is_online
                FROM moderators
                WHERE email = %s
            """,
            "username": """
                SELECT id, public_id, password_hash, is_online
                FROM moderators
                WHERE username = %s
            """,
        }

        if data["email"] is None and data["username"] is None:
            return jsonify({"error": "Either username or email is required."}), 400
        
        identifier = "email" if data["email"] is not None else "username"
        try:
            mod = Database.run_query(
                query[identifier],
                (data[identifier],),
                fetch_one=True
            )
            if not mod:
                return jsonify({"error": "Invalid username or password."}), 401

            mod_id, public_id, password_hash, is_online = mod
            if is_online:
                return jsonify({"error": "User already logged in."}), 400

            if not bcrypt.checkpw(data["password"].encode('utf-8'), password_hash.encode('utf-8')):
                return jsonify({"error": "Invalid username or password."}), 401

            token = generate_jwt(public_id, role="mod")
            Database.run_query(
                """
                UPDATE moderators
                SET is_online = TRUE
                WHERE id = %s
                """,
                (mod_id,)
            )
            return jsonify({"token": token}), 200
        except Exception:
            return jsonify({"error": f"Login failed."}), 400
    
    @staticmethod
    def _logout():
        try:
            id = g.user.get("public_id")
            Database.run_query(
                """
                UPDATE moderators
                SET is_online = FALSE, last_online = NOW()
                WHERE public_id = %s
                """,
                (id,)
            )
  
            return jsonify({"message": "Logged out successfully"}), 200
        except:
            return jsonify({"error": "Invalid token"}), 401

    @staticmethod
    def _register():
        return jsonify({"message": "ok"}), 200