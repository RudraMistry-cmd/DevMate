from fastapi import APIRouter
from app.services.prompt_service import optimize_prompt
from app.models.prompts_model import PromptRequest

router = APIRouter()


@router.post("/prompt")

def optimize(request: PromptRequest):
    result = optimize_prompt(
        request.user_prompt,
        request.category
    )
    return result