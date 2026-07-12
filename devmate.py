import os
import socket
import subprocess
import time
import webbrowser
import sys

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"


print("=" * 40)
print("🚀 Starting DevMate")
print("=" * 40)

local_ip = get_local_ip()

backend_path = os.path.join(os.getcwd(), "backend")

subprocess.Popen(
    [
        sys.executable,
        "-m",
        "uvicorn",
        "app.main:app",
        "--reload",
        "--host",
        "0.0.0.0",
        "--port",
        "8000",
    ],
    cwd=backend_path,
)

time.sleep(2)

url = "http://127.0.0.1:8000"
webbrowser.open(url)

print()
print("DevMate is running!")
print()
print(f"Local : http://127.0.0.1:8000")
print(f"LAN   : http://{local_ip}:8000")
print()
print("Press Ctrl+C to exit.")

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("\nGoodbye!")