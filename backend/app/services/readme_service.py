def generate_readme(request):

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

    return {
        "readme": readme
    }