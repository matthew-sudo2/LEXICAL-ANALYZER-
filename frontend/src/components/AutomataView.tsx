import { Link } from 'react-router-dom'
import Logo from './Logo'
import Footer from './Footer'

/**
 * AutomataView Component
 * 
 * Displays realistic NFA, DFA, and Minimized DFA diagrams for a
 * multi-pattern lexical analyzer that recognizes:
 * - Identifiers: (letter|_)(letter|digit|_)*
 * - Numbers: digit+(. digit+)?
 * - Strings: quote chars* quote
 * - Operators: single/multi-char operators
 * - Keywords: subset of identifiers
 * 
 * NFA: 15 states (multi-branch non-deterministic)
 * DFA: 15 states (deterministic, from subset construction)
 * Minimized DFA: 10 states (after partition refinement)
 */
export default function AutomataView() {
  return (
    <div className="av-root">
      {/* Header */}
      <header className="av-header">
        <div className="av-container">
          <Link to="/">
            <Logo />
          </Link>
          <nav className="av-nav">
            <Link to="/app" className="nav-link">Analyzer</Link>
            <Link to="/automata/nfa" className="nav-link">NFA</Link>
            <Link to="/automata/dfa" className="nav-link">DFA</Link>
            <Link to="/automata/minimized" className="nav-link">Minimized</Link>
            <Link to="/automata/tables" className="nav-link">Tables</Link>
            <Link to="/docs/how-it-works" className="nav-link">Docs</Link>
            <Link to="/about" className="nav-link">About</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="av-main">
        <div className="av-container">

          {/* ───── Hero Section ───── */}
          <section className="av-hero">
            <p className="eyebrow">AUTOMATA THEORY</p>
            <h1 className="av-hero-title">Multi-Pattern Finite Automata</h1>
            <p className="av-hero-desc">
              Our lexical analyzer uses a multi-pattern NFA that recognizes <strong>5 token categories</strong> simultaneously — 
              identifiers, numbers, strings, operators, and delimiters. The NFA is converted to a DFA via subset 
              construction, then minimized using partition refinement to produce an efficient 10-state scanner.
            </p>
            <div className="av-hero-stats">
              <div className="av-stat">
                <span className="av-stat-number">15</span>
                <span className="av-stat-label">NFA States</span>
              </div>
              <div className="av-stat-divider" />
              <div className="av-stat">
                <span className="av-stat-number">15</span>
                <span className="av-stat-label">DFA States</span>
              </div>
              <div className="av-stat-divider" />
              <div className="av-stat">
                <span className="av-stat-number">10</span>
                <span className="av-stat-label">Min. DFA States</span>
              </div>
              <div className="av-stat-divider" />
              <div className="av-stat">
                <span className="av-stat-number">5</span>
                <span className="av-stat-label">Token Patterns</span>
              </div>
            </div>
          </section>

          {/* ───── Section 1: NFA Diagram ───── */}
          <section className="av-section">
            <div className="av-section-header">
              <div className="av-section-badge">01</div>
              <div>
                <h2 className="av-section-title">NFA — Non-Deterministic Finite Automaton</h2>
                <p className="av-section-subtitle">
                  Multi-pattern NFA with ε-transitions that recognizes all token types in parallel. 
                  The start state branches into 5 parallel paths for each token category.
                </p>
              </div>
            </div>

            <div className="av-diagram-card">
              <div className="av-diagram-meta">
                <div className="av-diagram-label">
                  <span className="av-badge av-badge-nfa">NFA</span>
                  <span className="av-meta-text">M = (Q, Σ, δ, q₀, F) &nbsp;·&nbsp; 15 states &nbsp;·&nbsp; Non-deterministic</span>
                </div>
                <div className="av-pattern-label">Pattern: multi-token recognition</div>
              </div>

              <svg className="av-diagram-svg" viewBox="0 0 960 520" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="nfa-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#14586b" />
                  </marker>
                  <marker id="nfa-arrow-eps" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#8b84a9" />
                  </marker>
                  <marker id="nfa-arrow-err" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#c59b75" />
                  </marker>
                </defs>

                {/* ── Start arrow ── */}
                <path d="M 15 260 L 48 260" stroke="#6b7b82" strokeWidth="2" markerEnd="url(#nfa-arrow)" />

                {/* ── q0: Start state ── */}
                <circle cx="72" cy="260" r="24" fill="white" stroke="#14586b" strokeWidth="2.5" />
                <text x="72" y="265" textAnchor="middle" fill="#1a2226" fontSize="13" fontWeight="600">q₀</text>

                {/* ── ε-transitions from q0 ── */}
                {/* q0 → q1 (Identifier branch) */}
                <path d="M 90 242 Q 140 80, 200 80" stroke="#8b84a9" strokeWidth="1.8" strokeDasharray="5 3" fill="none" markerEnd="url(#nfa-arrow-eps)" />
                <text x="128" y="140" fill="#8b84a9" fontSize="10" fontFamily="DM Mono">ε</text>
                
                {/* q0 → q5 (Number branch) */}
                <path d="M 90 246 Q 140 170, 200 170" stroke="#8b84a9" strokeWidth="1.8" strokeDasharray="5 3" fill="none" markerEnd="url(#nfa-arrow-eps)" />
                <text x="136" y="198" fill="#8b84a9" fontSize="10" fontFamily="DM Mono">ε</text>
                
                {/* q0 → q8 (String branch) */}
                <path d="M 96 260 L 192 260" stroke="#8b84a9" strokeWidth="1.8" strokeDasharray="5 3" fill="none" markerEnd="url(#nfa-arrow-eps)" />
                <text x="138" y="254" fill="#8b84a9" fontSize="10" fontFamily="DM Mono">ε</text>
                
                {/* q0 → q11 (Operator branch) */}
                <path d="M 90 274 Q 140 350, 200 350" stroke="#8b84a9" strokeWidth="1.8" strokeDasharray="5 3" fill="none" markerEnd="url(#nfa-arrow-eps)" />
                <text x="128" y="324" fill="#8b84a9" fontSize="10" fontFamily="DM Mono">ε</text>
                
                {/* q0 → q13 (Delimiter branch) */}
                <path d="M 90 278 Q 140 430, 200 430" stroke="#8b84a9" strokeWidth="1.8" strokeDasharray="5 3" fill="none" markerEnd="url(#nfa-arrow-eps)" />
                <text x="120" y="400" fill="#8b84a9" fontSize="10" fontFamily="DM Mono">ε</text>

                {/* ═══ IDENTIFIER BRANCH (q1 → q2 → q3 → q4) ═══ */}
                {/* q1 */}
                <circle cx="218" cy="80" r="22" fill="#f0f9fc" stroke="#14586b" strokeWidth="2" />
                <text x="218" y="85" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁</text>
                
                {/* q1 → q2 (letter) */}
                <path d="M 240 80 L 330 55" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="278" y="58" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">letter</text>
                
                {/* q1 → q3 (underscore) */}
                <path d="M 240 80 L 330 105" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="285" y="104" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">_</text>
                
                {/* q2 (after letter) */}
                <circle cx="354" cy="50" r="22" fill="white" stroke="#14586b" strokeWidth="2" />
                <circle cx="354" cy="50" r="17" fill="none" stroke="#14586b" strokeWidth="1.2" />
                <text x="354" y="55" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₂</text>
                
                {/* q3 (after underscore) */}
                <circle cx="354" cy="110" r="22" fill="white" stroke="#14586b" strokeWidth="2" />
                <circle cx="354" cy="110" r="17" fill="none" stroke="#14586b" strokeWidth="1.2" />
                <text x="354" y="115" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₃</text>
                
                {/* q2 → q4 */}
                <path d="M 376 50 Q 430 50, 490 80" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="432" y="52" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">letter,digit,_</text>
                
                {/* q3 → q4 */}
                <path d="M 376 110 Q 430 110, 490 88" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="432" y="116" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">letter,digit,_</text>
                
                {/* q4 (continuation — accepting, self-loop) */}
                <circle cx="514" cy="80" r="22" fill="white" stroke="#14586b" strokeWidth="2" />
                <circle cx="514" cy="80" r="17" fill="none" stroke="#14586b" strokeWidth="1.2" />
                <text x="514" y="85" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₄</text>
                
                {/* q4 self-loop */}
                <path d="M 534 68 Q 556 50, 556 80 Q 556 110, 534 92" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="562" y="76" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">letter</text>
                <text x="562" y="86" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">digit,_</text>

                {/* Branch label: IDENTIFIER */}
                <rect x="600" y="60" width="90" height="20" rx="4" fill="#e8f5f0" stroke="rgba(20,88,107,0.2)" strokeWidth="1" />
                <text x="645" y="74" textAnchor="middle" fill="#14586b" fontSize="9" fontWeight="600" fontFamily="DM Mono">IDENTIFIER</text>

                {/* ═══ NUMBER BRANCH (q5 → q6 → q7) ═══ */}
                {/* q5 */}
                <circle cx="218" cy="170" r="22" fill="#f5f0fa" stroke="#8a84a9" strokeWidth="2" />
                <text x="218" y="175" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₅</text>
                
                {/* q5 → q6 (digit) */}
                <path d="M 240 170 L 330 170" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="280" y="164" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">digit</text>
                
                {/* q6 (integer — accepting) */}
                <circle cx="354" cy="170" r="22" fill="white" stroke="#8a84a9" strokeWidth="2" />
                <circle cx="354" cy="170" r="17" fill="none" stroke="#8a84a9" strokeWidth="1.2" />
                <text x="354" y="175" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₆</text>
                
                {/* q6 self-loop (digit) */}
                <path d="M 374 158 Q 396 140, 396 170 Q 396 200, 374 182" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="401" y="174" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">digit</text>
                
                {/* q6 → q7 (dot) */}
                <path d="M 376 170 L 468 170" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="420" y="164" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">.</text>
                
                {/* q7 (reading decimal digits) */}
                <circle cx="492" cy="170" r="22" fill="#faf5ff" stroke="#8a84a9" strokeWidth="2" />
                <text x="492" y="175" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₇</text>
                
                {/* q7 → q8_num (digit — accepting float) */}
                <path d="M 514 170 L 575 170" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="542" y="164" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">digit</text>
                
                {/* q8_num (float accepted) */}
                <circle cx="598" cy="170" r="22" fill="white" stroke="#8a84a9" strokeWidth="2" />
                <circle cx="598" cy="170" r="17" fill="none" stroke="#8a84a9" strokeWidth="1.2" />
                <text x="598" y="175" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₈</text>
                
                {/* q8_num self-loop */}
                <path d="M 618 158 Q 640 140, 640 170 Q 640 200, 618 182" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="645" y="174" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">digit</text>

                {/* Branch label: NUMBER */}
                <rect x="670" y="160" width="72" height="20" rx="4" fill="#f0eef5" stroke="rgba(138,132,169,0.2)" strokeWidth="1" />
                <text x="706" y="174" textAnchor="middle" fill="#8a84a9" fontSize="9" fontWeight="600" fontFamily="DM Mono">NUMBER</text>

                {/* ═══ STRING BRANCH (q9 → q10 → q11) ═══ */}
                {/* q9 */}
                <circle cx="218" cy="260" r="22" fill="#fdf2f3" stroke="#b48789" strokeWidth="2" />
                <text x="218" y="265" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₉</text>
                
                {/* q9 → q10 (quote) */}
                <path d="M 240 260 L 330 260" stroke="#b48789" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="278" y="254" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">quote</text>
                
                {/* q10 (reading string content) */}
                <circle cx="354" cy="260" r="22" fill="#fef8f8" stroke="#b48789" strokeWidth="2" />
                <text x="354" y="265" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₀</text>
                
                {/* q10 self-loop (any except quote) */}
                <path d="M 374 248 Q 396 228, 396 260 Q 396 292, 374 272" stroke="#b48789" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="401" y="256" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">¬quote</text>
                
                {/* q10 → q11 (closing quote) */}
                <path d="M 376 260 L 468 260" stroke="#b48789" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="412" y="254" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">quote</text>
                
                {/* q11 (string accepted) */}
                <circle cx="492" cy="260" r="22" fill="white" stroke="#b48789" strokeWidth="2" />
                <circle cx="492" cy="260" r="17" fill="none" stroke="#b48789" strokeWidth="1.2" />
                <text x="492" y="265" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₁</text>

                {/* Branch label: STRING */}
                <rect x="534" y="250" width="68" height="20" rx="4" fill="#fdf0f0" stroke="rgba(180,135,137,0.2)" strokeWidth="1" />
                <text x="568" y="264" textAnchor="middle" fill="#b48789" fontSize="9" fontWeight="600" fontFamily="DM Mono">STRING</text>

                {/* ═══ OPERATOR BRANCH (q12 → q13) ═══ */}
                {/* q12 */}
                <circle cx="218" cy="350" r="22" fill="#fef6ee" stroke="#c59b75" strokeWidth="2" />
                <text x="218" y="355" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₂</text>
                
                {/* q12 → q13 (single op) */}
                <path d="M 240 342 L 330 325" stroke="#c59b75" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="274" y="324" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">+,-,*,/,%</text>
                
                {/* q13 (single op accepted) */}
                <circle cx="354" cy="320" r="22" fill="white" stroke="#c59b75" strokeWidth="2" />
                <circle cx="354" cy="320" r="17" fill="none" stroke="#c59b75" strokeWidth="1.2" />
                <text x="354" y="325" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₃</text>
                
                {/* q12 → q14 (=, !, <, >) for compound ops */}
                <path d="M 240 358 L 330 378" stroke="#c59b75" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="272" y="380" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">=,!,&lt;,&gt;</text>
                
                {/* q14 (compound op - first char) */}
                <circle cx="354" cy="385" r="22" fill="#fef6ee" stroke="#c59b75" strokeWidth="2" />
                <circle cx="354" cy="385" r="17" fill="none" stroke="#c59b75" strokeWidth="1.2" />
                <text x="354" y="390" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₄</text>
                
                {/* q14 → q15 (=) for ==, !=, <=, >= */}
                <path d="M 376 385 L 468 385" stroke="#c59b75" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="418" y="378" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">=</text>
                
                {/* q15 (compound op accepted) */}
                <circle cx="492" cy="385" r="22" fill="white" stroke="#c59b75" strokeWidth="2" />
                <circle cx="492" cy="385" r="17" fill="none" stroke="#c59b75" strokeWidth="1.2" />
                <text x="492" y="390" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₅</text>
                
                {/* Branch label: OPERATOR */}
                <rect x="534" y="375" width="82" height="20" rx="4" fill="#fef2ea" stroke="rgba(197,155,117,0.2)" strokeWidth="1" />
                <text x="575" y="389" textAnchor="middle" fill="#c59b75" fontSize="9" fontWeight="600" fontFamily="DM Mono">OPERATOR</text>

                {/* ═══ DELIMITER / PUNCTUATION BRANCH (q16 → q17) ═══ */}
                {/* q16 */}
                <circle cx="218" cy="430" r="22" fill="#f0f7f3" stroke="#8aad9c" strokeWidth="2" />
                <text x="218" y="435" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₆</text>
                
                {/* q16 → q17 (delimiters) */}
                <path d="M 240 430 L 330 430" stroke="#8aad9c" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
                <text x="270" y="424" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">( ) {'{ }'} [ ] ; ,</text>
                
                {/* q17 (delimiter accepted) */}
                <circle cx="354" cy="430" r="22" fill="white" stroke="#8aad9c" strokeWidth="2" />
                <circle cx="354" cy="430" r="17" fill="none" stroke="#8aad9c" strokeWidth="1.2" />
                <text x="354" y="435" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₇</text>

                {/* Branch label: DELIMITER */}
                <rect x="396" y="420" width="82" height="20" rx="4" fill="#eaf5ef" stroke="rgba(138,173,156,0.2)" strokeWidth="1" />
                <text x="437" y="434" textAnchor="middle" fill="#8aad9c" fontSize="9" fontWeight="600" fontFamily="DM Mono">DELIMITER</text>

                {/* ═══ ERROR STATE ═══ */}
                <path d="M 72 284 L 72 465" stroke="#c59b75" strokeWidth="1.5" strokeDasharray="4 3" fill="none" markerEnd="url(#nfa-arrow-err)" />
                <text x="80" y="400" fill="#8b5a3c" fontSize="8" fontFamily="DM Mono">invalid</text>
                
                <circle cx="72" cy="488" r="20" fill="#fff5f5" stroke="#c59b75" strokeWidth="2" />
                <text x="72" y="493" textAnchor="middle" fill="#8b5a3c" fontSize="11" fontWeight="600">qₑ</text>
                
                {/* qE self-loop */}
                <path d="M 52 494 Q 35 510, 55 510 Q 72 510, 72 508" stroke="#c59b75" strokeWidth="1.5" strokeDasharray="4 3" fill="none" markerEnd="url(#nfa-arrow-err)" />
                <text x="38" y="506" fill="#8b5a3c" fontSize="8" fontFamily="DM Mono">any</text>

                {/* ── Branch grouping backgrounds ── */}
                {/* Light rectangles behind each branch for visual grouping */}
              </svg>

              {/* Legend */}
              <div className="av-legend">
                <div className="av-legend-item">
                  <div className="av-legend-circle av-legend-start" />
                  <span>Start State</span>
                </div>
                <div className="av-legend-item">
                  <div className="av-legend-circle av-legend-accept" />
                  <span>Accepting (double circle)</span>
                </div>
                <div className="av-legend-item">
                  <div className="av-legend-circle av-legend-reject" />
                  <span>Error / Trap</span>
                </div>
                <div className="av-legend-item">
                  <svg width="30" height="12"><line x1="0" y1="6" x2="30" y2="6" stroke="#8b84a9" strokeWidth="1.5" strokeDasharray="4 2" /></svg>
                  <span>ε-transition</span>
                </div>
                <div className="av-legend-item">
                  <svg width="30" height="12"><line x1="0" y1="6" x2="30" y2="6" stroke="#14586b" strokeWidth="1.5" /></svg>
                  <span>Symbol transition</span>
                </div>
              </div>
            </div>
          </section>

          {/* ───── NFA Transition Table ───── */}
          <section className="av-section">
            <div className="av-section-header">
              <div className="av-section-badge">02</div>
              <div>
                <h2 className="av-section-title">NFA Transition Table</h2>
                <p className="av-section-subtitle">
                  δ(state, symbol) → set of next states. Non-deterministic transitions allow multiple paths via ε-transitions from q₀.
                </p>
              </div>
            </div>

            <div className="av-table-card">
              <div className="av-table-scroll">
                <table className="av-table">
                  <thead>
                    <tr>
                      <th>State</th>
                      <th>ε</th>
                      <th>letter</th>
                      <th>digit</th>
                      <th>_ (underscore)</th>
                      <th>quote (' ")</th>
                      <th>op (+−*/)</th>
                      <th>=!&lt;&gt;</th>
                      <th>delim</th>
                      <th>. (dot)</th>
                      <th>¬quote</th>
                      <th>Accepting?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="av-state-cell">→ q₀</td>
                      <td className="av-eps-cell">{'{'}q₁,q₅,q₉,q₁₂,q₁₆{'}'}</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-reject-badge">✗</td>
                    </tr>
                    <tr className="av-row-ident">
                      <td className="av-state-cell">q₁</td>
                      <td>—</td>
                      <td>{'{'}q₂{'}'}</td>
                      <td>—</td>
                      <td>{'{'}q₃{'}'}</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-reject-badge">✗</td>
                    </tr>
                    <tr className="av-row-ident">
                      <td className="av-state-cell">*q₂</td>
                      <td>—</td>
                      <td>{'{'}q₄{'}'}</td>
                      <td>{'{'}q₄{'}'}</td>
                      <td>{'{'}q₄{'}'}</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-accept-badge">✓</td>
                    </tr>
                    <tr className="av-row-ident">
                      <td className="av-state-cell">*q₃</td>
                      <td>—</td>
                      <td>{'{'}q₄{'}'}</td>
                      <td>{'{'}q₄{'}'}</td>
                      <td>{'{'}q₄{'}'}</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-accept-badge">✓</td>
                    </tr>
                    <tr className="av-row-ident">
                      <td className="av-state-cell">*q₄</td>
                      <td>—</td>
                      <td>{'{'}q₄{'}'}</td>
                      <td>{'{'}q₄{'}'}</td>
                      <td>{'{'}q₄{'}'}</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-accept-badge">✓</td>
                    </tr>
                    <tr className="av-row-num">
                      <td className="av-state-cell">q₅</td>
                      <td>—</td><td>—</td>
                      <td>{'{'}q₆{'}'}</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-reject-badge">✗</td>
                    </tr>
                    <tr className="av-row-num">
                      <td className="av-state-cell">*q₆</td>
                      <td>—</td><td>—</td>
                      <td>{'{'}q₆{'}'}</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td>{'{'}q₇{'}'}</td>
                      <td>—</td>
                      <td className="av-accept-badge">✓</td>
                    </tr>
                    <tr className="av-row-num">
                      <td className="av-state-cell">q₇</td>
                      <td>—</td><td>—</td>
                      <td>{'{'}q₈{'}'}</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-reject-badge">✗</td>
                    </tr>
                    <tr className="av-row-num">
                      <td className="av-state-cell">*q₈</td>
                      <td>—</td><td>—</td>
                      <td>{'{'}q₈{'}'}</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-accept-badge">✓</td>
                    </tr>
                    <tr className="av-row-str">
                      <td className="av-state-cell">q₉</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td>
                      <td>{'{'}q₁₀{'}'}</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-reject-badge">✗</td>
                    </tr>
                    <tr className="av-row-str">
                      <td className="av-state-cell">q₁₀</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td>
                      <td>{'{'}q₁₁{'}'}</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td>
                      <td>{'{'}q₁₀{'}'}</td>
                      <td className="av-reject-badge">✗</td>
                    </tr>
                    <tr className="av-row-str">
                      <td className="av-state-cell">*q₁₁</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-accept-badge">✓</td>
                    </tr>
                    <tr className="av-row-op">
                      <td className="av-state-cell">q₁₂</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td>{'{'}q₁₃{'}'}</td>
                      <td>{'{'}q₁₄{'}'}</td>
                      <td>—</td><td>—</td><td>—</td>
                      <td className="av-reject-badge">✗</td>
                    </tr>
                    <tr className="av-row-op">
                      <td className="av-state-cell">*q₁₃</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-accept-badge">✓</td>
                    </tr>
                    <tr className="av-row-op">
                      <td className="av-state-cell">*q₁₄</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td>{'{'}q₁₅{'}'}</td>
                      <td>—</td><td>—</td><td>—</td>
                      <td className="av-accept-badge">✓</td>
                    </tr>
                    <tr className="av-row-op">
                      <td className="av-state-cell">*q₁₅</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-accept-badge">✓</td>
                    </tr>
                    <tr className="av-row-delim">
                      <td className="av-state-cell">q₁₆</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td>{'{'}q₁₇{'}'}</td>
                      <td>—</td><td>—</td>
                      <td className="av-reject-badge">✗</td>
                    </tr>
                    <tr className="av-row-delim">
                      <td className="av-state-cell">*q₁₇</td>
                      <td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td><td>—</td>
                      <td className="av-accept-badge">✓</td>
                    </tr>
                    <tr className="av-row-err">
                      <td className="av-state-cell">qₑ</td>
                      <td>—</td>
                      <td>{'{'}qₑ{'}'}</td>
                      <td>{'{'}qₑ{'}'}</td>
                      <td>{'{'}qₑ{'}'}</td>
                      <td>{'{'}qₑ{'}'}</td>
                      <td>{'{'}qₑ{'}'}</td>
                      <td>{'{'}qₑ{'}'}</td>
                      <td>{'{'}qₑ{'}'}</td>
                      <td>{'{'}qₑ{'}'}</td>
                      <td>{'{'}qₑ{'}'}</td>
                      <td className="av-reject-badge">✗</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="av-table-footer">
                <span>→ = start state &nbsp;&nbsp;·&nbsp;&nbsp; * = accepting state &nbsp;&nbsp;·&nbsp;&nbsp; — = no transition (∅)</span>
              </div>
            </div>
          </section>

          {/* ───── Conversion Arrow ───── */}
          <div className="av-conversion">
            <div className="av-conversion-line" />
            <div className="av-conversion-content">
              <div className="av-conversion-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5L12 19M12 19L7 14M12 19L17 14" stroke="#14586b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="av-conversion-text">
                <strong>Subset Construction</strong>
                <span>NFA → DFA conversion · 15 → 15 states</span>
              </div>
            </div>
            <div className="av-conversion-line" />
          </div>

          {/* ───── Conversion Arrow 2 ───── */}
          <div className="av-conversion">
            <div className="av-conversion-line" />
            <div className="av-conversion-content">
              <div className="av-conversion-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5L12 19M12 19L7 14M12 19L17 14" stroke="#14586b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="av-conversion-text">
                <strong>Partition Refinement</strong>
                <span>DFA → Minimized DFA · 15 → 10 states · 33% reduction</span>
              </div>
            </div>
            <div className="av-conversion-line" />
          </div>

          {/* ───── Section 2: Minimized DFA Diagram ───── */}
          <section className="av-section">
            <div className="av-section-header">
              <div className="av-section-badge">03</div>
              <div>
                <h2 className="av-section-title">Minimized DFA — Deterministic Finite Automaton</h2>
                <p className="av-section-subtitle">
                  After subset construction and partition refinement, equivalent states are merged. 
                  States q₂, q₃, q₄ merge into S<sub>ID</sub>. States q₁₃, q₁₄ merge into S<sub>OP</sub>. 
                  States q₁₅ merges into S<sub>COP</sub>. The result: 10 deterministic states.
                </p>
              </div>
            </div>

            <div className="av-diagram-card">
              <div className="av-diagram-meta">
                <div className="av-diagram-label">
                  <span className="av-badge av-badge-dfa">MIN DFA</span>
                  <span className="av-meta-text">M' = (Q', Σ, δ', q₀', F') &nbsp;·&nbsp; 10 states &nbsp;·&nbsp; Deterministic</span>
                </div>
                <div className="av-pattern-label">Minimized multi-token scanner</div>
              </div>

              <svg className="av-diagram-svg" viewBox="0 0 900 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="dfa-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#14586b" />
                  </marker>
                  <marker id="dfa-arrow-err" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                    <polygon points="0 0, 8 3, 0 6" fill="#c59b75" />
                  </marker>
                </defs>

                {/* ── Start arrow ── */}
                <path d="M 15 225 L 48 225" stroke="#6b7b82" strokeWidth="2" markerEnd="url(#dfa-arrow)" />

                {/* ── S0: Start state ── */}
                <circle cx="72" cy="225" r="24" fill="white" stroke="#14586b" strokeWidth="2.5" />
                <text x="72" y="230" textAnchor="middle" fill="#1a2226" fontSize="13" fontWeight="600">S₀</text>

                {/* ═══ IDENTIFIER PATH ═══ */}
                {/* S0 → S_ID (letter, _) */}
                <path d="M 90 207 Q 145 70, 250 70" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="152" y="118" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">letter, _</text>
                
                {/* S_ID (accepting — merged q2,q3,q4) */}
                <circle cx="274" cy="70" r="26" fill="white" stroke="#14586b" strokeWidth="2.5" />
                <circle cx="274" cy="70" r="21" fill="none" stroke="#14586b" strokeWidth="1.5" />
                <text x="274" y="67" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="700">S</text>
                <text x="274" y="80" textAnchor="middle" fill="#14586b" fontSize="9" fontWeight="600" fontFamily="DM Mono">ID</text>
                
                {/* S_ID self-loop */}
                <path d="M 298 58 Q 322 38, 322 70 Q 322 102, 298 82" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="330" y="66" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">letter</text>
                <text x="330" y="76" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">digit, _</text>

                <rect x="370" y="60" width="90" height="20" rx="4" fill="#e8f5f0" stroke="rgba(20,88,107,0.15)" strokeWidth="1" />
                <text x="415" y="74" textAnchor="middle" fill="#14586b" fontSize="9" fontWeight="600" fontFamily="DM Mono">IDENTIFIER</text>

                {/* ═══ NUMBER PATH ═══ */}
                {/* S0 → S_INT (digit) */}
                <path d="M 90 213 Q 150 155, 250 155" stroke="#8a84a9" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="155" y="168" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">digit</text>
                
                {/* S_INT (accepting integer) */}
                <circle cx="274" cy="155" r="26" fill="white" stroke="#8a84a9" strokeWidth="2.5" />
                <circle cx="274" cy="155" r="21" fill="none" stroke="#8a84a9" strokeWidth="1.5" />
                <text x="274" y="152" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="700">S</text>
                <text x="274" y="165" textAnchor="middle" fill="#8a84a9" fontSize="9" fontWeight="600" fontFamily="DM Mono">INT</text>
                
                {/* S_INT self-loop (digit) */}
                <path d="M 298 143 Q 322 123, 322 155 Q 322 187, 298 167" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="328" y="159" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">digit</text>
                
                {/* S_INT → S_DOT (.) */}
                <path d="M 300 155 L 420 155" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="360" y="149" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">.</text>
                
                {/* S_DOT */}
                <circle cx="444" cy="155" r="22" fill="#faf5ff" stroke="#8a84a9" strokeWidth="2" />
                <text x="444" y="152" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="700">S</text>
                <text x="444" y="165" textAnchor="middle" fill="#8a84a9" fontSize="9" fontWeight="600" fontFamily="DM Mono">DOT</text>
                
                {/* S_DOT → S_FLT (digit) */}
                <path d="M 466 155 L 560 155" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="510" y="149" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">digit</text>
                
                {/* S_FLT (accepting float) */}
                <circle cx="584" cy="155" r="22" fill="white" stroke="#8a84a9" strokeWidth="2" />
                <circle cx="584" cy="155" r="17" fill="none" stroke="#8a84a9" strokeWidth="1.2" />
                <text x="584" y="152" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="700">S</text>
                <text x="584" y="165" textAnchor="middle" fill="#8a84a9" fontSize="9" fontWeight="600" fontFamily="DM Mono">FLT</text>
                
                {/* S_FLT self-loop */}
                <path d="M 604 143 Q 624 125, 624 155 Q 624 185, 604 167" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="630" y="159" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">digit</text>

                <rect x="660" y="145" width="72" height="20" rx="4" fill="#f0eef5" stroke="rgba(138,132,169,0.15)" strokeWidth="1" />
                <text x="696" y="159" textAnchor="middle" fill="#8a84a9" fontSize="9" fontWeight="600" fontFamily="DM Mono">NUMBER</text>

                {/* ═══ STRING PATH ═══ */}
                {/* S0 → S_SQ (quote) */}
                <path d="M 96 225 L 230 225" stroke="#b48789" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="155" y="219" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">quote</text>
                
                {/* S_SQ (reading string) */}
                <circle cx="254" cy="225" r="22" fill="#fef8f8" stroke="#b48789" strokeWidth="2" />
                <text x="254" y="222" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="700">S</text>
                <text x="254" y="235" textAnchor="middle" fill="#b48789" fontSize="9" fontWeight="600" fontFamily="DM Mono">STR</text>
                
                {/* S_SQ self-loop (not-quote) */}
                <path d="M 274 213 Q 296 193, 296 225 Q 296 257, 274 237" stroke="#b48789" strokeWidth="1.8" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="302" y="229" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">¬quote</text>
                
                {/* S_SQ → S_SC (closing quote) */}
                <path d="M 276 225 L 400 225" stroke="#b48789" strokeWidth="1.8" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="336" y="219" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">quote</text>
                
                {/* S_SC (string complete — accepting) */}
                <circle cx="424" cy="225" r="22" fill="white" stroke="#b48789" strokeWidth="2" />
                <circle cx="424" cy="225" r="17" fill="none" stroke="#b48789" strokeWidth="1.2" />
                <text x="424" y="222" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="700">S</text>
                <text x="424" y="235" textAnchor="middle" fill="#b48789" fontSize="9" fontWeight="600" fontFamily="DM Mono">SC</text>

                <rect x="460" y="215" width="68" height="20" rx="4" fill="#fdf0f0" stroke="rgba(180,135,137,0.15)" strokeWidth="1" />
                <text x="494" y="229" textAnchor="middle" fill="#b48789" fontSize="9" fontWeight="600" fontFamily="DM Mono">STRING</text>

                {/* ═══ OPERATOR PATH ═══ */}
                {/* S0 → S_OP (simple op) */}
                <path d="M 90 237 Q 150 300, 250 300" stroke="#c59b75" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="145" y="285" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">+,-,*,/,%</text>
                
                {/* S_OP (single op — accepting — merged q13,q14) */}
                <circle cx="274" cy="300" r="26" fill="white" stroke="#c59b75" strokeWidth="2.5" />
                <circle cx="274" cy="300" r="21" fill="none" stroke="#c59b75" strokeWidth="1.5" />
                <text x="274" y="297" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="700">S</text>
                <text x="274" y="310" textAnchor="middle" fill="#c59b75" fontSize="9" fontWeight="600" fontFamily="DM Mono">OP</text>

                {/* S0 → S_OP2 (compound-start op) */}
                <path d="M 86 248 Q 120 340, 200 355 Q 240 362, 250 355" stroke="#c59b75" strokeWidth="1.8" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="135" y="352" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">=,!,&lt;,&gt;</text>

                {/* S_OP2 (compound-start — accepting) */}
                <circle cx="274" cy="370" r="26" fill="white" stroke="#c59b75" strokeWidth="2.5" />
                <circle cx="274" cy="370" r="21" fill="none" stroke="#c59b75" strokeWidth="1.5" />
                <text x="274" y="367" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="700">S</text>
                <text x="274" y="380" textAnchor="middle" fill="#c59b75" fontSize="9" fontWeight="600" fontFamily="DM Mono">OP2</text>

                {/* S_OP2 → S_COP (=) */}
                <path d="M 300 370 L 420 370" stroke="#c59b75" strokeWidth="1.8" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="358" y="364" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">=</text>
                
                {/* S_COP (compound op accepted) */}
                <circle cx="444" cy="370" r="22" fill="white" stroke="#c59b75" strokeWidth="2" />
                <circle cx="444" cy="370" r="17" fill="none" stroke="#c59b75" strokeWidth="1.2" />
                <text x="444" y="367" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="700">S</text>
                <text x="444" y="380" textAnchor="middle" fill="#c59b75" fontSize="9" fontWeight="600" fontFamily="DM Mono">COP</text>

                <rect x="480" y="360" width="82" height="20" rx="4" fill="#fef2ea" stroke="rgba(197,155,117,0.15)" strokeWidth="1" />
                <text x="521" y="374" textAnchor="middle" fill="#c59b75" fontSize="9" fontWeight="600" fontFamily="DM Mono">OPERATOR</text>

                {/* ═══ DELIMITER PATH ═══ */}
                {/* S0 → S_DL (delim/punct) */}
                <path d="M 84 248 Q 120 420, 250 430" stroke="#8aad9c" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
                <text x="120" y="425" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">delim, punct</text>
                
                {/* S_DL (delimiter — accepting) */}
                <circle cx="274" cy="430" r="22" fill="white" stroke="#8aad9c" strokeWidth="2" />
                <circle cx="274" cy="430" r="17" fill="none" stroke="#8aad9c" strokeWidth="1.2" />
                <text x="274" y="427" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="700">S</text>
                <text x="274" y="440" textAnchor="middle" fill="#8aad9c" fontSize="9" fontWeight="600" fontFamily="DM Mono">DL</text>

                <rect x="310" y="420" width="82" height="20" rx="4" fill="#eaf5ef" stroke="rgba(138,173,156,0.15)" strokeWidth="1" />
                <text x="351" y="434" textAnchor="middle" fill="#8aad9c" fontSize="9" fontWeight="600" fontFamily="DM Mono">DELIMITER</text>

                {/* ═══ ERROR STATE ═══ */}
                <path d="M 72 249 L 72 395" stroke="#c59b75" strokeWidth="1.5" strokeDasharray="4 3" fill="none" markerEnd="url(#dfa-arrow-err)" />
                <text x="80" y="340" fill="#8b5a3c" fontSize="8" fontFamily="DM Mono">invalid</text>
                
                <circle cx="72" cy="418" r="20" fill="#fff5f5" stroke="#c59b75" strokeWidth="2" />
                <text x="72" y="423" textAnchor="middle" fill="#8b5a3c" fontSize="11" fontWeight="600">Sₑ</text>
                
                <path d="M 52 424 Q 35 440, 55 440 Q 72 440, 72 438" stroke="#c59b75" strokeWidth="1.5" strokeDasharray="4 3" fill="none" markerEnd="url(#dfa-arrow-err)" />
                <text x="38" y="438" fill="#8b5a3c" fontSize="8" fontFamily="DM Mono">any</text>
              </svg>

              {/* Legend */}
              <div className="av-legend">
                <div className="av-legend-item">
                  <div className="av-legend-circle av-legend-start" />
                  <span>Start State</span>
                </div>
                <div className="av-legend-item">
                  <div className="av-legend-circle av-legend-accept" />
                  <span>Accepting (double circle)</span>
                </div>
                <div className="av-legend-item">
                  <div className="av-legend-circle av-legend-reject" />
                  <span>Error / Trap</span>
                </div>
                <div className="av-legend-item">
                  <svg width="30" height="12"><line x1="0" y1="6" x2="30" y2="6" stroke="#14586b" strokeWidth="1.5" /></svg>
                  <span>Deterministic transition</span>
                </div>
              </div>
            </div>
          </section>

          {/* ───── Minimized DFA Transition Table ───── */}
          <section className="av-section">
            <div className="av-section-header">
              <div className="av-section-badge">04</div>
              <div>
                <h2 className="av-section-title">Minimized DFA Transition Table</h2>
                <p className="av-section-subtitle">
                  δ'(state, symbol) → single next state. Fully deterministic — each state-symbol pair maps to exactly one next state.
                </p>
              </div>
            </div>

            <div className="av-table-card">
              <div className="av-table-scroll">
                <table className="av-table">
                  <thead>
                    <tr>
                      <th>State</th>
                      <th>letter</th>
                      <th>digit</th>
                      <th>_ (underscore)</th>
                      <th>quote</th>
                      <th>op (+−*/)</th>
                      <th>=!&lt;&gt;</th>
                      <th>delim/punct</th>
                      <th>. (dot)</th>
                      <th>¬quote</th>
                      <th>Accepting?</th>
                      <th>Merged From</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="av-state-cell">→ S₀</td>
                      <td>S<sub>ID</sub></td>
                      <td>S<sub>INT</sub></td>
                      <td>S<sub>ID</sub></td>
                      <td>S<sub>STR</sub></td>
                      <td>S<sub>OP</sub></td>
                      <td>S<sub>OP2</sub></td>
                      <td>S<sub>DL</sub></td>
                      <td>Sₑ</td>
                      <td>—</td>
                      <td className="av-reject-badge">✗</td>
                      <td className="av-merge-cell">q₀</td>
                    </tr>
                    <tr className="av-row-ident">
                      <td className="av-state-cell">*S<sub>ID</sub></td>
                      <td>S<sub>ID</sub></td>
                      <td>S<sub>ID</sub></td>
                      <td>S<sub>ID</sub></td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>—</td>
                      <td className="av-accept-badge">✓</td>
                      <td className="av-merge-cell">q₂,q₃,q₄</td>
                    </tr>
                    <tr className="av-row-num">
                      <td className="av-state-cell">*S<sub>INT</sub></td>
                      <td>Sₑ</td>
                      <td>S<sub>INT</sub></td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>S<sub>DOT</sub></td>
                      <td>—</td>
                      <td className="av-accept-badge">✓</td>
                      <td className="av-merge-cell">q₆</td>
                    </tr>
                    <tr className="av-row-num">
                      <td className="av-state-cell">S<sub>DOT</sub></td>
                      <td>Sₑ</td>
                      <td>S<sub>FLT</sub></td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>—</td>
                      <td className="av-reject-badge">✗</td>
                      <td className="av-merge-cell">q₇</td>
                    </tr>
                    <tr className="av-row-num">
                      <td className="av-state-cell">*S<sub>FLT</sub></td>
                      <td>Sₑ</td>
                      <td>S<sub>FLT</sub></td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>—</td>
                      <td className="av-accept-badge">✓</td>
                      <td className="av-merge-cell">q₈</td>
                    </tr>
                    <tr className="av-row-str">
                      <td className="av-state-cell">S<sub>STR</sub></td>
                      <td>—</td>
                      <td>—</td>
                      <td>—</td>
                      <td>S<sub>SC</sub></td>
                      <td>—</td>
                      <td>—</td>
                      <td>—</td>
                      <td>—</td>
                      <td>S<sub>STR</sub></td>
                      <td className="av-reject-badge">✗</td>
                      <td className="av-merge-cell">q₁₀</td>
                    </tr>
                    <tr className="av-row-str">
                      <td className="av-state-cell">*S<sub>SC</sub></td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>—</td>
                      <td className="av-accept-badge">✓</td>
                      <td className="av-merge-cell">q₁₁</td>
                    </tr>
                    <tr className="av-row-op">
                      <td className="av-state-cell">*S<sub>OP</sub></td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>—</td>
                      <td className="av-accept-badge">✓</td>
                      <td className="av-merge-cell">q₁₃,q₁₄</td>
                    </tr>
                    <tr className="av-row-op">
                      <td className="av-state-cell">*S<sub>OP2</sub></td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>S<sub>COP</sub></td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>—</td>
                      <td className="av-accept-badge">✓</td>
                      <td className="av-merge-cell">q₁₂</td>
                    </tr>
                    <tr className="av-row-op">
                      <td className="av-state-cell">*S<sub>COP</sub></td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>—</td>
                      <td className="av-accept-badge">✓</td>
                      <td className="av-merge-cell">q₁₅</td>
                    </tr>
                    <tr className="av-row-delim">
                      <td className="av-state-cell">*S<sub>DL</sub></td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>—</td>
                      <td className="av-accept-badge">✓</td>
                      <td className="av-merge-cell">q₁₆,q₁₇</td>
                    </tr>
                    <tr className="av-row-err">
                      <td className="av-state-cell">Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td>Sₑ</td>
                      <td className="av-reject-badge">✗</td>
                      <td className="av-merge-cell">qₑ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="av-table-footer">
                <span>→ = start state &nbsp;&nbsp;·&nbsp;&nbsp; * = accepting state &nbsp;&nbsp;·&nbsp;&nbsp; — = N/A for this pattern</span>
              </div>
            </div>
          </section>

          {/* ───── Section 5: Explanation Grid ───── */}
          <section className="av-section">
            <div className="av-section-header">
              <div className="av-section-badge">05</div>
              <div>
                <h2 className="av-section-title">How It Works</h2>
                <p className="av-section-subtitle">
                  Understanding the three-phase pipeline from NFA to optimized scanner.
                </p>
              </div>
            </div>

            <div className="av-explain-grid">
              <div className="av-explain-card">
                <div className="av-explain-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#14586b" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="av-explain-title">Multi-Pattern NFA</h3>
                <p className="av-explain-text">
                  The NFA uses ε-transitions from q₀ to branch into 5 parallel recognition paths — one for each token type. 
                  This non-deterministic design allows simultaneous pattern matching across identifiers, numbers, strings, 
                  operators, and delimiters. With 15 states, it covers the complete lexical grammar.
                </p>
              </div>

              <div className="av-explain-card">
                <div className="av-explain-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h16v16H4V4zm4 4h8M8 12h8M8 16h4" stroke="#14586b" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="av-explain-title">Subset Construction</h3>
                <p className="av-explain-text">
                  The NFA is converted to a DFA using the subset construction algorithm. Each DFA state represents a set 
                  of NFA states reachable via ε-closure. Since our NFA has limited non-determinism (ε-transitions only at start), 
                  the DFA maintains the same 15-state structure without exponential blowup.
                </p>
              </div>

              <div className="av-explain-card">
                <div className="av-explain-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3" stroke="#14586b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="av-explain-title">Partition Refinement</h3>
                <p className="av-explain-text">
                  The minimization algorithm identifies equivalent states by checking if they have identical transition 
                  signatures. States q₂, q₃, q₄ (identifier branch) are merged into S<sub>ID</sub> since they all loop on 
                  the same symbols. Similarly, single-char operators q₁₃ and q₁₄ merge. Result: 15 → 10 states (33% reduction).
                </p>
              </div>

              <div className="av-explain-card">
                <div className="av-explain-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 9v2m0 4h.01M5.07 19H18.93a2 2 0 001.72-2.98l-6.93-12a2 2 0 00-3.44 0l-6.93 12A2 2 0 005.07 19z" stroke="#c59b75" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="av-explain-title">Error Handling</h3>
                <p className="av-explain-text">
                  Both automata include a trap state (qₑ / Sₑ) that catches invalid input — characters not in the defined 
                  alphabet Σ. Once entered, the trap state loops on all symbols, ensuring clear rejection. This provides 
                  precise error location reporting in the lexical analyzer output.
                </p>
              </div>
            </div>
          </section>

          {/* ───── State Mapping ───── */}
          <section className="av-section">
            <div className="av-section-header">
              <div className="av-section-badge">06</div>
              <div>
                <h2 className="av-section-title">State Equivalence Mapping</h2>
                <p className="av-section-subtitle">
                  How NFA states map to minimized DFA states after partition refinement.
                </p>
              </div>
            </div>

            <div className="av-mapping-grid">
              {[
                { from: 'q₀', to: 'S₀', color: '#14586b', label: 'Start', desc: 'Start state (unchanged)' },
                { from: 'q₁', to: '—', color: '#6b7b82', label: 'Removed', desc: 'Intermediate (absorbed into S₀ transitions)' },
                { from: 'q₂, q₃, q₄', to: 'S_ID', color: '#14586b', label: 'Merged', desc: 'All identifier-accepting states equivalent' },
                { from: 'q₅', to: '—', color: '#6b7b82', label: 'Removed', desc: 'Intermediate (absorbed into S₀ transitions)' },
                { from: 'q₆', to: 'S_INT', color: '#8a84a9', label: 'Kept', desc: 'Integer accepting state' },
                { from: 'q₇', to: 'S_DOT', color: '#8a84a9', label: 'Kept', desc: 'After decimal point (non-accepting)' },
                { from: 'q₈', to: 'S_FLT', color: '#8a84a9', label: 'Kept', desc: 'Float accepting state' },
                { from: 'q₉', to: '—', color: '#6b7b82', label: 'Removed', desc: 'Intermediate (absorbed into S₀ transitions)' },
                { from: 'q₁₀', to: 'S_STR', color: '#b48789', label: 'Kept', desc: 'Reading string content' },
                { from: 'q₁₁', to: 'S_SC', color: '#b48789', label: 'Kept', desc: 'String complete' },
                { from: 'q₁₂', to: 'S_OP2', color: '#c59b75', label: 'Kept', desc: 'Compound operator start' },
                { from: 'q₁₃, q₁₄', to: 'S_OP', color: '#c59b75', label: 'Merged', desc: 'Single-char operators equivalent' },
                { from: 'q₁₅', to: 'S_COP', color: '#c59b75', label: 'Kept', desc: 'Compound operator complete' },
                { from: 'q₁₆, q₁₇', to: 'S_DL', color: '#8aad9c', label: 'Merged', desc: 'Delimiter states equivalent' },
                { from: 'qₑ', to: 'Sₑ', color: '#c59b75', label: 'Kept', desc: 'Error trap state' },
              ].map((m, i) => (
                <div className="av-mapping-row" key={i}>
                  <div className="av-mapping-from">
                    <code>{m.from}</code>
                  </div>
                  <div className="av-mapping-arrow">→</div>
                  <div className="av-mapping-to" style={{ borderLeftColor: m.color }}>
                    <code>{m.to}</code>
                    <span className="av-mapping-label" style={{ color: m.color }}>{m.label}</span>
                  </div>
                  <div className="av-mapping-desc">{m.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ───── CTA ───── */}
          <section className="av-cta">
            <div className="av-cta-content">
              <h3 className="av-cta-title">Try the Analyzer</h3>
              <p className="av-cta-text">
                Test these automata in action with the interactive lexical analyzer. 
                Watch state transitions in real-time as your code is tokenized.
              </p>
              <Link to="/app" className="btn btn-primary">
                Open Analyzer →
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  )
}
