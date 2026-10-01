/**
 * MINIMIZED DFA FOR IDENTIFIER RECOGNITION
 * 
 * Using State Minimization Algorithm (Partition Refinement)
 * 
 * Goal: Merge equivalent states to create smallest possible DFA
 * that accepts the same language
 */

import { IDENTIFIER_DFA, DFADefinition } from './dfa'

// ============================================================================
// DFA MINIMIZATION ALGORITHM - STEP BY STEP
// ============================================================================

export const MINIMIZATION_STEPS = {
  title: "DFA Minimization using Partition Refinement",
  description: "Systematic process to identify and merge equivalent states",
  
  steps: [
    {
      step: 0,
      title: "Initial DFA Analysis",
      description: "Start with the DFA from subset construction",
      computation: {
        states: ['q0', 'q1', 'q2', 'q3', 'q4'],
        acceptingStates: ['q1', 'q2', 'q3'],
        nonAcceptingStates: ['q0', 'q4']
      },
      result: "DFA has 5 states total: 3 accepting, 2 non-accepting"
    },
    {
      step: 1,
      title: "Remove Unreachable States",
      description: "Identify states that cannot be reached from start state",
      analysis: [
        "q0 → START (reachable)",
        "q1 → reachable via q0 --[letter]--> q1",
        "q2 → reachable via q0 --[underscore]--> q2",
        "q3 → reachable via q1 or q2 --[any symbol]--> q3",
        "q4 → reachable via q0 --[digit]--> q4"
      ],
      unreachableStates: [],
      result: "✓ All 5 states are reachable - none removed"
    },
    {
      step: 2,
      title: "Initial Partition - Split Accepting and Non-Accepting",
      description: "Partition states based on accepting vs non-accepting",
      computation: [
        "P₀ = { {q1, q2, q3}, {q0, q4} }",
        "",
        "Partition 1 (Accepting): {q1, q2, q3}",
        "Partition 2 (Non-accepting): {q0, q4}"
      ],
      partitions: [
        { id: 'P1', states: ['q1', 'q2', 'q3'], type: 'accepting' },
        { id: 'P2', states: ['q0', 'q4'], type: 'non-accepting' }
      ],
      result: "Initial partitions: P₀ = { {q1,q2,q3}, {q0,q4} }"
    },
    {
      step: 3,
      title: "Refine Partition 1: {q1, q2, q3}",
      description: "Check if q1, q2, q3 are equivalent by testing all transitions",
      analysis: {
        checkEquivalence: "States are equivalent if they transition to the same partition on all symbols",
        transitions: [
          {
            state: 'q1',
            letter: 'q3 (→ P1)',
            digit: 'q3 (→ P1)',
            underscore: 'q3 (→ P1)',
            signature: 'P1, P1, P1'
          },
          {
            state: 'q2',
            letter: 'q3 (→ P1)',
            digit: 'q3 (→ P1)',
            underscore: 'q3 (→ P1)',
            signature: 'P1, P1, P1'
          },
          {
            state: 'q3',
            letter: 'q3 (→ P1)',
            digit: 'q3 (→ P1)',
            underscore: 'q3 (→ P1)',
            signature: 'P1, P1, P1'
          }
        ]
      },
      conclusion: "All three states (q1, q2, q3) have identical transition signatures: (P1, P1, P1)",
      equivalence: "q1 ≡ q2 ≡ q3 (EQUIVALENT - can be merged!)",
      result: "Partition {q1, q2, q3} cannot be refined further - all states equivalent"
    },
    {
      step: 4,
      title: "Refine Partition 2: {q0, q4}",
      description: "Check if q0 and q4 are equivalent",
      analysis: {
        transitions: [
          {
            state: 'q0',
            letter: 'q1 (→ P1)',
            digit: 'q4 (→ P2)',
            underscore: 'q2 (→ P1)',
            signature: 'P1, P2, P1'
          },
          {
            state: 'q4',
            letter: 'q4 (→ P2)',
            digit: 'q4 (→ P2)',
            underscore: 'q4 (→ P2)',
            signature: 'P2, P2, P2'
          }
        ]
      },
      conclusion: "q0 and q4 have DIFFERENT transition signatures",
      comparison: "q0: (P1, P2, P1) ≠ q4: (P2, P2, P2)",
      equivalence: "q0 ≢ q4 (NOT EQUIVALENT - must split!)",
      newPartitions: [
        { id: 'P2a', states: ['q0'], signature: 'P1, P2, P1' },
        { id: 'P2b', states: ['q4'], signature: 'P2, P2, P2' }
      ],
      result: "Split partition into {q0} and {q4}"
    },
    {
      step: 5,
      title: "Updated Partitions after Refinement",
      description: "New partition set after first iteration",
      computation: [
        "P₁ = { {q1, q2, q3}, {q0}, {q4} }",
        "",
        "Partition 1: {q1, q2, q3} - accepting, equivalent states",
        "Partition 2: {q0} - start state (non-accepting)",
        "Partition 3: {q4} - error state (non-accepting)"
      ],
      partitions: [
        { id: 'P1', states: ['q1', 'q2', 'q3'], canMerge: true },
        { id: 'P2', states: ['q0'], canMerge: false },
        { id: 'P3', states: ['q4'], canMerge: false }
      ],
      result: "3 partitions after refinement"
    },
    {
      step: 6,
      title: "Second Iteration - Check if Further Refinement Needed",
      description: "Re-check all partitions with updated partition set",
      checks: [
        {
          partition: '{q1, q2, q3}',
          check: "All states still have identical signatures with new partitions",
          result: "No split needed"
        },
        {
          partition: '{q0}',
          check: "Single state - cannot be refined",
          result: "No split needed"
        },
        {
          partition: '{q4}',
          check: "Single state - cannot be refined",
          result: "No split needed"
        }
      ],
      result: "✓ No further refinement possible - algorithm terminates"
    },
    {
      step: 7,
      title: "State Merging - Create Minimized DFA",
      description: "Merge equivalent states into single states",
      merging: [
        {
          originalStates: ['q1', 'q2', 'q3'],
          newState: 'qACC',
          reason: "Equivalent accepting states - merge into single state",
          action: "Merge q1, q2, q3 → qACC"
        },
        {
          originalStates: ['q0'],
          newState: 'q0',
          reason: "Start state - keep as-is",
          action: "Keep q0"
        },
        {
          originalStates: ['q4'],
          newState: 'qREJ',
          reason: "Error state - rename for clarity",
          action: "Rename q4 → qREJ"
        }
      ],
      stateMapping: {
        'q0': 'q0',
        'q1': 'qACC',
        'q2': 'qACC',
        'q3': 'qACC',
        'q4': 'qREJ'
      },
      result: "Minimized DFA has 3 states (reduced from 5)"
    },
    {
      step: 8,
      title: "Build Minimized Transition Table",
      description: "Reconstruct transitions using merged states",
      construction: [
        "For q0:",
        "  δ'(q0, letter) = δ(q0, letter) = q1 → qACC",
        "  δ'(q0, digit) = δ(q0, digit) = q4 → qREJ",
        "  δ'(q0, underscore) = δ(q0, underscore) = q2 → qACC",
        "",
        "For qACC (merged from q1, q2, q3):",
        "  Use q1's transitions (all equivalent):",
        "  δ'(qACC, letter) = δ(q1, letter) = q3 → qACC",
        "  δ'(qACC, digit) = δ(q1, digit) = q3 → qACC",
        "  δ'(qACC, underscore) = δ(q1, underscore) = q3 → qACC",
        "",
        "For qREJ:",
        "  δ'(qREJ, letter) = δ(q4, letter) = q4 → qREJ",
        "  δ'(qREJ, digit) = δ(q4, digit) = q4 → qREJ",
        "  δ'(qREJ, underscore) = δ(q4, underscore) = q4 → qREJ"
      ],
      result: "All transitions successfully mapped to minimized states"
    },
    {
      step: 9,
      title: "Final Comparison",
      description: "Compare original DFA with minimized DFA",
      comparison: {
        originalDFA: {
          states: 5,
          acceptingStates: 3,
          transitions: 15
        },
        minimizedDFA: {
          states: 3,
          acceptingStates: 1,
          transitions: 9
        },
        reduction: {
          statesReduced: 2,
          percentReduction: '40%',
          transitionsReduced: 6
        }
      },
      result: "✓ Minimized DFA has 40% fewer states (3 vs 5)"
    }
  ],
  
  conclusion: {
    success: true,
    originalStates: 5,
    minimizedStates: 3,
    equivalentStates: "q1 ≡ q2 ≡ q3 (merged into qACC)",
    observation: "The DFA had redundant states for 'after letter' and 'after underscore' that could be merged since their behavior is identical after the first character."
  }
}

// ============================================================================
// MINIMIZED DFA FORMAL DEFINITION
// ============================================================================

/**
 * Minimized DFA for Identifier Recognition
 * 
 * Reduced from 5 states to 3 states by merging equivalent states
 */
export const MINIMIZED_DFA: DFADefinition = {
  // Q_min: Minimized set of states
  Q: ['q0', 'qACC', 'qREJ'],

  // Σ: Alphabet (unchanged)
  Σ: ['letter', 'digit', 'underscore'],

  // q0: Start state (unchanged)
  q0: 'q0',

  // F_min: Accepting states (merged)
  F: ['qACC'],

  // δ_min: Minimized transition function
  δ: {
    'q0': {
      'letter': 'qACC',       // q0 --[letter]--> qACC
      'digit': 'qREJ',        // q0 --[digit]--> qREJ
      'underscore': 'qACC'    // q0 --[underscore]--> qACC
    },
    'qACC': {
      'letter': 'qACC',       // qACC --[letter]--> qACC (loop)
      'digit': 'qACC',        // qACC --[digit]--> qACC (loop)
      'underscore': 'qACC'    // qACC --[underscore]--> qACC (loop)
    },
    'qREJ': {
      'letter': 'qREJ',       // qREJ --[letter]--> qREJ (trap)
      'digit': 'qREJ',        // qREJ --[digit]--> qREJ (trap)
      'underscore': 'qREJ'    // qREJ --[underscore]--> qREJ (trap)
    }
  }
}

// ============================================================================
// MINIMIZED DFA TRANSITION TABLE
// ============================================================================

export const MINIMIZED_DFA_TRANSITION_TABLE = {
  title: "Minimized DFA Transition Table",
  description: "Reduced from 5 states to 3 states",
  
  headers: ['State', 'letter [a-zA-Z]', 'digit [0-9]', 'underscore [_]', 'Accepting?'],
  
  rows: [
    {
      state: 'q0',
      letter: 'qACC',
      digit: 'qREJ',
      underscore: 'qACC',
      accepting: '✗',
      description: 'Start state'
    },
    {
      state: 'qACC',
      letter: 'qACC',
      digit: 'qACC',
      underscore: 'qACC',
      accepting: '✓',
      description: 'Accepting state (merged q1, q2, q3)'
    },
    {
      state: 'qREJ',
      letter: 'qREJ',
      digit: 'qREJ',
      underscore: 'qREJ',
      accepting: '✗',
      description: 'Reject/trap state'
    }
  ]
}

// ============================================================================
// STATE EQUIVALENCE ANALYSIS
// ============================================================================

export const EQUIVALENCE_ANALYSIS = {
  title: "State Equivalence Analysis",
  description: "Detailed proof of which states are equivalent",
  
  equivalenceClasses: [
    {
      class: "Class 1: {q1, q2, q3}",
      states: ['q1', 'q2', 'q3'],
      equivalent: true,
      proof: [
        "Step 1: All three states are accepting ✓",
        "Step 2: Check transition behavior:",
        "  • q1 on letter → q3 (accepting)",
        "  • q2 on letter → q3 (accepting)",
        "  • q3 on letter → q3 (accepting)",
        "  Same destination partition!",
        "",
        "  • q1 on digit → q3 (accepting)",
        "  • q2 on digit → q3 (accepting)",
        "  • q3 on digit → q3 (accepting)",
        "  Same destination partition!",
        "",
        "  • q1 on underscore → q3 (accepting)",
        "  • q2 on underscore → q3 (accepting)",
        "  • q3 on underscore → q3 (accepting)",
        "  Same destination partition!",
        "",
        "Conclusion: q1, q2, q3 behave identically → EQUIVALENT"
      ],
      mergedInto: "qACC"
    },
    {
      class: "Class 2: {q0}",
      states: ['q0'],
      equivalent: false,
      proof: [
        "Single-state class - no equivalence check needed",
        "q0 is the start state with unique transition pattern:",
        "  • q0 on letter → q1 (accepting)",
        "  • q0 on digit → q4 (non-accepting)",
        "  • q0 on underscore → q2 (accepting)",
        "This pattern is unique - not equivalent to any other state"
      ],
      mergedInto: "q0 (unchanged)"
    },
    {
      class: "Class 3: {q4}",
      states: ['q4'],
      equivalent: false,
      proof: [
        "Single-state class - no equivalence check needed",
        "q4 is the error/trap state:",
        "  • q4 on any symbol → q4 (loop to itself)",
        "  • q4 is non-accepting",
        "Different from q0 since q0 can transition to accepting states"
      ],
      mergedInto: "qREJ"
    }
  ],
  
  distinguishabilityTable: {
    description: "Which state pairs are distinguishable?",
    pairs: [
      { pair: '(q0, q1)', distinguishable: true, reason: 'q0 non-accepting, q1 accepting' },
      { pair: '(q0, q2)', distinguishable: true, reason: 'q0 non-accepting, q2 accepting' },
      { pair: '(q0, q3)', distinguishable: true, reason: 'q0 non-accepting, q3 accepting' },
      { pair: '(q0, q4)', distinguishable: true, reason: 'Different transition patterns' },
      { pair: '(q1, q2)', distinguishable: false, reason: 'Both accepting, identical transitions' },
      { pair: '(q1, q3)', distinguishable: false, reason: 'Both accepting, identical transitions' },
      { pair: '(q1, q4)', distinguishable: true, reason: 'q1 accepting, q4 non-accepting' },
      { pair: '(q2, q3)', distinguishable: false, reason: 'Both accepting, identical transitions' },
      { pair: '(q2, q4)', distinguishable: true, reason: 'q2 accepting, q4 non-accepting' },
      { pair: '(q3, q4)', distinguishable: true, reason: 'q3 accepting, q4 non-accepting' }
    ]
  }
}

// ============================================================================
// COMPARISON: ORIGINAL DFA vs MINIMIZED DFA
// ============================================================================

export const DFA_MINIMIZATION_COMPARISON = {
  title: "DFA Before and After Minimization",
  
  metrics: [
    {
      metric: "Total States",
      original: "5 states (q0, q1, q2, q3, q4)",
      minimized: "3 states (q0, qACC, qREJ)",
      improvement: "40% reduction"
    },
    {
      metric: "Accepting States",
      original: "3 states (q1, q2, q3)",
      minimized: "1 state (qACC)",
      improvement: "Merged 3 → 1"
    },
    {
      metric: "Transitions",
      original: "15 transitions (5 states × 3 symbols)",
      minimized: "9 transitions (3 states × 3 symbols)",
      improvement: "40% reduction"
    },
    {
      metric: "Space Complexity",
      original: "O(5) state storage",
      minimized: "O(3) state storage",
      improvement: "Smaller memory footprint"
    },
    {
      metric: "Time Complexity",
      original: "O(n) - linear in input length",
      minimized: "O(n) - linear in input length",
      improvement: "Same (minimization doesn't change time complexity)"
    }
  ],
  
  stateMapping: {
    description: "How original states map to minimized states",
    mappings: [
      { original: 'q0', minimized: 'q0', note: 'Start state (unchanged)' },
      { original: 'q1', minimized: 'qACC', note: 'Merged with q2, q3' },
      { original: 'q2', minimized: 'qACC', note: 'Merged with q1, q3' },
      { original: 'q3', minimized: 'qACC', note: 'Merged with q1, q2' },
      { original: 'q4', minimized: 'qREJ', note: 'Error state (renamed)' }
    ]
  },
  
  languageEquivalence: {
    statement: "L(DFA_original) = L(DFA_minimized)",
    proof: "Both DFAs accept the same language: identifiers matching (letter|_)(letter|digit|_)*",
    testCases: [
      { input: 'x', originalTrace: 'q0→q1', minimizedTrace: 'q0→qACC', both: 'ACCEPT' },
      { input: '_temp', originalTrace: 'q0→q2→q3→q3→q3→q3', minimizedTrace: 'q0→qACC→qACC→qACC→qACC→qACC', both: 'ACCEPT' },
      { input: 'value123', originalTrace: 'q0→q1→q3→...→q3', minimizedTrace: 'q0→qACC→qACC→...→qACC', both: 'ACCEPT' },
      { input: '9abc', originalTrace: 'q0→q4', minimizedTrace: 'q0→qREJ', both: 'REJECT' }
    ]
  }
}

// ============================================================================
// MINIMIZED DFA STATE DESCRIPTIONS
// ============================================================================

export const MINIMIZED_STATE_DESCRIPTIONS = {
  q0: {
    name: "Start State",
    description: "Initial state - validates first character of identifier",
    accepting: false,
    originalStates: ['q0'],
    behavior: "Branches to qACC on letter/underscore, qREJ on digit"
  },
  qACC: {
    name: "Accept State",
    description: "Valid identifier state - loops on any valid identifier character",
    accepting: true,
    originalStates: ['q1', 'q2', 'q3'],
    behavior: "Loops to itself on letter, digit, or underscore. Represents all continuation after valid start."
  },
  qREJ: {
    name: "Reject State",
    description: "Error/trap state - invalid identifier detected",
    accepting: false,
    originalStates: ['q4'],
    behavior: "Loops to itself forever - no escape once entered"
  }
}

// ============================================================================
// MINIMIZED DFA FORMAL NOTATION
// ============================================================================

export const MINIMIZED_DFA_FORMAL_NOTATION = `
MINIMIZED DFA FORMAL DEFINITION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

M_min = (Q_min, Σ, δ_min, q0, F_min)

Where:

1. Q_min = {q0, qACC, qREJ}
   Minimized set of states (reduced from 5 to 3)

2. Σ = {letter, digit, underscore}
   Input alphabet (unchanged)

3. δ_min: Q_min × Σ → Q_min
   Minimized transition function:
   
   δ_min(q0, letter) = qACC
   δ_min(q0, digit) = qREJ
   δ_min(q0, underscore) = qACC
   
   δ_min(qACC, letter) = qACC
   δ_min(qACC, digit) = qACC
   δ_min(qACC, underscore) = qACC
   
   δ_min(qREJ, letter) = qREJ
   δ_min(qREJ, digit) = qREJ
   δ_min(qREJ, underscore) = qREJ

4. q0 ∈ Q_min
   Start state (unchanged)

5. F_min = {qACC}
   Single accepting state (merged from {q1, q2, q3})

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STATE REDUCTION:
Original: 5 states → Minimized: 3 states (40% reduction)

EQUIVALENCE:
L(M_min) = L(M) = { w ∈ Σ* | w = (letter|_)(letter|digit|_)* }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Simulate minimized DFA execution
 */
export function simulateMinimizedDFA(input: string): {
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
      // Invalid character
      currentState = 'qREJ'
      trace.push(currentState)
      symbols.push(`invalid(${char})`)
      continue
    }
    
    symbols.push(symbol)
    currentState = MINIMIZED_DFA.δ[currentState][symbol]
    trace.push(currentState)
  }
  
  const accepted = MINIMIZED_DFA.F.includes(currentState)
  return { accepted, trace, symbols, finalState: currentState }
}

/**
 * Get minimized DFA transition
 */
export function getMinimizedTransition(state: string, symbol: string): string {
  return MINIMIZED_DFA.δ[state]?.[symbol] || 'qREJ'
}

/**
 * Check if minimized state is accepting
 */
export function isMinimizedAcceptingState(state: string): boolean {
  return MINIMIZED_DFA.F.includes(state)
}

/**
 * Map original DFA state to minimized state
 */
export function mapToMinimizedState(originalState: string): string {
  const mapping: { [key: string]: string } = {
    'q0': 'q0',
    'q1': 'qACC',
    'q2': 'qACC',
    'q3': 'qACC',
    'q4': 'qREJ'
  }
  return mapping[originalState] || 'qREJ'
}
