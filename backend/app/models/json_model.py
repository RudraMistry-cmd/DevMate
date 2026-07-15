from pydantic import BaseModel

class JSONRequest(BaseModel):
    text: str
    action: str