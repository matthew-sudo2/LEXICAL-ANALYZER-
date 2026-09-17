from pydantic import BaseModel, ConfigDict, Field

from .core.tokens import TokenType


class AnalysisRequest(BaseModel):
    source_code: str = Field(default="", max_length=100_000)


class LexemeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    lexeme: str
    token_type: TokenType
    line: int
    column: int


class AnalysisErrorResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    message: str
    value: str
    line: int
    column: int


class AnalysisResponse(BaseModel):
    lexemes: list[LexemeResponse]
    errors: list[AnalysisErrorResponse]