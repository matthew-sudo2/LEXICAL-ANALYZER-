/**
 * NFA (NON-DETERMINISTIC FINITE AUTOMATON) FOR IDENTIFIER RECOGNITION
 * 
 * Formal Definition: M = (Q, Σ, δ, q0, F)
 * 
 * This NFA recognizes valid identifiers that match the pattern:
 * (letter|_)(letter|digit|_)*
 */

// ============================================================================
// FORMAL NFA DEFINITION
// ============================================================================

export interface NFADefinition {
  Q: string[]           // Set of states
  Σ: string[]          // Alphabet
  δ: TransitionFunction // Transition function
  q0: string           // Start state
  F: string[]          // Accepting states
}

export type TransitionFunction = {
  [state: string]: {
    [symbol: string]: string[]  // Non-deterministic: can go to multiple states
  }
}

/**
 * NFA for Identifier Recognition
 * 
 * States:
 * - q0: Initial state (start)
 * - q1: After reading a letter
 * - q2: After reading an underscore
 * - q3: After reading letter/digit/underscore (continuing)
 * - q4: Error/reject state (for invalid transitions)
 * 
 * The NFA allows parallel paths since starting with letter OR underscore
 * are both valid, creating non-determinism.
 */
export const IDENTIFIER_NFA: NFADefinition = {
  // Q: Set of all states
  Q: ['q0', 'q1', 'q2', 'q3', 'q4'],

  // Σ: Alphabet
  Σ: [
    'letter',    // Represents [a-zA-Z]
    'digit',     // Represents [0-9]
    'underscore' // Represents _
  ],

  // q0: Start state
  q0: 'q0',

  // F: Accepting states (can end here for valid identifier)
  F: ['q1', 'q2', 'q3'],

  // δ: Transition function (state × symbol → set of states)
  δ: {
    'q0': {
      'letter': ['q1'],      // Start with letter → go to q1
      'underscore': ['q2'],  // Start with underscore → go to q2
      'digit': ['q4']        // Start with digit → ERROR (q4)
    },
    'q1': {
      'letter': ['q3'],      // Continue with letter
      'digit': ['q3'],       // Continue with digit
      'underscore': ['q3']   // Continue with underscore
    },
    'q2': {
      'letter': ['q3'],      // After underscore, letter is valid
      'digit': ['q3'],       // After underscore, digit is valid
      'underscore': ['q3']   // After underscore, another underscore is valid
    },
    'q3': {
      'letter': ['q3'],      // Loop: continue with letter
      'digit': ['q3'],       // Loop: continue with digit
      'underscore': ['q3']   // Loop: continue with underscore
    },
    'q4': {
      // Error state - no valid transitions
      'letter': [],
      'digit': [],
      'underscore': []
    }
  }
}

// ============================================================================
// NFA TRANSITION TABLE (Human-Readable Format)
// ============================================================================

export const NFA_TRANSITION_TABLE = {
  title: "NFA Transition Table for Identifier Recognition",
  description: "δ(state, symbol) → next states",
  
  headers: ['State', 'letter [a-zA-Z]', 'digit [0-9]', 'underscore [_]'],
  
  rows: [
    {
      state: 'q0 (start)',
      letter: 'q1',
      digit: 'q4 (reject)',
      underscore: 'q2',
      accepting: false
    },
    {
      state: 'q1',
      letter: 'q3',
      digit: 'q3',
      underscore: 'q3',
      accepting: true  // Can accept after first letter
    },
    {
      state: 'q2',
      letter: 'q3',
      digit: 'q3',
      underscore: 'q3',
      accepting: true  // Can accept after first underscore
    },
    {
      state: 'q3',
      letter: 'q3',
      digit: 'q3',
      underscore: 'q3',
      accepting: true  // Can accept after any continuation
    },
    {
      state: 'q4 (reject)',
      letter: '∅',
      digit: '∅',
      underscore: '∅',
      accepting: false
    }
  ]
}

// ============================================================================
// NFA STATE DESCRIPTIONS
// ============================================================================

export const NFA_STATE_DESCRIPTIONS = {
  q0: {
    name: "Initial State",
    description: "Starting point. Waiting for first character.",
    accepting: false,
    role: "Entry point - validates first character"
  },
  q1: {
    name: "After Letter",
    description: "Successfully read a letter as first character. This is a valid identifier (single letter like 'x').",
    accepting: true,
    role: "Handles identifiers starting with letter"
  },
  q2: {
    name: "After Underscore", 
    description: "Successfully read underscore as first character. This is valid (like '_temp').",
    accepting: true,
    role: "Handles identifiers starting with underscore"
  },
  q3: {
    name: "Continuation State",
    description: "Reading subsequent characters (letters, digits, or underscores). Loop state.",
    accepting: true,
    role: "Processes all characters after the first one"
  },
  q4: {
    name: "Error/Reject State",
    description: "Invalid input detected (e.g., starting with digit). No valid transitions out.",
    accepting: false,
    role: "Trap state for invalid identifiers"
  }
}

// ============================================================================
// NFA EXAMPLES WITH STATE TRACES
// ============================================================================

export const NFA_EXECUTION_EXAMPLES = {
  accepted: [
    {
      input: "x",
      trace: ["q0", "q1"],
      symbols: ["letter"],
      explanation: "Single letter identifier. q0 →[letter]→ q1 (accept)"
    },
    {
      input: "_temp",
      trace: ["q0", "q2", "q3", "q3", "q3", "q3"],
      symbols: ["underscore", "letter", "letter", "letter", "letter"],
      explanation: "Starts with underscore. q0 →[_]→ q2 →[letter]→ q3 →[letter]→ q3 (loop) → accept"
    },
    {
      input: "userName",
      trace: ["q0", "q1", "q3", "q3", "q3", "q3", "q3", "q3", "q3"],
      symbols: ["letter", "letter", "letter", "letter", "letter", "letter", "letter", "letter"],
      explanation: "Camel case. q0 →[u]→ q1 →[s,e,r,N,a,m,e]→ q3 (loop) → accept"
    },
    {
      input: "value123",
      trace: ["q0", "q1", "q3", "q3", "q3", "q3", "q3", "q3", "q3"],
      symbols: ["letter", "letter", "letter", "letter", "letter", "digit", "digit", "digit"],
      explanation: "Letter then digits. q0 →[v]→ q1 →[alue]→ q3 →[123]→ q3 → accept"
    },
    {
      input: "_",
      trace: ["q0", "q2"],
      symbols: ["underscore"],
      explanation: "Single underscore. q0 →[_]→ q2 (accept)"
    }
  ],
  
  rejected: [
    {
      input: "123abc",
      trace: ["q0", "q4"],
      symbols: ["digit"],
      explanation: "Starts with digit. q0 →[1]→ q4 (reject) - trapped in error state"
    },
    {
      input: "9total",
      trace: ["q0", "q4"],
      symbols: ["digit"],
      explanation: "Starts with digit. q0 →[9]→ q4 (reject)"
    },
    {
      input: "",
      trace: ["q0"],
      symbols: [],
      explanation: "Empty string. Stays in q0 (non-accepting) → reject"
    }
  ]
}

// ============================================================================
// NFA FORMAL REPRESENTATION
// ============================================================================

export const NFA_FORMAL_NOTATION = `
FORMAL NFA DEFINITION FOR IDENTIFIER RECOGNITION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

M = (Q, Σ, δ, q0, F)

Where:

1. Q = {q0, q1, q2, q3, q4}
   Set of all states in the automaton

2. Σ = {letter, digit, underscore}
   Input alphabet where:
   - letter ∈ [a-zA-Z]
   - digit ∈ [0-9]  
   - underscore = '_'

3. δ: Q × Σ → P(Q)
   Transition function mapping (state, symbol) to set of states:
   
   δ(q0, letter) = {q1}
   δ(q0, digit) = {q4}
   δ(q0, underscore) = {q2}
   
   δ(q1, letter) = {q3}
   δ(q1, digit) = {q3}
   δ(q1, underscore) = {q3}
   
   δ(q2, letter) = {q3}
   δ(q2, digit) = {q3}
   δ(q2, underscore) = {q3}
   
   δ(q3, letter) = {q3}
   δ(q3, digit) = {q3}
   δ(q3, underscore) = {q3}
   
   δ(q4, *) = ∅  (trap state)

4. q0 ∈ Q
   Initial/start state

5. F = {q1, q2, q3} ⊆ Q
   Set of accepting/final states
   
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LANGUAGE ACCEPTED:
L(M) = { w ∈ Σ* | w = (letter|underscore)(letter|digit|underscore)* }

REGULAR EXPRESSION:
R = (letter|_)(letter|digit|_)*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

// ============================================================================
// NFA PROPERTIES
// ============================================================================

export const NFA_PROPERTIES = {
  totalStates: 5,
  acceptingStates: 3,
  rejectingStates: 2,
  startState: 'q0',
  trapState: 'q4',
  
  characteristics: {
    deterministic: true, // Actually deterministic (each state has exactly one transition per symbol)
    complete: true,      // All states have transitions for all symbols
    minimal: false,      // Can be minimized (q1, q2, q3 may be equivalent)
    hasEpsilonTransitions: false,
    hasTrapState: true
  },
  
  complexity: {
    stateCount: 5,
    transitionCount: 15,  // 5 states × 3 symbols = 15 transitions
    alphabetSize: 3
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Simulate NFA execution on input string
 */
export function simulateNFA(input: string): {
  accepted: boolean
  trace: string[]
  symbols: string[]
} {
  const trace: string[] = ['q0']
  const symbols: string[] = []
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
      // Invalid character
      return { accepted: false, trace: [...trace, 'q4'], symbols }
    }
    
    symbols.push(symbol)
    const nextStates = IDENTIFIER_NFA.δ[currentState][symbol]
    
    if (!nextStates || nextStates.length === 0) {
      currentState = 'q4'
    } else {
      currentState = nextStates[0] // Take first state (deterministic)
    }
    
    trace.push(currentState)
  }
  
  const accepted = IDENTIFIER_NFA.F.includes(currentState)
  return { accepted, trace, symbols }
}

/**
 * Get transition for given state and symbol
 */
export function getTransition(state: string, symbol: string): string[] {
  return IDENTIFIER_NFA.δ[state]?.[symbol] || []
}

/**
 * Check if state is accepting
 */
export function isAcceptingState(state: string): boolean {
  return IDENTIFIER_NFA.F.includes(state)
}

/**
 * Get all transitions from a state
 */
export function getStateTransitions(state: string): { [symbol: string]: string[] } {
  return IDENTIFIER_NFA.δ[state] || {}
}
