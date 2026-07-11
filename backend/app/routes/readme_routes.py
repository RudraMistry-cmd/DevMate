from fastapi import APIRouter
from app.models.readme_model import ReadmeRequest
from app.services.readme_service import generate_readme

router = APIRouter()


@router.post("/readme")
def create_readme(request: ReadmeRequest):
    return generate_readme(request)