/**
 * DFA (DETERMINISTIC FINITE AUTOMATON) FOR IDENTIFIER RECOGNITION
 * 
 * Converted from NFA using Subset Construction Method
 * 
 * Formal Definition: M' = (Q', Σ, δ', q0', F')
 */

import { IDENTIFIER_NFA } from './nfa'

// ============================================================================
// SUBSET CONSTRUCTION METHOD - STEP BY STEP
// ============================================================================

export const SUBSET_CONSTRUCTION_STEPS = {
  title: "NFA to DFA Conversion using Subset Construction",
  description: "Systematic conversion process showing all intermediate steps",
  
  steps: [
    {
      step: 1,
      title: "Initial State/Subset",
      description: "Start with the initial state of the NFA as a single-element set",
      computation: "q0' = {q0}",
      explanation: "The DFA starts in the same state as the NFA",
      result: "{q0}"
    },
    {
      step: 2,
      title: "Compute Transitions from {q0}",
      description: "For each symbol in Σ, find all reachable states from q0",
      computation: [
        "δ'({q0}, letter) = δ(q0, letter) = {q1}",
        "δ'({q0}, digit) = δ(q0, digit) = {q4}",
        "δ'({q0}, underscore) = δ(q0, underscore) = {q2}"
      ],
      explanation: "From q0, we can reach q1 (letter), q4 (digit), or q2 (underscore)",
      newStates: ["{q1}", "{q4}", "{q2}"],
      result: "Discovered 3 new DFA states: {q1}, {q2}, {q4}"
    },
    {
      step: 3,
      title: "Compute Transitions from {q1}",
      description: "Process the new state {q1}",
      computation: [
        "δ'({q1}, letter) = δ(q1, letter) = {q3}",
        "δ'({q1}, digit) = δ(q1, digit) = {q3}",
        "δ'({q1}, underscore) = δ(q1, underscore) = {q3}"
      ],
      explanation: "All transitions from q1 lead to q3",
      newStates: ["{q3}"],
      result: "Discovered new DFA state: {q3}"
    },
    {
      step: 4,
      title: "Compute Transitions from {q2}",
      description: "Process the new state {q2}",
      computation: [
        "δ'({q2}, letter) = δ(q2, letter) = {q3}",
        "δ'({q2}, digit) = δ(q2, digit) = {q3}",
        "δ'({q2}, underscore) = δ(q2, underscore) = {q3}"
      ],
      explanation: "All transitions from q2 also lead to q3",
      newStates: [],
      result: "No new states (q3 already discovered)"
    },
    {
      step: 5,
      title: "Compute Transitions from {q3}",
      description: "Process the new state {q3}",
      computation: [
        "δ'({q3}, letter) = δ(q3, letter) = {q3}",
        "δ'({q3}, digit) = δ(q3, digit) = {q3}",
        "δ'({q3}, underscore) = δ(q3, underscore) = {q3}"
      ],
      explanation: "q3 loops to itself on all symbols (continuation state)",
      newStates: [],
      result: "No new states (self-loop)"
    },
    {
      step: 6,
      title: "Compute Transitions from {q4}",
      description: "Process the error state {q4}",
      computation: [
        "δ'({q4}, letter) = δ(q4, letter) = ∅ = {q4}",
        "δ'({q4}, digit) = δ(q4, digit) = ∅ = {q4}",
        "δ'({q4}, underscore) = δ(q4, underscore) = ∅ = {q4}"
      ],
      explanation: "Error state has no valid transitions, loops to itself",
      newStates: [],
      result: "No new states (trap state)"
    },
    {
      step: 7,
      title: "Identify Accepting States",
      description: "A DFA state is accepting if it contains at least one NFA accepting state",
      computation: [
        "{q0} → contains q0 (not accepting in NFA) → NOT accepting",
        "{q1} → contains q1 (accepting in NFA) → ACCEPTING ✓",
        "{q2} → contains q2 (accepting in NFA) → ACCEPTING ✓",
        "{q3} → contains q3 (accepting in NFA) → ACCEPTING ✓",
        "{q4} → contains q4 (not accepting in NFA) → NOT accepting"
      ],
      explanation: "F' = {{q1}, {q2}, {q3}} since NFA F = {q1, q2, q3}",
      result: "Accepting states: {q1}, {q2}, {q3}"
    },
    {
      step: 8,
      title: "Verification - All States Reachable",
      description: "Confirm all discovered states are reachable from q0'",
      computation: [
        "{q0} → START (reachable by definition)",
        "{q1} → reachable via: {q0} --letter--> {q1}",
        "{q2} → reachable via: {q0} --underscore--> {q2}",
        "{q3} → reachable via: {q1} --letter--> {q3} OR {q2} --letter--> {q3}",
        "{q4} → reachable via: {q0} --digit--> {q4}"
      ],
      explanation: "All 5 states are reachable from the initial state",
      result: "✓ All states are reachable - no unreachable states to remove"
    }
  ],
  
  conclusion: {
    totalStates: 5,
    acceptingStates: 3,
    observation: "The NFA was already deterministic, so the DFA has the same structure",
    note: "Each NFA state maps directly to a DFA state: q0→{q0}, q1→{q1}, q2→{q2}, q3→{q3}, q4→{q4}"
  }
}

// ============================================================================
// DFA FORMAL DEFINITION
// ============================================================================

export interface DFADefinition {
  Q: string[]           // Set of states
  Σ: string[]          // Alphabet
  δ: DFATransitionFunction // Transition function (deterministic)
  q0: string           // Start state
  F: string[]          // Accepting states
}

export type DFATransitionFunction = {
  [state: string]: {
    [symbol: string]: string  // Deterministic: single next state
  }
}

/**
 * DFA for Identifier Recognition (Converted from NFA)
 * 
 * This DFA is functionally identical to the NFA since the original
 * NFA was already deterministic (no epsilon transitions, no multiple
 * next states for any state-symbol pair)
 */
export const IDENTIFIER_DFA: DFADefinition = {
  // Q': Set of all DFA states (same as NFA in this case)
  Q: ['q0', 'q1', 'q2', 'q3', 'q4'],

  // Σ: Alphabet (unchanged)
  Σ: ['letter', 'digit', 'underscore'],

  // q0': Start state (same as NFA)
  q0: 'q0',

  // F': Accepting states (same as NFA)
  F: ['q1', 'q2', 'q3'],

  // δ': Transition function (deterministic - single next state)
  δ: {
    'q0': {
      'letter': 'q1',
      'digit': 'q4',
      'underscore': 'q2'
    },
    'q1': {
      'letter': 'q3',
      'digit': 'q3',
      'underscore': 'q3'
    },
    'q2': {
      'letter': 'q3',
      'digit': 'q3',
      'underscore': 'q3'
    },
    'q3': {
      'letter': 'q3',
      'digit': 'q3',
      'underscore': 'q3'
    },
    'q4': {
      'letter': 'q4',
      'digit': 'q4',
      'underscore': 'q4'
    }
  }
}

// ============================================================================
// DFA TRANSITION TABLE
// ============================================================================

export const DFA_TRANSITION_TABLE = {
  title: "DFA Transition Table for Identifier Recognition",
  description: "δ'(state, symbol) → next state (deterministic)",
  note: "Each cell contains exactly ONE next state (no sets)",
  
  headers: ['State', 'letter [a-zA-Z]', 'digit [0-9]', 'underscore [_]', 'Accepting?'],
  
  rows: [
    {
      state: 'q0',
      letter: 'q1',
      digit: 'q4',
      underscore: 'q2',
      accepting: '✗',
      description: 'Start state'
    },
    {
      state: 'q1',
      letter: 'q3',
      digit: 'q3',
      underscore: 'q3',
      accepting: '✓',
      description: 'After first letter'
    },
    {
      state: 'q2',
      letter: 'q3',
      digit: 'q3',
      underscore: 'q3',
      accepting: '✓',
      description: 'After first underscore'
    },
    {
      state: 'q3',
      letter: 'q3',
      digit: 'q3',
      underscore: 'q3',
      accepting: '✓',
      description: 'Continuation (loop)'
    },
    {
      state: 'q4',
      letter: 'q4',
      digit: 'q4',
      underscore: 'q4',
      accepting: '✗',
      description: 'Error/trap state'
    }
  ]
}

// ============================================================================
// COMPARISON: NFA vs DFA
// ============================================================================

export const NFA_VS_DFA_COMPARISON = {
  title: "Comparison of NFA and DFA",
  
  characteristics: [
    {
      aspect: "Number of States",
      nfa: "5 states",
      dfa: "5 states",
      note: "Same - NFA was already deterministic"
    },
    {
      aspect: "Transition Type",
      nfa: "δ: Q × Σ → P(Q) (returns set)",
      dfa: "δ': Q × Σ → Q (returns single state)",
      note: "DFA is deterministic - no choice"
    },
    {
      aspect: "Epsilon Transitions",
      nfa: "Not present in this NFA",
      dfa: "N/A (DFAs never have ε-transitions)",
      note: "Our NFA had no ε-transitions"
    },
    {
      aspect: "Accepting States",
      nfa: "F = {q1, q2, q3}",
      dfa: "F' = {q1, q2, q3}",
      note: "Identical accepting states"
    },
    {
      aspect: "Determinism",
      nfa: "Actually deterministic",
      dfa: "Guaranteed deterministic",
      note: "Each state-symbol pair has exactly one transition"
    },
    {
      aspect: "Execution Complexity",
      nfa: "O(n) - linear in input length",
      dfa: "O(n) - linear in input length",
      note: "Same performance (no backtracking needed)"
    }
  ],
  
  conclusion: "The original NFA was already deterministic (despite being labeled NFA). The conversion process revealed no need for subset construction because each NFA state-symbol pair mapped to a single next state. This is common for simple pattern recognition."
}

// ============================================================================
// SUBSET CONSTRUCTION VISUAL MAPPING
// ============================================================================

export const SUBSET_CONSTRUCTION_MAPPING = {
  title: "State Mapping: NFA → DFA",
  description: "How NFA states map to DFA states during subset construction",
  
  mappings: [
    {
      nfaSubset: "{q0}",
      dfaState: "q0",
      accepting: false,
      explanation: "Initial state - maps directly"
    },
    {
      nfaSubset: "{q1}",
      dfaState: "q1", 
      accepting: true,
      explanation: "After reading first letter"
    },
    {
      nfaSubset: "{q2}",
      dfaState: "q2",
      accepting: true,
      explanation: "After reading first underscore"
    },
    {
      nfaSubset: "{q3}",
      dfaState: "q3",
      accepting: true,
      explanation: "Continuation state (loop)"
    },
    {
      nfaSubset: "{q4}",
      dfaState: "q4",
      accepting: false,
      explanation: "Error/trap state"
    }
  ],
  
  note: "Each DFA state corresponds to exactly one NFA state (1:1 mapping). In more complex NFAs with non-determinism, DFA states would correspond to multiple NFA states (e.g., {q1,q3} or {q0,q2,q4})."
}

// ============================================================================
// DFA FORMAL REPRESENTATION
// ============================================================================

export const DFA_FORMAL_NOTATION = `
FORMAL DFA DEFINITION FOR IDENTIFIER RECOGNITION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

M' = (Q', Σ, δ', q0', F')

Where:

1. Q' = {q0, q1, q2, q3, q4}
   Set of all DFA states
   (Same as NFA - no new states created during conversion)

2. Σ = {letter, digit, underscore}
   Input alphabet (unchanged from NFA)

3. δ': Q' × Σ → Q'
   Deterministic transition function:
   
   δ'(q0, letter) = q1
   δ'(q0, digit) = q4
   δ'(q0, underscore) = q2
   
   δ'(q1, letter) = q3
   δ'(q1, digit) = q3
   δ'(q1, underscore) = q3
   
   δ'(q2, letter) = q3
   δ'(q2, digit) = q3
   δ'(q2, underscore) = q3
   
   δ'(q3, letter) = q3
   δ'(q3, digit) = q3
   δ'(q3, underscore) = q3
   
   δ'(q4, letter) = q4
   δ'(q4, digit) = q4
   δ'(q4, underscore) = q4

4. q0' = q0
   Initial state (unchanged)

5. F' = {q1, q2, q3}
   Set of accepting states
   (A DFA state is accepting if it contains ≥1 NFA accepting state)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LANGUAGE ACCEPTED:
L(M') = L(M) = { w ∈ Σ* | w = (letter|underscore)(letter|digit|underscore)* }

The DFA accepts the same language as the NFA.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

// ============================================================================
// REACHABILITY ANALYSIS
// ============================================================================

export const REACHABILITY_ANALYSIS = {
  title: "Reachability Analysis",
  description: "Determine which states are reachable from the start state",
  
  analysis: [
    {
      state: "q0",
      reachable: true,
      path: "START",
      distance: 0,
      reason: "Initial state - reachable by definition"
    },
    {
      state: "q1",
      reachable: true,
      path: "q0 → q1",
      distance: 1,
      reason: "Reachable via: q0 --[letter]--> q1"
    },
    {
      state: "q2",
      reachable: true,
      path: "q0 → q2",
      distance: 1,
      reason: "Reachable via: q0 --[underscore]--> q2"
    },
    {
      state: "q3",
      reachable: true,
      path: "q0 → q1 → q3 OR q0 → q2 → q3",
      distance: 2,
      reason: "Reachable via q1 or q2 on any symbol"
    },
    {
      state: "q4",
      reachable: true,
      path: "q0 → q4",
      distance: 1,
      reason: "Reachable via: q0 --[digit]--> q4"
    }
  ],
  
  summary: {
    totalStates: 5,
    reachableStates: 5,
    unreachableStates: 0,
    conclusion: "All states are reachable - no dead states to remove"
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Simulate DFA execution on input string
 */
export function simulateDFA(input: string): {
  accepted: boolean
  trace: string[]
  symbols: string[]
  finalState: string
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
      // Invalid character - go to error state
      currentState = 'q4'
      trace.push(currentState)
      symbols.push(`invalid(${char})`)
      continue
    }
    
    symbols.push(symbol)
    currentState = IDENTIFIER_DFA.δ[currentState][symbol]
    trace.push(currentState)
  }
  
  const accepted = IDENTIFIER_DFA.F.includes(currentState)
  return { accepted, trace, symbols, finalState: currentState }
}

/**
 * Get DFA transition for given state and symbol
 */
export function getDFATransition(state: string, symbol: string): string {
  return IDENTIFIER_DFA.δ[state]?.[symbol] || 'q4'
}

/**
 * Check if DFA state is accepting
 */
export function isDFAAcceptingState(state: string): boolean {
  return IDENTIFIER_DFA.F.includes(state)
}

/**
 * Get all DFA transitions from a state
 */
export function getDFAStateTransitions(state: string): { [symbol: string]: string } {
  return IDENTIFIER_DFA.δ[state] || {}
}

/**
 * Validate identifier using DFA
 */
export function validateIdentifier(input: string): {
  valid: boolean
  reason: string
  trace: string[]
} {
  if (input.length === 0) {
    return {
      valid: false,
      reason: "Empty string - identifiers must have at least one character",
      trace: ['q0']
    }
  }
  
  const result = simulateDFA(input)
  
  if (!result.accepted) {
    if (result.finalState === 'q4') {
      return {
        valid: false,
        reason: "Invalid identifier - check that it starts with letter/underscore and contains only letters, digits, and underscores",
        trace: result.trace
      }
    } else if (result.finalState === 'q0') {
      return {
        valid: false,
        reason: "Empty identifier",
        trace: result.trace
      }
    }
  }
  
  return {
    valid: result.accepted,
    reason: result.accepted ? "Valid identifier" : "Rejected by DFA",
    trace: result.trace
  }
}
