from ollama import Client
from app.config import OLLAMA_MODEL, OLLAMA_URL

client = Client(host=OLLAMA_URL)

def optimize_prompt(user_prompt, category):
    return {
        "optimized_prompt": user_prompt,
        "changes": [
            f"Category selected: {category}"
        ]
    }

