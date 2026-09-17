from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_analyze_endpoint_returns_lexemes_and_errors() -> None:
    response = client.post("/api/analyze", json={"source_code": "if value @ 3"})

    assert response.status_code == 200
    body = response.json()
    assert body["lexemes"][0]["token_type"] == "KEYWORD"
    assert body["errors"][0]["value"] == "@"


def test_tokens_endpoint_returns_all_token_types() -> None:
    response = client.get("/api/tokens")

    assert response.status_code == 200
    assert len(response.json()) == 27
    assert "IDENTIFIER" in response.json()