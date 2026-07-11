from pydantic import BaseModel

class RegexRequest(BaseModel):
    input_text: str
    regex_pattern: str
    global_flag: bool
    ignore_case: bool
    multiline: bool