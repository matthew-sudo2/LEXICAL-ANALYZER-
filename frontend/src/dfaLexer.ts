/**
 * DFA-BASED LEXICAL ANALYZER WITH STATE TRANSITION TRACKING
 * 
 * This lexer uses the minimized DFA to tokenize input and tracks
 * state transitions for visualization and debugging.
 */

import { MINIMIZED_DFA } from './automata/minimizedDFA'

// Token types
export type TokenType = 'KEYWORD' | 'IDENTIFIER' | 'OPERATOR' | 'NUMBER' | 'STRING' | 'PUNCTUATION' | 'DELIMITER' | 'ERROR'

export interface Token {
  token: string
  lexeme: string
  type: TokenType
  line: number
  col: number
  stateTrace?: string[]  // State transition path
  finalState?: string    // Final DFA state reached
}

export interface LexerError {
  message: string
  line: number
  col: number
  stateTrace?: string[]
}

export interface StateTransition {
  from: string
  to: string
  symbol: string
  position: number
}

export interface TokenizationResult {
  tokens: Token[]
  transitions: StateTransition[]  // All state transitions
  totalTransitions: number
}

const KEYWORDS = [
  'let', 'const', 'var', 'function', 'return', 
  'if', 'else', 'for', 'while', 'print', 
  'true', 'false', 'null'
]

// ============================================================================
// DFA STATE MACHINE FOR IDENTIFIERS
// ============================================================================

/**
 * Run the minimized DFA on a single identifier candidate
 * Returns whether it's accepted and the state trace
 */
function runIdentifierDFA(input: string): {
  accepted: boolean
  stateTrace: string[]
  finalState: string
} {
  const stateTrace: string[] = ['q0']
  let currentState = 'q0'
  
  for (const char of input) {
    let symbol: string
    
    if (/[a-zA-Z]/.test(char)) {
      symbol = 'letter'
    } else if (/[0-9]/.test(char)) {
      symbol = 'digit'
    } else if (char === '_') {
      symbol = 'underscore'
    } else {
      // Invalid character for identifier
      currentState = 'qREJ'
      stateTrace.push(currentState)
      return { accepted: false, stateTrace, finalState: currentState }
    }
    
    // Transition using minimized DFA
    currentState = MINIMIZED_DFA.δ[currentState][symbol]
    stateTrace.push(currentState)
  }
  
  const accepted = MINIMIZED_DFA.F.includes(currentState)
  return { accepted, stateTrace, finalState: currentState }
}

// ============================================================================
// ALPHABET VALIDATION
// ============================================================================

/**
 * Valid characters in our complete alphabet
 */
const ALPHABET = {
  letters: /[a-zA-Z]/,
  digits: /[0-9]/,
  underscore: '_',
  operators: ['+', '-', '*', '/', '%', '=', '!', '<', '>', '&', '|', '^'],
  punctuation: [';', ',', '.'],
  delimiters: ['(', ')', '{', '}', '[', ']'],
  quotes: ['"', "'"],
  whitespace: /\s/,
}

/**
 * Check if character belongs to defined alphabet
 */
function isValidAlphabetChar(char: string): boolean {
  return (
    ALPHABET.letters.test(char) ||
    ALPHABET.digits.test(char) ||
    char === ALPHABET.underscore ||
    ALPHABET.operators.includes(char) ||
    ALPHABET.punctuation.includes(char) ||
    ALPHABET.delimiters.includes(char) ||
    ALPHABET.quotes.includes(char) ||
    ALPHABET.whitespace.test(char)
  )
}

/**
 * Get symbol category for a character
 */
function getSymbolCategory(char: string): string {
  if (ALPHABET.letters.test(char)) return 'letter'
  if (ALPHABET.digits.test(char)) return 'digit'
  if (char === '_') return 'underscore'
  if (ALPHABET.operators.includes(char)) return 'operator'
  if (ALPHABET.punctuation.includes(char)) return 'punctuation'
  if (ALPHABET.delimiters.includes(char)) return 'delimiter'
  if (ALPHABET.quotes.includes(char)) return 'quote'
  if (ALPHABET.whitespace.test(char)) return 'whitespace'
  return 'invalid'
}

// ============================================================================
// MAIN TOKENIZER WITH STATE TRACKING
// ============================================================================

/**
 * Tokenize input with full DFA state transition tracking
 */
export function tokenize(input: string): { tokens: Token[]; transitions: StateTransition[] } | { error: LexerError } {
  const tokens: Token[] = []
  const transitions: StateTransition[] = []
  let line = 1
  let col = 1
  let i = 0
  let globalPosition = 0

  while (i < input.length) {
    const char = input[i]
    const startCol = col

    // ── Alphabet Validation ──────────────────────────
    if (!isValidAlphabetChar(char)) {
      return {
        error: {
          message: `Invalid character '${char}' not in alphabet Σ. Expected: letters [a-zA-Z], digits [0-9], operators, punctuation, delimiters, or whitespace.`,
          line,
          col,
          stateTrace: ['q0', 'qREJ']
        }
      }
    }

    // ── Skip Whitespace ──────────────────────────────
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
      globalPosition++
      continue
    }

    // ── String Literals ──────────────────────────────
    if (char === '"' || char === "'") {
      const quote = char
      let str = ''
      const startLine = line
      const startPos = globalPosition
      const stateTrace = ['q0_string', 'reading_string']
      
      i++
      col++
      globalPosition++

      while (i < input.length && input[i] !== quote) {
        if (input[i] === '\n') {
          line++
          col = 1
        }
        str += input[i]
        i++
        col++
        globalPosition++
      }

      if (i >= input.length) {
        return {
          error: {
            message: 'Unterminated string literal',
            line: startLine,
            col: startCol,
            stateTrace: [...stateTrace, 'qERROR']
          }
        }
      }

      stateTrace.push('qACCEPT_string')
      i++
      col++
      globalPosition++

      tokens.push({
        token: str,
        lexeme: `${quote}${str}${quote}`,
        type: 'STRING',
        line: startLine,
        col: startCol,
        stateTrace,
        finalState: 'qACCEPT_string'
      })
      continue
    }

    // ── Numbers (DFA-based) ──────────────────────────
    if (/\d/.test(char)) {
      let num = ''
      const startLine = line
      const startPos = globalPosition
      const stateTrace = ['q0_num']
      let currentState = 'q_integer'

      while (i < input.length && /[\d.]/.test(input[i])) {
        num += input[i]
        
        if (input[i] === '.') {
          if (currentState === 'q_float') {
            // Second decimal point - error
            return {
              error: {
                message: `Invalid number '${num}' - multiple decimal points`,
                line: startLine,
                col: startCol,
                stateTrace: [...stateTrace, 'qERROR']
              }
            }
          }
          currentState = 'q_float'
          stateTrace.push('q_decimal')
        } else {
          stateTrace.push(currentState)
        }
        
        i++
        col++
        globalPosition++
      }

      stateTrace.push(`qACCEPT_${currentState}`)

      tokens.push({
        token: num,
        lexeme: num,
        type: 'NUMBER',
        line: startLine,
        col: startCol,
        stateTrace,
        finalState: `qACCEPT_${currentState}`
      })
      continue
    }

    // ── Identifiers and Keywords (Minimized DFA) ────
    if (/[a-zA-Z_]/.test(char)) {
      let ident = ''
      const startLine = line
      const startPos = globalPosition

      // Collect potential identifier
      while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
        ident += input[i]
        i++
        col++
        globalPosition++
      }

      // Run through minimized DFA for validation
      const dfaResult = runIdentifierDFA(ident)

      if (!dfaResult.accepted) {
        return {
          error: {
            message: `Invalid identifier '${ident}' rejected by DFA`,
            line: startLine,
            col: startCol,
            stateTrace: dfaResult.stateTrace
          }
        }
      }

      // Record DFA transitions
      for (let j = 0; j < dfaResult.stateTrace.length - 1; j++) {
        transitions.push({
          from: dfaResult.stateTrace[j],
          to: dfaResult.stateTrace[j + 1],
          symbol: ident[j] || 'ε',
          position: startPos + j
        })
      }

      // Check if it's a keyword
      const type: TokenType = KEYWORDS.includes(ident) ? 'KEYWORD' : 'IDENTIFIER'
      
      tokens.push({
        token: ident,
        lexeme: ident,
        type,
        line: startLine,
        col: startCol,
        stateTrace: dfaResult.stateTrace,
        finalState: dfaResult.finalState
      })
      continue
    }

    // ── Operators ────────────────────────────────────
    const operators = ['+', '-', '*', '/', '=', '==', '!=', '<', '>', '<=', '>=', '&', '|', '^', '%']
    let foundOp = false
    
    for (const op of operators.sort((a, b) => b.length - a.length)) { // Try longest first
      if (input.substring(i, i + op.length) === op) {
        const stateTrace = ['q0_op', `q_${op}`, `qACCEPT_op`]
        
        tokens.push({
          token: op,
          lexeme: op,
          type: 'OPERATOR',
          line,
          col: startCol,
          stateTrace,
          finalState: 'qACCEPT_op'
        })
        
        i += op.length
        col += op.length
        globalPosition += op.length
        foundOp = true
        break
      }
    }
    
    if (foundOp) continue

    // ── Punctuation and Delimiters ───────────────────
    const punctuations = [';', ',', '.', '(', ')', '{', '}', '[', ']']
    if (punctuations.includes(char)) {
      const type: TokenType = ['(', ')', '{', '}', '[', ']'].includes(char) ? 'DELIMITER' : 'PUNCTUATION'
      const stateTrace = ['q0_punct', `q_${char}`, `qACCEPT_punct`]
      
      tokens.push({
        token: char,
        lexeme: char,
        type,
        line,
        col: startCol,
        stateTrace,
        finalState: 'qACCEPT_punct'
      })
      
      i++
      col++
      globalPosition++
      continue
    }

    // ── Unknown Character ────────────────────────────
    return {
      error: {
        message: `Unrecognized character '${char}' at position ${i}`,
        line,
        col,
        stateTrace: ['q0', 'qREJ']
      }
    }
  }

  return { tokens, transitions }
}

// ============================================================================
// TOKEN VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validate a single token against its pattern
 */
export function validateToken(lexeme: string, type: TokenType): {
  valid: boolean
  reason: string
  stateTrace: string[]
} {
  switch (type) {
    case 'IDENTIFIER':
      const result = runIdentifierDFA(lexeme)
      return {
        valid: result.accepted,
        reason: result.accepted
          ? `Valid identifier - accepted by DFA in state ${result.finalState}`
          : `Invalid identifier - rejected by DFA in state ${result.finalState}`,
        stateTrace: result.stateTrace
      }
    
    case 'KEYWORD':
      const isKeyword = KEYWORDS.includes(lexeme)
      return {
        valid: isKeyword,
        reason: isKeyword ? 'Valid keyword' : 'Not a recognized keyword',
        stateTrace: isKeyword ? ['q0', 'qKEYWORD'] : ['q0', 'qREJ']
      }
    
    case 'NUMBER':
      const numValid = /^\d+(\.\d+)?$/.test(lexeme)
      return {
        valid: numValid,
        reason: numValid ? 'Valid number format' : 'Invalid number format',
        stateTrace: numValid ? ['q0', 'qNUM', 'qACCEPT'] : ['q0', 'qNUM', 'qREJ']
      }
    
    default:
      return {
        valid: true,
        reason: 'Token type does not require DFA validation',
        stateTrace: ['q0', 'qACCEPT']
      }
  }
}

/**
 * Get detailed alphabet information for error messages
 */
export function getAlphabetInfo(): {
  description: string
  categories: { [key: string]: string }
} {
  return {
    description: "Complete alphabet Σ for LexiScan lexical analyzer",
    categories: {
      'Letters': 'a-z, A-Z',
      'Digits': '0-9',
      'Underscore': '_',
      'Operators': '+ - * / % = ! < > & | ^',
      'Punctuation': '; , .',
      'Delimiters': '( ) { } [ ]',
      'Quotes': '\' "',
      'Whitespace': 'space, tab, newline'
    }
  }
}

/**
 * Check if input contains only valid alphabet symbols
 */
export function validateAlphabet(input: string): {
  valid: boolean
  invalidChars: { char: string; position: number; line: number; col: number }[]
} {
  const invalidChars: { char: string; position: number; line: number; col: number }[] = []
  let line = 1
  let col = 1
  
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    
    if (!isValidAlphabetChar(char)) {
      invalidChars.push({
        char,
        position: i,
        line,
        col
      })
    }
    
    if (char === '\n') {
      line++
      col = 1
    } else {
      col++
    }
  }
  
  return {
    valid: invalidChars.length === 0,
    invalidChars
  }
}
