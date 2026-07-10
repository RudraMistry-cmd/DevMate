from pydantic import BaseModel

class PromptRequest(BaseModel):
    user_prompt: str
    category: str