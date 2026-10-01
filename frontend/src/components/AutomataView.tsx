import { Link } from 'react-router-dom'
import Logo from './Logo'
import Footer from './Footer'

/**
 * AutomataView Component
 * 
 * Displays side-by-side comparison of NFA and Minimized DFA
 * with state diagrams, showing the conversion from parallel paths
 * to a minimal scan.
 */
export default function AutomataView() {
  return (
    <div className="automata-root">
      {/* Header */}
      <header className="automata-header">
        <div className="automata-container">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="automata-nav">
            <Link to="/app" className="nav-link">Analyzer</Link>
            <Link to="/docs/how-it-works" className="nav-link">Docs</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="automata-main">
        <div className="automata-container">
          {/* Page Title */}
          <div className="automata-intro">
            <p className="eyebrow">AUTOMATA VIEW</p>
            <h1 className="automata-title">From parallel paths to a minimal scan.</h1>
            <p className="automata-description">
              The NFA recognizes several valid paths at once. The minimized DFA merges equivalent 
              paths into four deterministic states for fast token recognition.
            </p>
          </div>

          {/* Two-Column Diagram Layout */}
          <div className="automata-grid">
            {/* NFA Card */}
            <div className="automata-card">
              <div className="automata-card-header">
                <div>
                  <h3 className="automata-card-title">NFA</h3>
                  <p className="automata-card-label">NON-DETERMINISTIC</p>
                </div>
                <div className="automata-state-count">5 states</div>
              </div>

              {/* NFA Diagram */}
              <svg className="automata-diagram" viewBox="0 0 520 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Start arrow */}
                <path d="M 20 140 L 60 140" stroke="#6b7b82" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* q0 (start state) */}
                <circle cx="90" cy="140" r="28" fill="white" stroke="#14586b" strokeWidth="2.5" />
                <text x="90" y="145" textAnchor="middle" fill="#1a2226" fontSize="16" fontWeight="600">q0</text>

                {/* q0 → q1 (letter) */}
                <path d="M 118 125 Q 180 80, 220 100" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                <text x="170" y="85" fill="#6b7b82" fontSize="11" fontFamily="DM Mono">letter</text>

                {/* q0 → q2 (underscore) */}
                <path d="M 118 155 Q 180 200, 220 180" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                <text x="165" y="210" fill="#6b7b82" fontSize="11" fontFamily="DM Mono">_</text>

                {/* q0 → q4 (digit) - going down */}
                <path d="M 90 168 L 90 210" stroke="#c59b75" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrowhead-error)" />
                <text x="100" y="195" fill="#6b7b82" fontSize="11" fontFamily="DM Mono">digit</text>

                {/* q1 (accepting) */}
                <circle cx="250" cy="90" r="28" fill="white" stroke="#14586b" strokeWidth="2.5" />
                <circle cx="250" cy="90" r="23" fill="none" stroke="#14586b" strokeWidth="1.5" />
                <text x="250" y="95" textAnchor="middle" fill="#1a2226" fontSize="16" fontWeight="600">q1</text>

                {/* q2 (accepting) */}
                <circle cx="250" cy="190" r="28" fill="white" stroke="#14586b" strokeWidth="2.5" />
                <circle cx="250" cy="190" r="23" fill="none" stroke="#14586b" strokeWidth="1.5" />
                <text x="250" y="195" textAnchor="middle" fill="#1a2226" fontSize="16" fontWeight="600">q2</text>

                {/* q1 → q3 */}
                <path d="M 278 90 L 360 90" stroke="#14586b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="315" y="82" fill="#6b7b82" fontSize="11" fontFamily="DM Mono">letter, digit, _</text>

                {/* q2 → q3 */}
                <path d="M 278 190 L 360 190" stroke="#14586b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="315" y="205" fill="#6b7b82" fontSize="11" fontFamily="DM Mono">letter, digit, _</text>

                {/* q3 (accepting, with self-loop) */}
                <circle cx="390" cy="140" r="28" fill="white" stroke="#14586b" strokeWidth="2.5" />
                <circle cx="390" cy="140" r="23" fill="none" stroke="#14586b" strokeWidth="1.5" />
                <text x="390" y="145" textAnchor="middle" fill="#1a2226" fontSize="16" fontWeight="600">q3</text>

                {/* q3 self-loop */}
                <path d="M 415 125 Q 440 120, 440 140 Q 440 160, 415 155" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
                <text x="448" y="145" fill="#6b7b82" fontSize="11" fontFamily="DM Mono">letter,</text>
                <text x="448" y="158" fill="#6b7b82" fontSize="11" fontFamily="DM Mono">digit, _</text>

                {/* q4 (error/reject state) */}
                <circle cx="90" cy="240" r="28" fill="#fff5f5" stroke="#c59b75" strokeWidth="2.5" />
                <text x="90" y="245" textAnchor="middle" fill="#8b5a3c" fontSize="16" fontWeight="600">q4</text>

                {/* q4 self-loop */}
                <path d="M 65 255 Q 50 270, 65 280 Q 80 285, 90 280" stroke="#c59b75" strokeWidth="2" strokeDasharray="4 3" fill="none" markerEnd="url(#arrowhead-error)" />
                <text x="30" y="280" fill="#8b5a3c" fontSize="11" fontFamily="DM Mono">any</text>

                {/* Arrow markers */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#14586b" />
                  </marker>
                  <marker id="arrowhead-error" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#c59b75" />
                  </marker>
                </defs>
              </svg>

              {/* Legend */}
              <div className="automata-legend">
                <div className="automata-legend-item">
                  <div className="legend-circle legend-start"></div>
                  <span>start</span>
                </div>
                <div className="automata-legend-item">
                  <div className="legend-circle legend-accepting"></div>
                  <span>accepting</span>
                </div>
                <div className="automata-legend-item">
                  <div className="legend-circle legend-reject"></div>
                  <span>reject</span>
                </div>
              </div>
            </div>

            {/* Arrow between cards */}
            <div className="automata-arrow">
              <div className="arrow-label">minimize</div>
              <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
                <path d="M 5 20 L 45 20" stroke="#14586b" strokeWidth="2" markerEnd="url(#arrow-minimize)" />
                <defs>
                  <marker id="arrow-minimize" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#14586b" />
                  </marker>
                </defs>
              </svg>
              <div className="arrow-sublabel">5 → 4 states</div>
            </div>

            {/* Minimized DFA Card */}
            <div className="automata-card">
              <div className="automata-card-header">
                <div>
                  <h3 className="automata-card-title">MINIMIZED DFA</h3>
                  <p className="automata-card-label">DETERMINISTIC</p>
                </div>
                <div className="automata-state-count">4 states</div>
              </div>

              {/* Minimized DFA Diagram */}
              <svg className="automata-diagram" viewBox="0 0 520 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Start arrow */}
                <path d="M 20 140 L 60 140" stroke="#6b7b82" strokeWidth="2" markerEnd="url(#arrowhead2)" />

                {/* q0 (start state) */}
                <circle cx="90" cy="140" r="28" fill="white" stroke="#14586b" strokeWidth="2.5" />
                <text x="90" y="145" textAnchor="middle" fill="#1a2226" fontSize="16" fontWeight="600">q0</text>

                {/* q0 → qACC (letter, _) - curved up */}
                <path d="M 115 125 Q 200 90, 280 120" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)" />
                <text x="190" y="100" fill="#6b7b82" fontSize="11" fontFamily="DM Mono">letter, _</text>

                {/* q0 → qREJ (digit) - straight down */}
                <path d="M 90 168 L 90 212" stroke="#c59b75" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrowhead-error2)" />
                <text x="100" y="195" fill="#6b7b82" fontSize="11" fontFamily="DM Mono">digit</text>

                {/* qACC (accepting, large merged state) */}
                <circle cx="310" cy="140" r="32" fill="white" stroke="#14586b" strokeWidth="2.5" />
                <circle cx="310" cy="140" r="27" fill="none" stroke="#14586b" strokeWidth="1.5" />
                <text x="310" y="146" textAnchor="middle" fill="#1a2226" fontSize="15" fontWeight="600">qACC</text>

                {/* qACC self-loop (top right) */}
                <path d="M 338 125 Q 370 115, 375 140 Q 375 165, 338 155" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#arrowhead2)" />
                <text x="383" y="135" fill="#6b7b82" fontSize="11" fontFamily="DM Mono">letter,</text>
                <text x="383" y="148" fill="#6b7b82" fontSize="11" fontFamily="DM Mono">digit, _</text>

                {/* qREJ (error/reject state) */}
                <circle cx="90" cy="240" r="28" fill="#fff5f5" stroke="#c59b75" strokeWidth="2.5" />
                <text x="90" y="246" textAnchor="middle" fill="#8b5a3c" fontSize="15" fontWeight="600">qREJ</text>

                {/* qREJ self-loop */}
                <path d="M 65 255 Q 50 270, 65 280 Q 80 285, 90 280" stroke="#c59b75" strokeWidth="2" strokeDasharray="4 3" fill="none" markerEnd="url(#arrowhead-error2)" />
                <text x="30" y="280" fill="#8b5a3c" fontSize="11" fontFamily="DM Mono">any</text>

                {/* Arrow markers */}
                <defs>
                  <marker id="arrowhead2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#14586b" />
                  </marker>
                  <marker id="arrowhead-error2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#c59b75" />
                  </marker>
                </defs>
              </svg>

              {/* Legend */}
              <div className="automata-legend">
                <div className="automata-legend-item">
                  <div className="legend-circle legend-start"></div>
                  <span>start</span>
                </div>
                <div className="automata-legend-item">
                  <div className="legend-circle legend-accepting"></div>
                  <span>accepting</span>
                </div>
                <div className="automata-legend-item">
                  <div className="legend-circle legend-reject"></div>
                  <span>reject</span>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="automata-explanation">
            <div className="explanation-col">
              <h3 className="explanation-title">Pattern Recognition</h3>
              <p className="explanation-text">
                Both automata recognize valid identifiers matching the pattern:
                <code>(letter|_)(letter|digit|_)*</code>
              </p>
              <p className="explanation-text">
                Valid identifiers must start with a letter or underscore, followed by any 
                combination of letters, digits, or underscores.
              </p>
            </div>

            <div className="explanation-col">
              <h3 className="explanation-title">State Minimization</h3>
              <p className="explanation-text">
                The minimization process merged equivalent states q1, q2, and q3 into a single 
                accepting state <strong>qACC</strong>, reducing the DFA from 5 to 4 states.
              </p>
              <p className="explanation-text">
                This optimization maintains the same language recognition while improving 
                performance with fewer state transitions.
              </p>
            </div>

            <div className="explanation-col">
              <h3 className="explanation-title">Error Handling</h3>
              <p className="explanation-text">
                Both automata include an error state (q4/qREJ) that traps invalid identifiers, 
                such as those starting with a digit.
              </p>
              <p className="explanation-text">
                Once in the reject state, the automaton remains there for the rest of the input, 
                ensuring clear rejection of invalid tokens.
              </p>
            </div>
          </div>

          {/* Test Cases Section */}
          <div className="automata-tests">
            <h3 className="tests-title">Test Cases</h3>
            
            <div className="tests-grid">
              <div className="tests-column">
                <h4 className="tests-subtitle">✓ Accepted Examples</h4>
                <ul className="tests-list">
                  <li><code>x</code> — single letter</li>
                  <li><code>_temp</code> — starts with underscore</li>
                  <li><code>userName</code> — camel case</li>
                  <li><code>user_name</code> — snake case</li>
                  <li><code>value123</code> — letters + digits</li>
                  <li><code>__init__</code> — double underscore</li>
                  <li><code>COUNT</code> — uppercase constant</li>
                  <li><code>x1y2z3</code> — mixed letters and digits</li>
                  <li><code>_privateVar</code> — private variable</li>
                  <li><code>totalCount_2024</code> — complex identifier</li>
                </ul>
              </div>

              <div className="tests-column">
                <h4 className="tests-subtitle">✗ Rejected Examples</h4>
                <ul className="tests-list tests-list-reject">
                  <li><code>123abc</code> — starts with digit</li>
                  <li><code>9total</code> — starts with digit</li>
                  <li><code>user-name</code> — contains hyphen</li>
                  <li><code>user name</code> — contains space</li>
                  <li><code>total$</code> — contains dollar sign</li>
                  <li><code>#count</code> — starts with hash</li>
                  <li><code>user.name</code> — contains dot</li>
                  <li><code>@variable</code> — starts with at-sign</li>
                  <li><code>value!</code> — contains exclamation</li>
                  <li><code>""</code> — empty string</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="automata-cta">
            <h3 className="cta-title">Try the Analyzer</h3>
            <p className="cta-text">
              Test these automata in action with the interactive lexical analyzer.
            </p>
            <Link to="/app" className="btn btn-primary">
              Open Analyzer →
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
