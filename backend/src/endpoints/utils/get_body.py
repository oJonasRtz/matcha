from flask import request
from typing import Any

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
