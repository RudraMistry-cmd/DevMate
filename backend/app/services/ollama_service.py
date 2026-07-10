from ollama import Client
from app.config import OLLAMA_MODEL, OLLAMA_URL

client = Client(host=OLLAMA_URL)

def optimize_prompt(user_prompt, category):
    system_prompt = f"""
You are Prompt++.

Rewrite prompts professionally.

Always:

- Improve clarity
- Remove ambiguity
- Add missing context
- Preserve original intent
- Produce structured prompts

Never explain.
Never chat.
Return ONLY the optimized prompt.
"""

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

    optimized = response["message"]["content"]

    return {
        "optimized_prompt": optimized,
        "changes": [
            "Prompt optimized using local AI."
        ]
    }