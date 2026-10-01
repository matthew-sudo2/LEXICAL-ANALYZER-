// Token types
export type TokenType = 'KEYWORD' | 'IDENTIFIER' | 'OPERATOR' | 'NUMBER' | 'STRING' | 'PUNCTUATION' | 'DELIMITER'

export interface Token {
  token: string
  lexeme: string
  type: TokenType
  line: number
  col: number
}

export interface LexerError {
  message: string
  line: number
  col: number
}

const KEYWORDS = ['let', 'const', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'print', 'true', 'false', 'null']

// Lexer function to tokenize input source code
export function tokenize(input: string): { tokens: Token[] } | { error: LexerError } {
  const tokens: Token[] = []
  let line = 1
  let col = 1
  let i = 0

  while (i < input.length) {
    const char = input[i]
    const lineStart = i

    // Skip whitespace
    if (/\s/.test(char)) {
      if (char === '\n') {
        line++
        col = 1
      } else if (char === '\t') {
        col += 4
      } else {
        col++
      }
      i++
      continue
    }

    // String literals
    if (char === '"' || char === "'") {
      const quote = char
      let str = ''
      const startLine = line
      const startCol = col
      i++
      col++

      while (i < input.length && input[i] !== quote) {
        if (input[i] === '\n') {
          line++
          col = 1
        }
        str += input[i]
        i++
        col++
      }

      if (i >= input.length) {
        return { error: { message: 'Unterminated string literal', line: startLine, col: startCol } }
      }

      i++
      col++
      tokens.push({
        token: str,
        lexeme: `${quote}${str}${quote}`,
        type: 'STRING',
        line: startLine,
        col: startCol
      })
      continue
    }

    // Numbers
    if (/\d/.test(char)) {
      let num = ''
      const startLine = line
      const startCol = col

      while (i < input.length && /[\d.]/.test(input[i])) {
        num += input[i]
        i++
        col++
      }

      tokens.push({
        token: num,
        lexeme: num,
        type: 'NUMBER',
        line: startLine,
        col: startCol
      })
      continue
    }

    // Identifiers and keywords
    if (/[a-zA-Z_]/.test(char)) {
      let ident = ''
      const startLine = line
      const startCol = col

      while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
        ident += input[i]
        i++
        col++
      }

      const type: TokenType = KEYWORDS.includes(ident) ? 'KEYWORD' : 'IDENTIFIER'
      tokens.push({
        token: ident,
        lexeme: ident,
        type,
        line: startLine,
        col: startCol
      })
      continue
    }

    // Operators
    if (['+', '-', '*', '/', '=', '==', '!=', '<', '>', '<=', '>=', '!', '&', '|', '^', '%'].includes(char)) {
      const startLine = line
      const startCol = col
      let op = char
      i++
      col++

      // Check for multi-char operators
      if (i < input.length && ['=', '!', '<', '>', '&', '|'].includes(char) && 
          (input[i] === '=' || input[i] === '=')) {
        op += input[i]
        i++
        col++
      }

      tokens.push({
        token: op,
        lexeme: op,
        type: 'OPERATOR',
        line: startLine,
        col: startCol
      })
      continue
    }

    // Punctuation and delimiters
    const punctuations = [';', ',', '.', '(', ')', '{', '}', '[', ']']
    if (punctuations.includes(char)) {
      const startLine = line
      const startCol = col
      i++
      col++

      let type: TokenType = 'PUNCTUATION'
      if (['(', ')', '{', '}', '[', ']'].includes(char)) {
        type = 'DELIMITER'
      }

      tokens.push({
        token: char,
        lexeme: char,
        type,
        line: startLine,
        col: startCol
      })
      continue
    }

    // Unknown character - error
    return { error: { message: `unrecognized character '${char}'`, line, col } }
  }

  return { tokens }
}