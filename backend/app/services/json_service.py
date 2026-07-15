import json


def process_json(text, action):
    try:
        parsed = json.loads(text)

        if action == "format":
            output = json.dumps(parsed, indent=4)
        elif action == "minify":
            output = json.dumps(parsed, separators=(",", ":"))
        elif action == "validate":
            output = "Valid JSON"
        else:
            output = json.dumps(parsed, indent=4)

        return {
            "success": True,
            "output": output,
        }

    except json.JSONDecodeError as e:
        return {
            "success": False,
            "error": str(e),
        }
