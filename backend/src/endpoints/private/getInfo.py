import os
import psycopg2
from flask import jsonify

def get_connection():
    return psycopg2.connect(
		host=os.getenv("DB_HOST"),
		dbname=os.getenv("DB_NAME"),
		user=os.getenv("DB_USER"),
		password=os.getenv("DB_PASSWORD"),
		port=5432
	)

#test route for database connection and API functionality
def get_info():
	con = get_connection()
	cur = con.cursor()
 
	cur.execute("SELECT user_id, username, age FROM users")
	rows = cur.fetchall()
	
	cur.close()
	con.close()
 
	result = []
	for row in rows:
		result.append({
			"user_id": row[0],
			"username": row[1],
			"age": row[2]
		})
  
	return jsonify({"users": result}), 200