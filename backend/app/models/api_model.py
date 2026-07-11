from pydantic import BaseModel

class apiRequest(BaseModel):
    url: str
    method: str
    headers: dict[str, str]
    body: str