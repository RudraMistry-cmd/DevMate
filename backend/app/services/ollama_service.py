import json
from ollama import Client
from app.config import OLLAMA_MODEL, OLLAMA_URL
from app.prompts.system_prompts import SYSTEM_PROMPTS

client = Client(host=OLLAMA_URL)

def optimize_prompt(user_prompt, category):
    system_prompt = SYSTEM_PROMPTS.get(category, SYSTEM_PROMPTS["General"])
    response = client.chat(
        model=OLLAMA_MODEL,
        messages=[
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": user_prompt
            }
        ]
    )

    content = response["message"]["content"]

    parsed = json.loads(content)

    return parsed