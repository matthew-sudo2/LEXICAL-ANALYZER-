from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.analyzer import Analyzer
from .core.tokens import TokenType
from .schemas import AnalysisRequest, AnalysisResponse, LexemeResponse, AnalysisErrorResponse

app = FastAPI(title="Lexical Analyzer API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
analyzer = Analyzer()


@app.post("/api/analyze", response_model=AnalysisResponse)
def analyze_source(request: AnalysisRequest) -> AnalysisResponse:
    lexemes, errors = analyzer.analyze(request.source_code)
    return AnalysisResponse(
        lexemes=[LexemeResponse.model_validate(lexeme) for lexeme in lexemes],
        errors=[AnalysisErrorResponse.model_validate(error) for error in errors],
    )


@app.get("/api/tokens", response_model=list[str])
def list_tokens() -> list[str]:
    return [token.value for token in TokenType]