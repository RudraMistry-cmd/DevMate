from backend.app.services.json_service import process_json
print(process_json('{"name":"DevMate"}', 'format'))
print(process_json('{"name":"DevMate"}', 'validate'))
