from fastapi import APIRouter
from app.models.api_model import apiRequest
from app.services.api_service import send_requests

router = APIRouter()

@router.post("/api")
def api_request(request: apiRequest):
    return send_requests(request)