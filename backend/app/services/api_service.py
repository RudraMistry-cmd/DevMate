import requests
import time

def send_requests(request):
    start_time = time.time()
    try:
        response = requests.request(
            method = request.method,
            url = request.url,
            headers = request.headers,
            data = request.body
        )
        end_time = time.time()
        response_time = round((end_time - start_time) * 1000, 2)
        return {
            "status": response.status_code,
            "time": response_time,
            "body": response.text
        }
    except Exception as e:
        return {
            "error": str(e),
        }