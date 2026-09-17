# Lexical Analyzer

A small, stateless lexical analyzer with a FastAPI backend and a Vite/React frontend. The backend scans source text using a deterministic finite automaton and exposes the resulting lexemes over JSON.

## Project Layout

- `backend/` - FastAPI service, DFA engine, and pytest tests.
- `frontend/` - React + Vite user interface.

## Backend Setup

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The API is available at `http://localhost:8000`.

## Frontend Setup

```powershell
cd frontend
npm install
npm run dev
```

The frontend expects the API at `http://localhost:8000` by default. Set `VITE_API_URL` to use another API origin.

## API Endpoints

### `POST /api/analyze`

Request:

```json
{"source_code":"for count = 10;"}
```

Response:

```json
{
	"lexemes": [
		{"lexeme": "for", "token_type": "KEYWORD", "line": 1, "column": 1}
	],
	"errors": []
}
```

### `GET /api/tokens`

Returns the recognized token type names.

## Development

Run backend tests from `backend` with `pytest`.

The project is intentionally stateless and does not use a database, Docker, or external state manager.