/**
 * COMPREHENSIVE TEST SUITE FOR DFA-BASED LEXICAL ANALYZER
 * 
 * Tests 20 examples: 10 accepted (valid) and 10 rejected (invalid)
 * Verifies correct tokenization and state transitions
 */

import { tokenize, validateToken, validateAlphabet } from '../dfaLexer'

// ============================================================================
// TEST CASE DEFINITIONS
// ============================================================================

export interface TestCase {
  id: string
  category: string
  input: string
  expected: 'accept' | 'reject'
  description: string
  reason: string
}

// ── ACCEPTED TEST CASES (Valid Inputs) ──────────────────────────────────────

export const ACCEPTED_TESTS: TestCase[] = [
  {
    id: 'A1',
    category: 'Identifier',
    input: 'x',
    expected: 'accept',
    description: 'Single letter identifier',
    reason: 'Matches (letter|_)(letter|digit|_)* with single letter'
  },
  {
    id: 'A2',
    category: 'Identifier',
    input: '_temp',
    expected: 'accept',
    description: 'Identifier starting with underscore',
    reason: 'Valid start character (_) followed by letters'
  },
  {
    id: 'A3',
    category: 'Identifier',
    input: 'userName',
    expected: 'accept',
    description: 'Camel case identifier',
    reason: 'Letter followed by letters (mixed case)'
  },
  {
    id: 'A4',
    category: 'Identifier',
    input: 'user_name',
    expected: 'accept',
    description: 'Snake case identifier',
    reason: 'Letters and underscores'
  },
  {
    id: 'A5',
    category: 'Identifier',
    input: 'value123',
    expected: 'accept',
    description: 'Identifier with digits',
    reason: 'Letter followed by letters and digits'
  },
  {
    id: 'A6',
    category: 'Mixed',
    input: 'let total = 42;',
    expected: 'accept',
    description: 'Complete statement with keyword, identifier, operator, number',
    reason: 'All tokens valid: keyword(let), identifier(total), operator(=), number(42), punctuation(;)'
  },
  {
    id: 'A7',
    category: 'String',
    input: '"hello world"',
    expected: 'accept',
    description: 'Double-quoted string with space',
    reason: 'Valid string literal with matching quotes'
  },
  {
    id: 'A8',
    category: 'Mixed',
    input: 'function add(a, b) { return a + b; }',
    expected: 'accept',
    description: 'Function declaration',
    reason: 'Keywords, identifiers, delimiters, operators all valid'
  },
  {
    id: 'A9',
    category: 'Identifier',
    input: '__init__',
    expected: 'accept',
    description: 'Double underscore identifier',
    reason: 'Valid Python-style dunder method name'
  },
  {
    id: 'A10',
    category: 'Mixed',
    input: 'const PI = 3.14;',
    expected: 'accept',
    description: 'Constant declaration with float',
    reason: 'Keyword, identifier, operator, float number, punctuation all valid'
  }
]

// ── REJECTED TEST CASES (Invalid Inputs) ────────────────────────────────────

export const REJECTED_TESTS: TestCase[] = [
  {
    id: 'R1',
    category: 'Identifier',
    input: '123abc',
    expected: 'reject',
    description: 'Identifier starting with digit',
    reason: 'Violates rule: identifiers must start with letter or underscore'
  },
  {
    id: 'R2',
    category: 'Identifier',
    input: '9total',
    expected: 'reject',
    description: 'Identifier starting with digit',
    reason: 'DFA transitions to qREJ from q0 on digit as first character'
  },
  {
    id: 'R3',
    category: 'Identifier',
    input: 'user-name',
    expected: 'reject',
    description: 'Identifier with hyphen',
    reason: 'Hyphen (-) not in alphabet Σ for identifiers'
  },
  {
    id: 'R4',
    category: 'Identifier',
    input: 'user name',
    expected: 'reject',
    description: 'Identifier with space',
    reason: 'Space breaks identifier into two separate tokens'
  },
  {
    id: 'R5',
    category: 'Identifier',
    input: 'total$',
    expected: 'reject',
    description: 'Identifier with dollar sign',
    reason: 'Dollar sign ($) not in identifier alphabet'
  },
  {
    id: 'R6',
    category: 'Identifier',
    input: '#count',
    expected: 'reject',
    description: 'Identifier starting with hash',
    reason: 'Hash (#) not valid as first character or in identifier'
  },
  {
    id: 'R7',
    category: 'Identifier',
    input: '@variable',
    expected: 'reject',
    description: 'Identifier starting with at-sign',
    reason: 'At-sign (@) not in alphabet Σ'
  },
  {
    id: 'R8',
    category: 'String',
    input: "'unterminated",
    expected: 'reject',
    description: 'Unterminated string literal',
    reason: 'Missing closing quote - string DFA cannot reach accept state'
  },
  {
    id: 'R9',
    category: 'Number',
    input: '3.14.15',
    expected: 'reject',
    description: 'Number with multiple decimal points',
    reason: 'Invalid number format - only one decimal point allowed'
  },
  {
    id: 'R10',
    category: 'Mixed',
    input: 'value!',
    expected: 'reject',
    description: 'Identifier followed by invalid character',
    reason: 'Exclamation not followed by = (not valid standalone operator)'
  }
]

export const ALL_TESTS = [...ACCEPTED_TESTS, ...REJECTED_TESTS]

// ============================================================================
// TEST EXECUTION ENGINE
// ============================================================================

export interface TestResult {
  testCase: TestCase
  passed: boolean
  actualResult: 'accept' | 'reject'
  tokens?: any[]
  error?: string
  stateTrace?: string[]
  executionTime: number
}

export interface TestSummary {
  totalTests: number
  passedTests: number
  failedTests: number
  acceptedPassed: number
  acceptedFailed: number
  rejectedPassed: number
  rejectedFailed: number
  results: TestResult[]
  overallPass: boolean
}

/**
 * Run a single test case
 */
export function runTest(testCase: TestCase): TestResult {
  const startTime = performance.now()
  
  try {
    if (testCase.category === 'Identifier') {
      const valResult = validateToken(testCase.input, 'IDENTIFIER')
      const executionTime = performance.now() - startTime
      const actualResult: 'accept' | 'reject' = valResult.valid ? 'accept' : 'reject'
      const passed = actualResult === testCase.expected
      
      return {
        testCase,
        passed,
        actualResult,
        error: !valResult.valid ? valResult.reason : undefined,
        stateTrace: valResult.stateTrace,
        executionTime
      }
    }

    const result = tokenize(testCase.input)
    const executionTime = performance.now() - startTime
    
    if ('error' in result) {
      // Lexer returned error
      const actualResult: 'accept' | 'reject' = 'reject'
      const passed = actualResult === testCase.expected
      
      return {
        testCase,
        passed,
        actualResult,
        error: result.error.message,
        stateTrace: result.error.stateTrace,
        executionTime
      }
    } else {
      // Lexer succeeded
      const actualResult: 'accept' | 'reject' = 'accept'
      const passed = actualResult === testCase.expected
      
      return {
        testCase,
        passed,
        actualResult,
        tokens: result.tokens,
        executionTime
      }
    }
  } catch (error: any) {
    const executionTime = performance.now() - startTime
    
    return {
      testCase,
      passed: false,
      actualResult: 'reject',
      error: error.message || 'Unexpected exception',
      executionTime
    }
  }
}

/**
 * Run all test cases
 */
export function runAllTests(): TestSummary {
  const results: TestResult[] = []
  
  // Run accepted tests
  for (const test of ACCEPTED_TESTS) {
    results.push(runTest(test))
  }
  
  // Run rejected tests
  for (const test of REJECTED_TESTS) {
    results.push(runTest(test))
  }
  
  // Calculate summary statistics
  const totalTests = results.length
  const passedTests = results.filter(r => r.passed).length
  const failedTests = totalTests - passedTests
  
  const acceptedResults = results.filter(r => r.testCase.expected === 'accept')
  const acceptedPassed = acceptedResults.filter(r => r.passed).length
  const acceptedFailed = acceptedResults.length - acceptedPassed
  
  const rejectedResults = results.filter(r => r.testCase.expected === 'reject')
  const rejectedPassed = rejectedResults.filter(r => r.passed).length
  const rejectedFailed = rejectedResults.length - rejectedPassed
  
  const overallPass = failedTests === 0
  
  return {
    totalTests,
    passedTests,
    failedTests,
    acceptedPassed,
    acceptedFailed,
    rejectedPassed,
    rejectedFailed,
    results,
    overallPass
  }
}

/**
 * Run tests for a specific category
 */
export function runTestsByCategory(category: string): TestResult[] {
  const categoryTests = ALL_TESTS.filter(t => t.category === category)
  return categoryTests.map(runTest)
}

/**
 * Run only accepted tests
 */
export function runAcceptedTests(): TestResult[] {
  return ACCEPTED_TESTS.map(runTest)
}

/**
 * Run only rejected tests
 */
export function runRejectedTests(): TestResult[] {
  return REJECTED_TESTS.map(runTest)
}

// ============================================================================
// TEST REPORT FORMATTING
// ============================================================================

/**
 * Generate a human-readable test report
 */
export function generateReport(summary: TestSummary): string {
  let report = ''
  
  report += '═══════════════════════════════════════════════════════════════\n'
  report += '  LEXISCAN LEXICAL ANALYZER - TEST SUITE REPORT\n'
  report += '═══════════════════════════════════════════════════════════════\n\n'
  
  // Summary
  report += `Total Tests:     ${summary.totalTests}\n`
  report += `✓ Passed:        ${summary.passedTests}\n`
  report += `✗ Failed:        ${summary.failedTests}\n\n`
  
  report += `Accepted Tests:  ${summary.acceptedPassed}/${summary.acceptedPassed + summary.acceptedFailed} passed\n`
  report += `Rejected Tests:  ${summary.rejectedPassed}/${summary.rejectedPassed + summary.rejectedFailed} passed\n\n`
  
  report += `Overall Result:  ${summary.overallPass ? '✓ PASS' : '✗ FAIL'}\n`
  report += '───────────────────────────────────────────────────────────────\n\n'
  
  // Individual test results
  report += 'ACCEPTED TEST CASES:\n\n'
  
  summary.results
    .filter(r => r.testCase.expected === 'accept')
    .forEach(result => {
      const status = result.passed ? '✓' : '✗'
      const statusColor = result.passed ? 'PASS' : 'FAIL'
      
      report += `[${result.testCase.id}] ${status} ${statusColor}\n`
      report += `    Input:  "${result.testCase.input}"\n`
      report += `    Desc:   ${result.testCase.description}\n`
      report += `    Result: ${result.actualResult.toUpperCase()}\n`
      
      if (!result.passed) {
        report += `    ⚠ Expected: ${result.testCase.expected.toUpperCase()}, Got: ${result.actualResult.toUpperCase()}\n`
      }
      
      if (result.tokens) {
        report += `    Tokens: ${result.tokens.length} (${result.tokens.map(t => t.type).join(', ')})\n`
      }
      
      if (result.error) {
        report += `    Error:  ${result.error}\n`
      }
      
      report += `    Time:   ${result.executionTime.toFixed(2)}ms\n\n`
    })
  
  report += '\nREJECTED TEST CASES:\n\n'
  
  summary.results
    .filter(r => r.testCase.expected === 'reject')
    .forEach(result => {
      const status = result.passed ? '✓' : '✗'
      const statusColor = result.passed ? 'PASS' : 'FAIL'
      
      report += `[${result.testCase.id}] ${status} ${statusColor}\n`
      report += `    Input:  "${result.testCase.input}"\n`
      report += `    Desc:   ${result.testCase.description}\n`
      report += `    Result: ${result.actualResult.toUpperCase()}\n`
      
      if (!result.passed) {
        report += `    ⚠ Expected: ${result.testCase.expected.toUpperCase()}, Got: ${result.actualResult.toUpperCase()}\n`
      }
      
      if (result.error) {
        report += `    Error:  ${result.error}\n`
      }
      
      if (result.stateTrace) {
        report += `    Trace:  ${result.stateTrace.join(' → ')}\n`
      }
      
      report += `    Time:   ${result.executionTime.toFixed(2)}ms\n\n`
    })
  
  report += '═══════════════════════════════════════════════════════════════\n'
  
  return report
}

/**
 * Generate JSON report
 */
export function generateJSONReport(summary: TestSummary): string {
  return JSON.stringify(summary, null, 2)
}

// ============================================================================
// EXPORT TEST RUNNER
// ============================================================================

/**
 * Main test runner function
 */
export function runLexerTests() {
  console.log('🚀 Starting LexiScan Lexer Test Suite...\n')
  
  const summary = runAllTests()
  const report = generateReport(summary)
  
  console.log(report)
  
  if (summary.overallPass) {
    console.log('✓ All tests passed!')
  } else {
    console.error(`✗ ${summary.failedTests} test(s) failed.`)
  }
  
  return summary
}
