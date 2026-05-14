from flask import request
from typing import Any

# required_fields: list of required fields in the body
#   - it will return an error if any of these fields are missing or null

# optional_fields: dict of optional fields with their default values
#   - it will set the field to the default value if it's missing or null

def get_body(required_fields: list[str], optional_fields: dict[str, Any] = None):
    data = request.get_json()
    
    if not data:
        return None, f"Invalid JSON body"
    
    result = {}
    
    #required
    for field in required_fields:
        if field not in data or data[field] is None:
            return None, f"Missing required field: {field}"
        result[field] = data[field]

    #optional
    if optional_fields:
        for field, default_value in optional_fields.items():
            result[field] = data.get(field, default_value)

    return result, None
