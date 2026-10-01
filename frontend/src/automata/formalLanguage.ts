/**
 * FORMAL LANGUAGE SPECIFICATION FOR LEXISCAN LEXICAL ANALYZER
 * 
 * This document defines the formal languages recognized by our multi-pattern lexical analyzer.
 * We focus on the IDENTIFIER pattern for detailed NFA/DFA construction.
 */

// ============================================================================
// 1. IDENTIFIER LANGUAGE (Primary Focus for NFA/DFA)
// ============================================================================

export const IDENTIFIER_SPEC = {
  name: "Identifier Language",
  
  // Alphabet (Σ)
  alphabet: {
    description: "Set of all valid symbols",
    symbols: [
      "a-z", "A-Z", // lowercase and uppercase letters
      "0-9",        // digits
      "_"           // underscore
    ],
    formal: "Σ = {a,b,c,...,z,A,B,C,...,Z,0,1,2,...,9,_}"
  },

  // Language Definition (L)
  language: {
    description: "Valid identifiers must start with a letter or underscore, followed by any combination of letters, digits, or underscores",
    formal: "L = { w ∈ Σ* | w = (letter|_)(letter|digit|_)* }",
    constraints: [
      "Must start with: letter [a-zA-Z] OR underscore [_]",
      "Can continue with: letter [a-zA-Z], digit [0-9], OR underscore [_]",
      "Minimum length: 1 character",
      "Maximum length: unlimited"
    ]
  },

  // Regular Expression
  regex: {
    pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
    description: "Regular expression for identifier validation",
    formal: "R = (letter|_)(letter|digit|_)*",
    breakdown: [
      {
        component: "[a-zA-Z_]",
        meaning: "First character: letter or underscore",
        purpose: "Ensures identifier starts with valid character"
      },
      {
        component: "[a-zA-Z0-9_]*",
        meaning: "Zero or more letters, digits, or underscores",
        purpose: "Allows any combination after first character"
      }
    ]
  },

  // Accepted Examples (10 valid identifiers)
  acceptedExamples: [
    { input: "x", reason: "Single letter" },
    { input: "_temp", reason: "Starts with underscore" },
    { input: "userName", reason: "Camel case identifier" },
    { input: "user_name", reason: "Snake case identifier" },
    { input: "COUNT", reason: "Uppercase constant" },
    { input: "_privateVar", reason: "Private variable convention" },
    { input: "value123", reason: "Letters followed by digits" },
    { input: "x1y2z3", reason: "Mixed letters and digits" },
    { input: "__init__", reason: "Double underscore convention" },
    { input: "totalCount_2024", reason: "Complex identifier with year" }
  ],

  // Rejected Examples (10 invalid identifiers)
  rejectedExamples: [
    { input: "123abc", reason: "Starts with digit (invalid)" },
    { input: "user-name", reason: "Contains hyphen (not in alphabet)" },
    { input: "user name", reason: "Contains space (not in alphabet)" },
    { input: "9total", reason: "Starts with digit" },
    { input: "total$", reason: "Contains $ (not in alphabet)" },
    { input: "#count", reason: "Starts with # (not in alphabet)" },
    { input: "user.name", reason: "Contains dot (reserved for punctuation)" },
    { input: "@variable", reason: "Starts with @ (not in alphabet)" },
    { input: "value!", reason: "Contains ! (operator, not identifier)" },
    { input: "", reason: "Empty string (minimum length is 1)" }
  ]
}

// ============================================================================
// 2. KEYWORD LANGUAGE
// ============================================================================

export const KEYWORD_SPEC = {
  name: "Keyword Language",
  
  alphabet: {
    description: "Lowercase letters only (keywords are case-sensitive)",
    symbols: ["a-z"],
    formal: "Σ = {a,b,c,...,z}"
  },

  language: {
    description: "Reserved words with specific meaning in the language",
    formal: "L = { let, const, var, function, return, if, else, for, while, print, true, false, null }",
    keywords: [
      "let", "const", "var", "function", "return", 
      "if", "else", "for", "while", "print", 
      "true", "false", "null"
    ]
  },

  regex: {
    pattern: /^(let|const|var|function|return|if|else|for|while|print|true|false|null)$/,
    description: "Exact match for reserved keywords",
    formal: "R = let|const|var|function|return|if|else|for|while|print|true|false|null"
  },

  acceptedExamples: [
    { input: "let", reason: "Variable declaration keyword" },
    { input: "const", reason: "Constant declaration keyword" },
    { input: "function", reason: "Function declaration keyword" },
    { input: "return", reason: "Return statement keyword" },
    { input: "if", reason: "Conditional keyword" },
    { input: "for", reason: "Loop keyword" },
    { input: "while", reason: "Loop keyword" },
    { input: "true", reason: "Boolean literal keyword" },
    { input: "false", reason: "Boolean literal keyword" },
    { input: "null", reason: "Null literal keyword" }
  ],

  rejectedExamples: [
    { input: "Let", reason: "Wrong case (keywords are lowercase)" },
    { input: "CONST", reason: "Wrong case" },
    { input: "print2", reason: "Not an exact keyword match" },
    { input: "returns", reason: "Not an exact keyword match" },
    { input: "functions", reason: "Not an exact keyword match" },
    { input: "iffy", reason: "Not an exact keyword match" },
    { input: "letter", reason: "Contains 'let' but not a keyword" },
    { input: "constant", reason: "Contains 'const' but not a keyword" },
    { input: "whenever", reason: "Contains 'while' but not a keyword" },
    { input: "truefalse", reason: "Combined keywords, not valid" }
  ]
}

// ============================================================================
// 3. NUMBER LANGUAGE
// ============================================================================

export const NUMBER_SPEC = {
  name: "Number Language",
  
  alphabet: {
    description: "Digits and decimal point",
    symbols: ["0-9", "."],
    formal: "Σ = {0,1,2,3,4,5,6,7,8,9,.}"
  },

  language: {
    description: "Integer or floating-point numbers",
    formal: "L = { w ∈ Σ* | w = digit+ | digit+.digit+ }",
    constraints: [
      "Integers: one or more digits",
      "Floats: digits, decimal point, digits",
      "Must contain at least one digit"
    ]
  },

  regex: {
    pattern: /^\d+(\.\d+)?$/,
    description: "Integer or decimal number",
    formal: "R = digit+(. digit+)?",
    breakdown: [
      {
        component: "\\d+",
        meaning: "One or more digits",
        purpose: "Integer part (required)"
      },
      {
        component: "(\\.\\d+)?",
        meaning: "Optional decimal point and digits",
        purpose: "Allows floating-point numbers"
      }
    ]
  },

  acceptedExamples: [
    { input: "0", reason: "Single digit" },
    { input: "42", reason: "Multi-digit integer" },
    { input: "123", reason: "Integer" },
    { input: "9999", reason: "Large integer" },
    { input: "3.14", reason: "Floating-point number" },
    { input: "0.5", reason: "Decimal less than 1" },
    { input: "100.0", reason: "Float with .0" },
    { input: "999.999", reason: "Multi-digit float" },
    { input: "1.0", reason: "Simple float" },
    { input: "2024", reason: "Year as integer" }
  ],

  rejectedExamples: [
    { input: ".", reason: "Decimal point alone (no digits)" },
    { input: ".5", reason: "Missing leading digit" },
    { input: "5.", reason: "Missing trailing digits after decimal" },
    { input: "1.2.3", reason: "Multiple decimal points" },
    { input: "12a", reason: "Contains letter" },
    { input: "abc", reason: "No digits at all" },
    { input: "3.14.15", reason: "Multiple decimal points" },
    { input: " 42", reason: "Leading space" },
    { input: "42 ", reason: "Trailing space" },
    { input: "", reason: "Empty string" }
  ]
}

// ============================================================================
// 4. STRING LANGUAGE
// ============================================================================

export const STRING_SPEC = {
  name: "String Language",
  
  alphabet: {
    description: "Any printable character, quotes, and escape sequences",
    symbols: ["a-z", "A-Z", "0-9", "space", "symbols", "'", '"', "\\"],
    formal: "Σ = {all printable ASCII characters}"
  },

  language: {
    description: "Sequences of characters enclosed in single or double quotes",
    formal: "L = { w | w = 'chars*' | w = \"chars*\" }",
    constraints: [
      "Must start with quote (' or \")",
      "Must end with matching quote",
      "Can contain any character except unescaped closing quote"
    ]
  },

  regex: {
    pattern: /^(['"]).*?\1$/,
    description: "String literal with matching quotes",
    formal: "R = ('[^']*') | (\"[^\"]*\")"
  },

  acceptedExamples: [
    { input: "'hello'", reason: "Single-quoted string" },
    { input: '"world"', reason: "Double-quoted string" },
    { input: "'Hello, World!'", reason: "String with comma and space" },
    { input: '"JavaScript"', reason: "Double-quoted identifier" },
    { input: "'x'", reason: "Single character string" },
    { input: '""', reason: "Empty double-quoted string" },
    { input: "''", reason: "Empty single-quoted string" },
    { input: '"12345"', reason: "Numeric string" },
    { input: "'user_name'", reason: "Identifier as string" },
    { input: '"Line 1\\nLine 2"', reason: "String with escape sequence" }
  ],

  rejectedExamples: [
    { input: "'hello", reason: "Missing closing quote" },
    { input: 'world"', reason: "Missing opening quote" },
    { input: "'mismatched\"", reason: "Quote mismatch" },
    { input: "\"wrong'", reason: "Quote mismatch" },
    { input: "hello", reason: "No quotes at all" },
    { input: "'", reason: "Single quote alone" },
    { input: '"', reason: "Double quote alone" },
    { input: "''hello''", reason: "Extra quotes" },
    { input: '""text""', reason: "Extra quotes" },
    { input: "'unclosed", reason: "Missing closing quote" }
  ]
}

// ============================================================================
// 5. OPERATOR LANGUAGE
// ============================================================================

export const OPERATOR_SPEC = {
  name: "Operator Language",
  
  alphabet: {
    description: "Arithmetic, comparison, logical, and assignment operators",
    symbols: ["+", "-", "*", "/", "%", "=", "!", "<", ">", "&", "|", "^"],
    formal: "Σ = {+,-,*,/,%,=,!,<,>,&,|,^}"
  },

  language: {
    description: "Single or double-character operators",
    formal: "L = { +, -, *, /, %, =, ==, !=, <, >, <=, >=, !, &, |, ^ }",
    operators: [
      "+", "-", "*", "/", "%",  // Arithmetic
      "=", "==", "!=",           // Assignment and comparison
      "<", ">", "<=", ">=",      // Relational
      "!", "&", "|", "^"         // Logical and bitwise
    ]
  },

  regex: {
    pattern: /^(\+|-|\*|\/|%|=|==|!=|<|>|<=|>=|!|&|\||\^)$/,
    description: "Valid operators (1 or 2 characters)",
    formal: "R = +|-|*|/|%|=|==|!=|<|>|<=|>=|!|&|||^"
  },

  acceptedExamples: [
    { input: "+", reason: "Addition operator" },
    { input: "-", reason: "Subtraction operator" },
    { input: "*", reason: "Multiplication operator" },
    { input: "/", reason: "Division operator" },
    { input: "=", reason: "Assignment operator" },
    { input: "==", reason: "Equality comparison" },
    { input: "!=", reason: "Not equal comparison" },
    { input: "<", reason: "Less than operator" },
    { input: ">=", reason: "Greater than or equal" },
    { input: "!", reason: "Logical NOT operator" }
  ],

  rejectedExamples: [
    { input: "++", reason: "Not a defined operator" },
    { input: "--", reason: "Not a defined operator" },
    { input: "**", reason: "Not a defined operator" },
    { input: "===", reason: "Triple equals not defined" },
    { input: "!==", reason: "Triple character not defined" },
    { input: "<>", reason: "Not a valid operator in this language" },
    { input: "=>", reason: "Arrow function syntax not defined" },
    { input: "&&", reason: "Double ampersand not defined" },
    { input: "||", reason: "Double pipe not defined" },
    { input: "@", reason: "Not in operator alphabet" }
  ]
}

// ============================================================================
// SUMMARY: ALL FORMAL LANGUAGES
// ============================================================================

export const ALL_LANGUAGES = {
  identifier: IDENTIFIER_SPEC,
  keyword: KEYWORD_SPEC,
  number: NUMBER_SPEC,
  string: STRING_SPEC,
  operator: OPERATOR_SPEC
}

export const COMPLETE_ALPHABET = {
  description: "Complete alphabet for LexiScan lexical analyzer",
  formal: "Σ_complete = Σ_identifier ∪ Σ_keyword ∪ Σ_number ∪ Σ_string ∪ Σ_operator ∪ {whitespace, punctuation, delimiters}",
  categories: {
    letters: "a-z, A-Z",
    digits: "0-9",
    underscore: "_",
    operators: "+ - * / % = ! < > & | ^",
    punctuation: "; , .",
    delimiters: "( ) { } [ ]",
    quotes: "' \"",
    whitespace: "space, tab, newline",
    decimal: "."
  }
}
