@echo off

cd backend

start "" ..\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
echo hello
timeout /t 2 >nul

start http://127.0.0.1:8000