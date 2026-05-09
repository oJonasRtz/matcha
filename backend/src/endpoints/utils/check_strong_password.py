
def is_strong_password(password: str) -> bool:
	"""
	Checks if the provided password is strong based on the following criteria:
	- At least 8 characters long
	- Contains at least one uppercase letter
	- Contains at least one lowercase letter
	- Contains at least one digit
	- Contains at least one special character from the set !@#$%^&*()-_=+[]{}|;:'",.<>?/
	
	@param password: The password string to check.
	@return: True if the password is strong, False otherwise.
	"""
	return (
		len(password) >= 8
		and any(c.isupper() for c in password)
		and any(c.islower() for c in password)
		and any(c.isdigit() for c in password)
		and any(c in "!@#$%^&*()-_=+[]{}|;:'\",.<>?/" for c in password)
	)