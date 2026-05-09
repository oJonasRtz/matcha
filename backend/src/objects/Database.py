import psycopg2
import os
from contextlib import closing
	
class Database:
	
	@staticmethod
	def _get_connection():
		return psycopg2.connect(
			host=os.getenv("DB_HOST"),
			dbname=os.getenv("DB_NAME"),
			user=os.getenv("DB_USER"),
			password=os.getenv("DB_PASSWORD"),
			port=5432
		)
		
	@classmethod
	def run_query(cls, query: str, params: tuple = None, fetch_one: bool = False, fetch_all: bool = False):
		"""
    Executes a SQL query with optional parameters and fetch options.

    Args:
        query (str): SQL query to execute.
            Example: "SELECT * FROM users WHERE id = %s"
        params (tuple, optional): Query parameters.
            Example: (1,)
        fetch_one (bool): Return a single row.
        fetch_all (bool): Return all rows.

    Returns:
    	tuple | list | None:
            - tuple → if fetch_one=True
            - list → if fetch_all=True
            - None → for INSERT/UPDATE/DELETE
    """
		with closing(cls._get_connection()) as con:
			with closing(con.cursor()) as cur:
				try:
					cur.execute(query, params)
					result = None
					if fetch_one:
						result = cur.fetchone()
					if fetch_all:
						result = cur.fetchall()
					con.commit()
					return result
				except Exception:
					con.rollback()
					raise