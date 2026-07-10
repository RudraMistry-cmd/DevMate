from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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
def optimize():
    return {
        "optimized_prompt": "This is a dummy optimized prompt.",
        "changes": [
            "Added context",
            "Improved clarity",
            "Specified output format"
        ]
    }