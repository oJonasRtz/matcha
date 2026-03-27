
class private_routes:
	_ROUTES = []
	
	@classmethod
	def get_routes(cls):
		routes = []
  
		for endpoint, function, methods, function_name in cls._ROUTES:
			func = getattr(cls, function, None)
			if not func:
				raise ValueError(f"Function '{function}' not found in private_routes class")	
			routes.append((endpoint, func, methods, function_name))
		return routes