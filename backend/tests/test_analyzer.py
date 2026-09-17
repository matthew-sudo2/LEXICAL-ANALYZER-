from app.core.analyzer import Analyzer
from app.core.tokens import TokenType


def test_analyzes_keywords_identifiers_and_numbers() -> None:
    lexemes, errors = Analyzer().analyze("for count = 10; rate = 2.5")

    assert errors == []
    assert [lexeme.token_type for lexeme in lexemes] == [
        TokenType.KEYWORD, TokenType.IDENTIFIER, TokenType.ASSIGN,
        TokenType.INTEGER, TokenType.SEMICOLON, TokenType.IDENTIFIER,
        TokenType.ASSIGN, TokenType.FLOAT,
    ]


def test_tracks_lines_and_reports_invalid_characters() -> None:
    lexemes, errors = Analyzer().analyze("x\n@ y")

    assert lexemes[1].line == 2
    assert errors[0].value == "@"
    assert errors[0].line == 2
    assert errors[0].column == 1


def test_handles_strings_comments_and_compound_operators() -> None:
    lexemes, errors = Analyzer().analyze('name != "Ada" # greeting')

    assert errors == []
    assert [lexeme.token_type for lexeme in lexemes] == [
        TokenType.IDENTIFIER, TokenType.NOT_EQUAL, TokenType.STRING, TokenType.COMMENT,
    ]