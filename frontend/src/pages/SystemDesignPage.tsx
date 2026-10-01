import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import SystemDesignDiagram from '../components/diagrams/SystemDesignDiagram'

export default function SystemDesignPage() {
  return (
    <div className="infopage-root">
      <nav className="infopage-nav">
        <Logo />
        <div className="infopage-nav-links">
          <Link to="/automata" className="nav-link">Automata</Link>
          <Link to="/docs/how-it-works" className="nav-link">How It Works</Link>
          <Link to="/docs/token-reference" className="nav-link">Token Reference</Link>
        </div>
        <Link to="/app" className="btn btn-primary btn-sm">
          Open LexiScan →
        </Link>
      </nav>

      <main className="infopage-content">
        <p className="eyebrow">SYSTEM DESIGN</p>
        <h1>LexiScan Architecture</h1>
        <p className="lead">
          A stateless lexical analyzer with a FastAPI backend and React frontend, using deterministic finite automata for token recognition.
        </p>

        {/* Architecture Diagram */}
        <section className="info-section">
          <h2>System Architecture</h2>
          <div className="diagram-card">
            <SystemDesignDiagram />
          </div>
        </section>

        {/* Frontend Architecture */}
        <section className="info-section">
          <h2>Frontend Architecture</h2>
          <div className="architecture-details">
            <h3>Technology Stack</h3>
            <ul>
              <li><strong>Framework:</strong> React 19 with TypeScript</li>
              <li><strong>Build Tool:</strong> Vite 8</li>
              <li><strong>Routing:</strong> React Router DOM 7</li>
              <li><strong>Styling:</strong> Tailwind CSS 4</li>
              <li><strong>Icons:</strong> Lucide React</li>
            </ul>

            <h3>Key Components</h3>
            <div className="component-list">
              <div className="component-item">
                <h4>Analyzer.tsx</h4>
                <p>Main user interface for source code input and token display. Handles API communication with the backend.</p>
              </div>
              
              <div className="component-item">
                <h4>AutomataView.tsx</h4>
                <p>Displays NFA, DFA, and Minimized DFA diagrams with SVG visualizations for multi-pattern token recognition.</p>
              </div>
              
              <div className="component-item">
                <h4>automata/</h4>
                <p>Contains formal definitions for NFA, DFA, and Minimized DFA with transition tables, conversion steps, and execution examples.</p>
              </div>
              
              <div className="component-item">
                <h4>diagrams/</h4>
                <p>Reusable SVG diagram components for NFA, DFA, Minimized DFA, and system architecture visualizations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Backend Architecture */}
        <section className="info-section">
          <h2>Backend Architecture</h2>
          <div className="architecture-details">
            <h3>Technology Stack</h3>
            <ul>
              <li><strong>Framework:</strong> FastAPI (Python)</li>
              <li><strong>Server:</strong> Uvicorn</li>
              <li><strong>Testing:</strong> Pytest</li>
              <li><strong>State Management:</strong> Stateless (no database)</li>
            </ul>

            <h3>Key Modules</h3>
            <div className="component-list">
              <div className="component-item">
                <h4>main.py</h4>
                <p>FastAPI application entry point with API endpoints for lexical analysis and token reference.</p>
              </div>
              
              <div className="component-item">
                <h4>automaton.py</h4>
                <p>DFA engine implementation with state transitions and character categorization. Core scanning logic.</p>
              </div>
              
              <div className="component-item">
                <h4>analyzer.py</h4>
                <p>Lexical analyzer that uses the DFA to scan source code and produce lexemes with line/column information.</p>
              </div>
              
              <div className="component-item">
                <h4>tokens.py</h4>
                <p>Token type definitions (IDENTIFIER, KEYWORD, NUMBER, STRING, OPERATOR, etc.) and token categorization.</p>
              </div>
              
              <div className="component-item">
                <h4>states.py</h4>
                <p>DFA state definitions (INITIAL, Q1-Q7, INVALIDATION_STATE) used in the automaton.</p>
              </div>
            </div>
          </div>
        </section>

        {/* API Design */}
        <section className="info-section">
          <h2>API Design</h2>
          <div className="api-details">
            <h3>Endpoints</h3>
            
            <div className="api-endpoint">
              <code className="method">POST</code>
              <code className="path">/api/analyze</code>
              <p>Analyze source code and return lexemes</p>
              <div className="api-example">
                <strong>Request:</strong>
                <pre>{`{"source_code": "for count = 10;"}`}</pre>
                <strong>Response:</strong>
                <pre>{`{
  "lexemes": [
    {"lexeme": "for", "token_type": "KEYWORD", "line": 1, "column": 1},
    {"lexeme": "count", "token_type": "IDENTIFIER", "line": 1, "column": 5},
    {"lexeme": "=", "token_type": "ASSIGN", "line": 1, "column": 11},
    {"lexeme": "10", "token_type": "INTEGER", "line": 1, "column": 13},
    {"lexeme": ";", "token_type": "SEMICOLON", "line": 1, "column": 15}
  ],
  "errors": []
}`}</pre>
              </div>
            </div>
            
            <div className="api-endpoint">
              <code className="method">GET</code>
              <code className="path">/api/tokens</code>
              <p>Return the list of recognized token type names</p>
            </div>
          </div>
        </section>

        {/* Data Flow */}
        <section className="info-section">
          <h2>Data Flow</h2>
          <div className="data-flow">
            <div className="flow-step">
              <span className="step-number">1</span>
              <div className="step-content">
                <h4>User Input</h4>
                <p>User enters source code in the React frontend Analyzer component</p>
              </div>
            </div>
            
            <div className="flow-step">
              <span className="step-number">2</span>
              <div className="step-content">
                <h4>API Request</h4>
                <p>Frontend sends POST request to /api/analyze with source code</p>
              </div>
            </div>
            
            <div className="flow-step">
              <span className="step-number">3</span>
              <div className="step-content">
                <h4>DFA Scanning</h4>
                <p>Backend uses the DFA engine to scan each character and identify tokens</p>
              </div>
            </div>
            
            <div className="flow-step">
              <span className="step-number">4</span>
              <div className="step-content">
                <h4>Tokenization</h4>
                <p>Lexemes are extracted with line/column information and token types</p>
              </div>
            </div>
            
            <div className="flow-step">
              <span className="step-number">5</span>
              <div className="step-content">
                <h4>Response</h4>
                <p>Backend returns JSON with lexemes and any errors to the frontend</p>
              </div>
            </div>
            
            <div className="flow-step">
              <span className="step-number">6</span>
              <div className="step-content">
                <h4>Display</h4>
                <p>Frontend renders the tokens in a user-friendly format</p>
              </div>
            </div>
          </div>
        </section>

        {/* Design Principles */}
        <section className="info-section">
          <h2>Design Principles</h2>
          <div className="principles-grid">
            <div className="principle-card">
              <h4>Stateless</h4>
              <p>No database or external state management. Each analysis is independent.</p>
            </div>
            
            <div className="principle-card">
              <h4>Deterministic</h4>
              <p>Uses DFA for guaranteed O(n) scanning complexity with no backtracking.</p>
            </div>
            
            <div className="principle-card">
              <h4>Minimal</h4>
              <p>Simple architecture with clear separation of concerns between frontend and backend.</p>
            </div>
            
            <div className="principle-card">
              <h4>Testable</h4>
              <p>Backend includes pytest tests for DFA engine and analyzer logic.</p>
            </div>
            
            <div className="principle-card">
              <h4>Type-Safe</h4>
              <p>Frontend uses TypeScript, backend uses Python type hints for robust code.</p>
            </div>
            
            <div className="principle-card">
              <h4>Documented</h4>
              <p>Automata theory is fully documented with formal definitions and diagrams.</p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="section-nav">
          <Link to="/automata/tables" className="btn btn-secondary">
            ← Back to Transition Tables
          </Link>
          <Link to="/about" className="btn btn-primary">
            About Project →
          </Link>
        </div>
      </main>

      <footer className="infopage-footer">LexiScan v0.8.4 · Local workspace</footer>
    </div>
  )
}
