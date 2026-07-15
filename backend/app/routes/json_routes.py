from fastapi import APIRouter
from app.models.json_model import JSONRequest
from app.services.json_service import process_json

router = APIRouter()

@router.post("/json")
def json_request(request: JSONRequest):
    return process_json(request.text, request.action)