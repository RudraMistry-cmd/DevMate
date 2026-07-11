import json
from ollama import Client
from app.config import OLLAMA_MODEL, OLLAMA_URL
from app.prompts.system_prompts import SYSTEM_PROMPTS

client = Client(host=OLLAMA_URL)


def _fallback_result(user_prompt):
    return {
        "optimized_prompt": user_prompt,
        "changes": [
            "The local AI service was unavailable, so the original prompt was returned unchanged."
        ],
    }


def optimize_prompt(user_prompt, category):
    system_prompt = SYSTEM_PROMPTS.get(category, SYSTEM_PROMPTS["General"])

    try:
        response = client.chat(
            model=OLLAMA_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {
                    "role": "user",
                    "content": user_prompt,
                },
            ],
        )
        content = response["message"]["content"]
        parsed = json.loads(content)
        if not isinstance(parsed, dict):
            raise ValueError("Model response was not a JSON object")
        return parsed
    except (RuntimeError, ValueError, KeyError, TypeError, json.JSONDecodeError):
        return _fallback_result(user_prompt)