from ast import mod

from flask import jsonify, g
from src.objects.Database import Database
import bcrypt
from src.endpoints.utils.generate_jwt import generate_jwt
from src.endpoints.utils.check_strong_password import is_strong_password
from src.endpoints.utils.logout import logout

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
            ("/mod/checkToken", cls._check_mod, ["GET"], "mod_check_token"),
        ]
    
    @staticmethod
    def _check_mod():
        user = g.user

        try:
            mod = Database.run_query(
                """
                SELECT public_id
                FROM moderators
                WHERE public_id = %s
                """,
                (user.get("public_id"),),
                fetch_one=True
            )
            if not mod:
                return jsonify({"error": "Invalid moderator."}), 401

            return jsonify({"message": "Moderator is valid."}), 200
        except Exception:
            return jsonify({"error": "Failed to check moderator."}), 400

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
        return logout(role="mod", public_id=g.user.get("public_id"))

    @staticmethod
    def _register():
        data = g.body

        password = data["password"]
        if not is_strong_password(password):
            return jsonify({"error": "Weak password."}), 400
        hashed_password = bcrypt.hashpw(
                password.encode('utf-8'),
                bcrypt.gensalt()
            ).decode('utf-8')
        
        try:
            mod = Database.run_query(
                """
                INSERT INTO moderators (
                    username,
                    email,
                    password_hash,
                    role
                )
                VALUES (%s, %s, %s, %s)
                RETURNING public_id
                """,
                (
                    data["username"],
                    data["email"],
                    hashed_password,
                    data.get("role", "mod")
                ),
                fetch_one=True
            )
            public_id = mod[0]
            token = generate_jwt(public_id, role=data.get("role", "mod"))
            return jsonify({
                "message": "Moderator registered successfully.",
                "token": token
            }), 201
        except Exception as e:
            return jsonify({"error": f"Registration failed."}), 400
        