from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.services.ollama_service import optimize_prompt
from app.models.prompts_model import PromptRequest
from app.routes.regex_routes import router as regex_router

app = FastAPI()
app.include_router(regex_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Hello from DevMate Backend!"
    }

@app.post("/optimize")
def optimize(request: PromptRequest):
    result = optimize_prompt(
        request.user_prompt,
        request.category
    )
    return result