from pydantic import BaseModel, Field

from .core.tokens import TokenType


class AnalysisRequest(BaseModel):
    source_code: str = Field(default="", max_length=100_000)


class LexemeResponse(BaseModel):
    lexeme: str
    token_type: TokenType
    line: int
    column: int


class AnalysisErrorResponse(BaseModel):
    message: str
    value: str
    line: int
    column: int


class AnalysisResponse(BaseModel):
    lexemes: list[LexemeResponse]
    errors: list[AnalysisErrorResponse]