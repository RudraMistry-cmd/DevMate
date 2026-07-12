from fastapi import FastAPI
from app.routes.prompt_routes import router as prompt_router
from app.routes.regex_routes import router as regex_router
from app.routes.readme_routes import router as readme_router
from app.routes.api_routes import router as api_router
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pathlib import Path

app = FastAPI()
BASE_DIR = Path(__file__).resolve().parent.parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"
app.mount("/css", StaticFiles(directory=FRONTEND_DIR / "css"), name="css")
app.mount("/js", StaticFiles(directory=FRONTEND_DIR / "js"), name="js")
app.include_router(prompt_router)
app.include_router(regex_router)
app.include_router(readme_router)
app.include_router(api_router)

@app.get("/")
def home():
    return FileResponse(FRONTEND_DIR / "index.html")

@app.get("/prompt")
def prompt():
    return FileResponse(FRONTEND_DIR / "pages" / "prompt.html")


@app.get("/regex")
def regex_page():
    return FileResponse(FRONTEND_DIR / "pages" / "regex.html")


@app.get("/readme")
def readme_page():
    return FileResponse(FRONTEND_DIR / "pages" / "readme.html")


@app.get("/api-tool")
def api_page():
    return FileResponse(FRONTEND_DIR / "pages" / "api.html")
