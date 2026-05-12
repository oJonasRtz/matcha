import os
from psycopg2.pool import ThreadedConnectionPool
from contextlib import closing


class Database:
	_pool = None
	
	@classmethod
	def init_pool(cls):
		if cls._pool is None:
			cls._pool = ThreadedConnectionPool(
				minconn=2,
				maxconn=10,
				host=os.getenv("DB_HOST"),
				dbname=os.getenv("DB_NAME"),
				user=os.getenv("DB_USER"),
				password=os.getenv("DB_PASSWORD"),
				port=5432
			)
			
	@classmethod
	def get_connection(cls):
		if cls._pool is None:
			cls.init_pool()
		return cls._pool.getconn()

	@classmethod
	def release_connection(cls, conn):
		if cls._pool is not None:
			cls._pool.putconn(conn)
   
	@classmethod
	def run_query(
		cls,
		query: str,
		params: tuple = None,
		fetch_one: bool = False,
		fetch_all: bool = False
	):
		'''
  		Exceute a SQL query with optional parameters and fetch options.
		The connection is automatically released back to the pool after the query is executed.
    	'''
		conn = cls.get_connection()
		try:
			result = cls.execute(conn, query, params, fetch_one, fetch_all)
			conn.commit()
			return result
		except Exception as e:
			conn.rollback()
			raise e
		finally:
			cls.release_connection(conn)
		

	# --- multi query transaction support ---
	@classmethod
	def begin_transaction(cls):
		conn = cls.get_connection()
		conn.autocommit = False
		return conn

	@classmethod
	def execute(
		cls,
		conn,
		query: str,
		params: tuple = None,
		fetch_one: bool = False,
		fetch_all: bool = False
	):
		'''Execute a query within an existing transaction.'''
  
		with conn.cursor() as cur:
			cur.execute(query, params)
			result = None
			if fetch_one:
				result = cur.fetchone()
			elif fetch_all:
				result = cur.fetchall()
			return result

	@classmethod
	def commit(cls, conn):
		conn.commit()

	@classmethod
	def rollback(cls, conn):
		conn.rollback()
  
	@classmethod
	def release(cls, conn):
		cls.release_connection(conn)