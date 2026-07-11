# Prompt++

An AI-powered prompt optimization tool built using FastAPI, JavaScript and Ollama.

## Features

- Prompt optimization
- 10 optimization categories
- Local AI (Ollama)
- FastAPI backend
- Responsive UI

## Tech Stack

- HTML
- CSS
- JavaScript
- FastAPI
- Ollama
- Qwen2.5

## Run

### Backend

1. Open the backend folder.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start Ollama and make sure the model is available. The default model is `qwen2.5:7b`.
4. Start the backend:

```bash
uvicorn app.main:app --reload
```

If needed, override the defaults:

```bash
$env:OLLAMA_URL="http://localhost:11434"
$env:OLLAMA_MODEL="qwen2.5:7b"
```

### Frontend

Open the frontend folder with Live Server or any simple static server.

## Future

- Auto category detection
- Prompt history
- Copy button
- Export