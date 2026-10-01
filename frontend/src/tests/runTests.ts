/**
 * Test Runner Script
 * 
 * Execute this to run all lexer tests and see results
 */

import { runLexerTests } from './lexerTests'

// Run tests
const summary = runLexerTests()

// Exit with appropriate code
if (summary.overallPass) {
  process.exit(0)
} else {
  process.exit(1)
}
