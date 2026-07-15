# DevMate

DevMate is a lightweight developer toolkit web app with AI-powered utilities and productivity helpers. It combines prompt optimization, regex testing, README generation, API testing, and JSON utilities into a clean frontend with a Python/FastAPI backend.

## Features

- **Prompt++**: Optimize AI prompts and improve output quality.
- **Regex++**: Test regular expressions against input text with real-time results.
- **Readme++**: Generate README content from project details.
- **API++**: Send HTTP requests from the browser and inspect response status, time, and body.
- **JSON++**: Format, minify, and validate JSON quickly.
- **Homepage**: Browse utilities, search, save favorites, and reopen recently used tools.

## Repository Structure

- `backend/`
  - `app/main.py` - FastAPI application entry point.
  - `app/routes/` - FastAPI route modules for each utility.
  - `app/services/` - Business logic for JSON parsing, prompt optimization, regex, README generation, and API testing.
  - `app/models/` - Pydantic models for request validation.
- `frontend/`
  - `index.html` - Main DevMate landing page.
  - `pages/` - Individual utility pages.
  - `css/` - Shared stylesheet and homepage styles.
  - `js/` - Frontend behavior and page scripts.
- `modules/` - Additional utility modules for CLI or developer tools.

## Setup

1. Create and activate a Python environment.

```powershell
cd e:\DevMate
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install backend dependencies.

```powershell
pip install -r backend/requirements.txt
```

3. Run the FastAPI app.

```powershell
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

4. Open the app in your browser:

```text
http://127.0.0.1:8000/
```

## Usage

- Navigate to the homepage to discover utilities.
- Use the search box to filter tools by name.
- Click a utility card to open the tool page.
- Use the JSON, API, prompt, regex, and README utilities directly from the browser.
- Favorites and recently used utilities are stored locally in the browser.

## Frontend Notes

- The app uses plain HTML, CSS, and JavaScript.
- Shared styles are defined in `frontend/css/styles.css`.
- The homepage uses `frontend/css/index.css` for utility card layout.
- Utility behavior is implemented in `frontend/js/*.js` files.

## Backend Notes

- `FastAPI` serves HTML pages and API routes.
- Static assets are mounted under `/css` and `/js`.
- Utility APIs are provided by route modules in `backend/app/routes`.
- JSON parsing, request validation, and AI prompt services are implemented in `backend/app/services`.

## Recommended Improvements

If you want to extend DevMate further, consider:

- Adding authentication and user persistence.
- Persisting favorites across devices with a backend store.
- Supporting more utility tools such as JWT inspectors, hash generators, and UUID builders.
- Improving the prompt optimization pipeline with additional model integrations.

## License

This project is provided as-is. Add a license file if you want to publish it publicly.
