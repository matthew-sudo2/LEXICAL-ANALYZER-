import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import Footer from './Footer'
import { runAllTests, type TestSummary, type TestResult } from '../tests/lexerTests'

export default function TestSuite() {
  const [summary, setSummary] = useState<TestSummary | null>(null)
  const [running, setRunning] = useState(false)
  const [filter, setFilter] = useState<'all' | 'passed' | 'failed'>('all')

  const handleRunTests = () => {
    setRunning(true)
    setSummary(null)
    
    // Run tests with slight delay for UI feedback
    setTimeout(() => {
      const result = runAllTests()
      setSummary(result)
      setRunning(false)
    }, 500)
  }

  // Auto-run tests on component mount
  useEffect(() => {
    handleRunTests()
  }, [])

  const filteredResults = summary?.results.filter(r => {
    if (filter === 'passed') return r.passed
    if (filter === 'failed') return !r.passed
    return true
  }) || []

  return (
    <div className="test-suite-root">
      {/* Header */}
      <header className="test-header">
        <div className="test-container">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="test-nav">
            <Link to="/app" className="nav-link">Analyzer</Link>
            <Link to="/automata" className="nav-link">Automata</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="test-main">
        <div className="test-container">
          {/* Header */}
          <div className="test-intro">
            <p className="eyebrow">TEST SUITE</p>
            <h1 className="test-title">Lexical Analyzer Verification</h1>
            <p className="test-description">
              Comprehensive test suite with 20 examples: 10 accepted (valid inputs) 
              and 10 rejected (invalid inputs) to verify DFA-based tokenization.
            </p>
          </div>

          {/* Run Tests Button */}
          <div className="test-actions">
            <button 
              className="btn btn-primary" 
              onClick={handleRunTests}
              disabled={running}
            >
              {running ? 'Running Tests...' : '▶ Run All Tests'}
            </button>
            
            {summary && !running && (
              <div className="test-filter">
                <button 
                  className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setFilter('all')}
                >
                  All ({summary.totalTests})
                </button>
                <button 
                  className={`btn btn-sm ${filter === 'passed' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setFilter('passed')}
                >
                  Passed ({summary.passedTests})
                </button>
                <button 
                  className={`btn btn-sm ${filter === 'failed' ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setFilter('failed')}
                >
                  Failed ({summary.failedTests})
                </button>
              </div>
            )}
          </div>

          {/* Summary Card */}
          {summary && !running && (
            <div className={`test-summary-card ${summary.overallPass ? 'test-pass' : 'test-fail'}`}>
              <div className="summary-header">
                <div className="summary-badge">
                  {summary.overallPass ? '✓ ALL TESTS PASSED' : '✗ SOME TESTS FAILED'}
                </div>
                <div className="summary-stats">
                  <div className="stat">
                    <span className="stat-value">{summary.passedTests}</span>
                    <span className="stat-label">Passed</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{summary.failedTests}</span>
                    <span className="stat-label">Failed</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{summary.totalTests}</span>
                    <span className="stat-label">Total</span>
                  </div>
                </div>
              </div>

              <div className="summary-breakdown">
                <div className="breakdown-item">
                  <span className="breakdown-label">Accepted Tests:</span>
                  <span className="breakdown-value">
                    {summary.acceptedPassed}/{summary.acceptedPassed + summary.acceptedFailed}
                    <span className="breakdown-percent">
                      ({Math.round((summary.acceptedPassed / (summary.acceptedPassed + summary.acceptedFailed)) * 100)}%)
                    </span>
                  </span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Rejected Tests:</span>
                  <span className="breakdown-value">
                    {summary.rejectedPassed}/{summary.rejectedPassed + summary.rejectedFailed}
                    <span className="breakdown-percent">
                      ({Math.round((summary.rejectedPassed / (summary.rejectedPassed + summary.rejectedFailed)) * 100)}%)
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {running && (
            <div className="test-loading">
              <div className="loading-spinner"></div>
              <p>Running {summary ? 'tests' : '20 test cases'}...</p>
            </div>
          )}

          {/* Test Results */}
          {summary && !running && (
            <div className="test-results">
              <h2 className="results-title">
                Test Results
                <span className="results-count">({filteredResults.length} {filter !== 'all' && filter})</span>
              </h2>

              <div className="results-grid">
                {filteredResults.map((result, idx) => (
                  <div 
                    key={`${result.testCase.id}-${idx}`}
                    className={`test-result-card ${result.passed ? 'result-pass' : 'result-fail'}`}
                  >
                    <div className="result-header">
                      <span className="result-id">{result.testCase.id}</span>
                      <span className={`result-status ${result.passed ? 'status-pass' : 'status-fail'}`}>
                        {result.passed ? '✓ PASS' : '✗ FAIL'}
                      </span>
                    </div>

                    <div className="result-body">
                      <div className="result-category">{result.testCase.category}</div>
                      <h3 className="result-description">{result.testCase.description}</h3>
                      
                      <div className="result-input">
                        <span className="result-input-label">Input:</span>
                        <code>{result.testCase.input}</code>
                      </div>

                      <div className="result-expected">
                        <span className="result-label">Expected:</span>
                        <span className={`result-badge badge-${result.testCase.expected}`}>
                          {result.testCase.expected.toUpperCase()}
                        </span>
                        <span className="result-label">Got:</span>
                        <span className={`result-badge badge-${result.actualResult}`}>
                          {result.actualResult.toUpperCase()}
                        </span>
                      </div>

                      {result.tokens && result.tokens.length > 0 && (
                        <div className="result-tokens">
                          <span className="result-label">Tokens:</span>
                          <div className="token-chips">
                            {result.tokens.map((token, i) => (
                              <span key={i} className="token-chip">
                                {token.type}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {result.error && (
                        <div className="result-error">
                          <span className="result-label">Error:</span>
                          <span className="error-message">{result.error}</span>
                        </div>
                      )}

                      {result.stateTrace && result.stateTrace.length > 0 && (
                        <div className="result-trace">
                          <span className="result-label">State Trace:</span>
                          <div className="trace-path">
                            {result.stateTrace.join(' → ')}
                          </div>
                        </div>
                      )}

                      <div className="result-reason">
                        {result.testCase.reason}
                      </div>

                      <div className="result-footer">
                        <span className="result-time">{result.executionTime.toFixed(2)}ms</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
