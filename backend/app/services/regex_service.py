import re

def find_matches(request):
    flags = 0
    if request.ignore_case:
        flags |= re.IGNORECASE
    if request.multiline:
        flags |= re.MULTILINE
    try:
        if request.global_flag:
            matches = re.findall(
                request.regex_pattern,
                request.input_text,
                flags
            )
        else:
            match = re.search(
                request.regex_pattern,
                request.input_text,
                flags
            )

            matches = [match.group()] if match else []
        
        return {
            "matches": matches,
            "count": len(matches)
        }
    except re.error as e:
        return {
            "error": str(e),
            "matches": [],
            "count": 0
        }