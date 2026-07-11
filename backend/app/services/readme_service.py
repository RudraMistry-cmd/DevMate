import json
from ollama import Client
from app.config import OLLAMA_MODEL, OLLAMA_URL
from app.prompts.system_prompts import README_PROMPT

client = Client(host=OLLAMA_URL)

def build_readme(request):

    readme = f"""# {request.project_name}

{request.project_description}

## 🚀 Features

"""

    for feature in request.features:
        readme += f"- {feature}\n"

    readme += "\n## 🛠️ Tech Stack\n\n"

    for tech in request.tech_stack:
        readme += f"- {tech}\n"

    readme += f"""

## ⚙️ Installation

{request.installation}

## ▶️ Usage

{request.usage}

## 🔮 Future Improvements

"""

    for improvement in request.future_improvements:
        readme += f"- {improvement}\n"

    readme += f"""

## 📄 License

{request.license}
"""

    return readme

def improve_readme(request):
    raw_readme = build_readme(request)
    prompt = f"""
    {README_PROMPT}

    README:

    {raw_readme}
    """
    try:
        response = client.chat(
            model=OLLAMA_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": README_PROMPT,
                },
                {
                    "role": "user",
                    "content": raw_readme,
                },
            ],
        )
        return response["message"]["content"]
    
    except (RuntimeError, ValueError, KeyError, TypeError, json.JSONDecodeError):
        return {
            "readme": raw_readme,
            "warning": "The local AI service was unavailable, so the README was returned unchanged."
        }

def generate_readme(request):
    return improve_readme(request)