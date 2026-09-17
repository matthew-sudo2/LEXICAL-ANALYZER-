from dataclasses import dataclass

from .automaton import Automaton
from .states import State
from .tokens import TokenType


@dataclass(frozen=True)
class Lexeme:
    lexeme: str
    token_type: TokenType
    line: int
    column: int


@dataclass(frozen=True)
class AnalysisError:
    message: str
    value: str
    line: int
    column: int


class Analyzer:
    keywords = {
        "for", "while", "if", "else", "elif", "return", "break", "continue",
        "def", "class", "import", "from", "in", "and", "or", "not", "None",
    }
    boolean_literals = {"True", "False"}
    simple_tokens = {
        "+": TokenType.PLUS, "-": TokenType.MINUS, "*": TokenType.MULTIPLY,
        "/": TokenType.DIVIDE, "%": TokenType.MODULO, "=": TokenType.ASSIGN,
        "(": TokenType.LEFT_PAREN, ")": TokenType.RIGHT_PAREN, "{": TokenType.LEFT_BRACE,
        "}": TokenType.RIGHT_BRACE, "[": TokenType.LEFT_BRACKET, "]": TokenType.RIGHT_BRACKET,
        ",": TokenType.COMMA, ";": TokenType.SEMICOLON, ":": TokenType.COLON,
        ".": TokenType.DOT,
    }
    compound_tokens = {
        "==": TokenType.EQUAL, "!=": TokenType.NOT_EQUAL, "<=": TokenType.LESS_EQUAL,
        ">=": TokenType.GREATER_EQUAL, "<": TokenType.LESS_THAN, ">": TokenType.GREATER_THAN,
    }

    def __init__(self) -> None:
        self.automaton = Automaton()

    def analyze(self, source: str) -> tuple[list[Lexeme], list[AnalysisError]]:
        lexemes: list[Lexeme] = []
        errors: list[AnalysisError] = []
        index = 0
        line = 1
        column = 1
        while index < len(source):
            character = source[index]
            if character.isspace():
                line, column = self._advance(character, line, column)
                index += 1
                continue
            start_line, start_column = line, column
            if character == "#":
                end = source.find("\n", index)
                end = len(source) if end == -1 else end
                value = source[index:end]
                lexemes.append(Lexeme(value, TokenType.COMMENT, line, column))
                column += len(value)
                index = end
                continue
            if character in {'"', "'"}:
                end = index + 1
                while end < len(source) and source[end] != character and source[end] != "\n":
                    end += 1
                if end >= len(source) or source[end] != character:
                    errors.append(AnalysisError("Unterminated string literal", source[index:end], start_line, start_column))
                    line, column = self._advance_text(source[index:end], line, column)
                    index = end
                    continue
                end += 1
                value = source[index:end]
                lexemes.append(Lexeme(value, TokenType.STRING, line, column))
                column += len(value)
                index = end
                continue
            if character.isalpha() or character == "_":
                end = index + 1
                while end < len(source) and (source[end].isalnum() or source[end] == "_"):
                    end += 1
                value = source[index:end]
                state = self.automaton.classify(value)
                token = TokenType.KEYWORD if value in self.keywords else TokenType.BOOLEAN if value in self.boolean_literals else TokenType.IDENTIFIER
                if state is State.INVALIDATION_STATE:
                    errors.append(AnalysisError("Invalid identifier", value, start_line, start_column))
                else:
                    lexemes.append(Lexeme(value, token, line, column))
                column += len(value)
                index = end
                continue
            if character.isdigit():
                end = index + 1
                while end < len(source) and source[end].isdigit():
                    end += 1
                if end < len(source) and source[end] == "." and end + 1 < len(source) and source[end + 1].isdigit():
                    end += 1
                    while end < len(source) and source[end].isdigit():
                        end += 1
                value = source[index:end]
                state = self.automaton.classify(value)
                token = TokenType.FLOAT if state is State.Q6 else TokenType.INTEGER if state is State.Q4 else None
                if token is None:
                    errors.append(AnalysisError("Invalid numeric literal", value, start_line, start_column))
                else:
                    lexemes.append(Lexeme(value, token, line, column))
                column += len(value)
                index = end
                continue
            pair = source[index:index + 2]
            if pair in self.compound_tokens:
                lexemes.append(Lexeme(pair, self.compound_tokens[pair], line, column))
                index += 2
                column += 2
                continue
            if character in self.simple_tokens:
                lexemes.append(Lexeme(character, self.simple_tokens[character], line, column))
                index += 1
                column += 1
                continue
            errors.append(AnalysisError("Invalid character", character, line, column))
            index += 1
            column += 1
        return lexemes, errors

    @staticmethod
    def _advance(character: str, line: int, column: int) -> tuple[int, int]:
        return (line + 1, 1) if character == "\n" else (line, column + 1)

    def _advance_text(self, text: str, line: int, column: int) -> tuple[int, int]:
        for character in text:
            line, column = self._advance(character, line, column)
        return line, column