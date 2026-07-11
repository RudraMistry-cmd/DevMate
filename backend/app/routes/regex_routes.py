from fastapi import APIRouter
from app.models.regex_model import RegexRequest
from app.services.regex_service import find_matches

router = APIRouter()

@router.post("/regex")
def match_regex(request: RegexRequest):
    return find_matches(request)