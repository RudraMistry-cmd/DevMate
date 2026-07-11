from pydantic import BaseModel

class ReadmeRequest(BaseModel):
    project_name: str
    project_description: str
    features: list[str]
    tech_stack: list[str]
    installation: str
    usage: str
    future_improvements: list[str]
    license: str