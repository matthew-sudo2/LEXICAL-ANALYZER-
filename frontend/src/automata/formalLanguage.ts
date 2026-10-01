/**
 * FORMAL LANGUAGE SPECIFICATION FOR LEXISCAN LEXICAL ANALYZER
 * 
 * This document defines the formal languages recognized by our multi-token lexical analyzer.
 * The analyzer recognizes: Identifiers, Numbers, Strings, Operators, Delimiters, and Keywords.
 */

// ============================================================================
// ALPHABET (Σ) - Universal Symbol Set
// ============================================================================

export const UNIVERSAL_ALPHABET = {
  name: "Universal Alphabet",
  description: "Set of all valid symbols in the language",
  categories: {
    letters: {
      description: "Alphabetic characters",
      symbols: ["a-z", "A-Z"],
      formal: "L = {a,b,c,...,z,A,B,C,...,Z}"
    },
    digits: {
      description: "Numeric characters",
      symbols: ["0-9"],
      formal: "D = {0,1,2,...,9}"
    },
    underscore: {
      description: "Underscore character",
      symbols: ["_"],
      formal: "_"
    },
    operators: {
      description: "Arithmetic and comparison operators",
      symbols: ["+", "-", "*", "/", "%", "=", "!", "<", ">"],
      formal: "O = {+, -, *, /, %, =, !, <, >}"
    },
    delimiters: {
      description: "Punctuation and grouping symbols",
      symbols: ["(", ")", "{", "}", "[", "]", ",", ";", ":", "."],
      formal: "P = {(, ), {, }, [, ], ,, ;, :, .}"
    },
    quotes: {
      description: "String delimiters",
      symbols: ['"', "'"],
      formal: "Q = {\" , '}"
    },
    whitespace: {
      description: "Space, tab, newline (skipped)",
      symbols: [" ", "\t", "\n"],
      formal: "W = {space, tab, newline}"
    }
  },
  formal: "Σ = L ∪ D ∪ {_} ∪ O ∪ P ∪ Q ∪ W"
}

// ============================================================================
// 1. IDENTIFIER LANGUAGE
// ============================================================================

export const IDENTIFIER_SPEC = {
  name: "Identifier Language",
  
  // Alphabet (Σ_ID)
  alphabet: {
    description: "Set of valid identifier symbols",
    symbols: ["a-z", "A-Z", "0-9", "_"],
    formal: "Σ_ID = {a,b,c,...,z,A,B,C,...,Z,0,1,2,...,9,_}"
  },

  // Language Definition (L_ID)
  language: {
    description: "Valid identifiers must start with a letter or underscore, followed by any combination of letters, digits, or underscores",
    formal: "L_ID = { w ∈ Σ_ID* | w = (letter|_)(letter|digit|_)* }",
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
    formal: "R_ID = (letter|_)(letter|digit|_)*",
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
// 2. NUMBER LANGUAGE
// ============================================================================

export const NUMBER_SPEC = {
  name: "Number Language",
  
  alphabet: {
    description: "Digits and decimal point",
    symbols: ["0-9", "."],
    formal: "Σ_NUM = {0,1,2,...,9,.}"
  },
  
  language: {
    description: "Integer and floating-point numbers",
    formal: "L_NUM = L_INT ∪ L_FLOAT",
    breakdown: {
      integer: "L_INT = digit(digit)*",
      float: "L_FLOAT = digit(digit)* . digit(digit)+"
    }
  },
  
  regex: {
    integer: /^\d+$/,
    float: /^\d+\.\d+$/,
    description: "Integer: one or more digits. Float: digits, decimal point, more digits."
  },
  
  acceptedExamples: [
    { input: "42", type: "INTEGER", reason: "Simple integer" },
    { input: "0", type: "INTEGER", reason: "Zero" },
    { input: "3.14", type: "FLOAT", reason: "Pi approximation" },
    { input: "2.5", type: "FLOAT", reason: "Decimal number" },
    { input: "100.0", type: "FLOAT", reason: "Float with zero decimal" }
  ],
  
  rejectedExamples: [
    { input: ".5", reason: "Must start with digit" },
    { input: "5.", reason: "Must have digit after decimal" },
    { input: "5.5.5", reason: "Multiple decimal points" },
    { input: "abc", reason: "Contains letters" }
  ]
}

// ============================================================================
// 3. STRING LANGUAGE
// ============================================================================

export const STRING_SPEC = {
  name: "String Language",
  
  alphabet: {
    description: "Quote delimiters and any character except newline",
    symbols: ['"', "'", "any except \\n"],
    formal: "Σ_STR = {\"} ∪ {'} ∪ (Σ \\ {\\n})"
  },
  
  language: {
    description: "Character sequences enclosed in matching quotes",
    formal: "L_STR = \"(Σ \\ {\\n})*\" OR '(Σ \\ {\\n})*'",
    constraints: [
      "Must start and end with matching quote",
      "Cannot contain newline (use escaped \\n if needed)",
      "Can contain any other character including spaces"
    ]
  },
  
  regex: {
    pattern: /^"[^"\n]*"$|^'[^'\n]*'$/,
    description: "String in double or single quotes without newlines"
  },
  
  acceptedExamples: [
    { input: '"hello"', reason: "Simple string" },
    { input: "'world'", reason: "Single-quoted string" },
    { input: '"Hello, World!"', reason: "String with punctuation" },
    { input: '"user_name"', reason: "String with underscore" },
    { input: '"42"', reason: "String containing digits" }
  ],
  
  rejectedExamples: [
    { input: '"hello', reason: "Unclosed string" },
    { input: 'hello"', reason: "No opening quote" },
    { input: '"hello\nworld"', reason: "Contains newline" },
    { input: '"hel"lo"', reason: "Mismatched quotes" }
  ]
}

// ============================================================================
// 4. OPERATOR LANGUAGE
// ============================================================================

export const OPERATOR_SPEC = {
  name: "Operator Language",
  
  alphabet: {
    description: "Arithmetic and comparison symbols",
    symbols: ["+", "-", "*", "/", "%", "=", "!", "<", ">"],
    formal: "Σ_OP = {+, -, *, /, %, =, !, <, >}"
  },
  
  language: {
    description: "Single and compound operators",
    formal: "L_OP = L_SINGLE ∪ L_COMPOUND",
    breakdown: {
      single: "{+, -, *, /, %, =, <, >}",
      compound: "{==, !=, <=, >=}"
    }
  },
  
  operators: {
    arithmetic: [
      { symbol: "+", name: "PLUS", description: "Addition" },
      { symbol: "-", name: "MINUS", description: "Subtraction" },
      { symbol: "*", name: "MULTIPLY", description: "Multiplication" },
      { symbol: "/", name: "DIVIDE", description: "Division" },
      { symbol: "%", name: "MODULO", description: "Modulo" }
    ],
    comparison: [
      { symbol: "=", name: "ASSIGN", description: "Assignment" },
      { symbol: "==", name: "EQUAL", description: "Equality comparison" },
      { symbol: "!=", name: "NOT_EQUAL", description: "Inequality comparison" },
      { symbol: "<", name: "LESS_THAN", description: "Less than" },
      { symbol: ">", name: "GREATER_THAN", description: "Greater than" },
      { symbol: "<=", name: "LESS_EQUAL", description: "Less than or equal" },
      { symbol: ">=", name: "GREATER_EQUAL", description: "Greater than or equal" }
    ]
  }
}

// ============================================================================
// 5. DELIMITER LANGUAGE
// ============================================================================

export const DELIMITER_SPEC = {
  name: "Delimiter Language",
  
  alphabet: {
    description: "Punctuation and grouping symbols",
    symbols: ["(", ")", "{", "}", "[", "]", ",", ";", ":", "."],
    formal: "Σ_DELIM = {(, ), {, }, [, ], ,, ;, :, .}"
  },
  
  language: {
    description: "Single-character delimiters for grouping and separation",
    formal: "L_DELIM = {(, ), {, }, [, ], ,, ;, :, .}"
  },
  
  delimiters: [
    { symbol: "(", name: "LEFT_PAREN", description: "Opening parenthesis" },
    { symbol: ")", name: "RIGHT_PAREN", description: "Closing parenthesis" },
    { symbol: "{", name: "LEFT_BRACE", description: "Opening brace" },
    { symbol: "}", name: "RIGHT_BRACE", description: "Closing brace" },
    { symbol: "[", name: "LEFT_BRACKET", description: "Opening bracket" },
    { symbol: "]", name: "RIGHT_BRACKET", description: "Closing bracket" },
    { symbol: ",", name: "COMMA", description: "Argument separator" },
    { symbol: ";", name: "SEMICOLON", description: "Statement terminator" },
    { symbol: ":", name: "COLON", description: "Type annotation separator" },
    { symbol: ".", name: "DOT", description: "Member access" }
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
    formal: "L = { for, while, if, else, elif, return, break, continue, def, class, import, from, in, and, or, not, None, True, False }",
    keywords: [
      "for", "while", "if", "else", "elif", "return", "break", "continue",
      "def", "class", "import", "from", "in", "and", "or", "not", "None",
      "True", "False"
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
