import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import NFADiagram from '../components/diagrams/NFADiagram'
import TransitionTable from '../components/diagrams/TransitionTable'
import { 
  IDENTIFIER_NFA, 
  MULTI_TOKEN_NFA,
  NFA_TRANSITION_TABLE, 
  MULTI_TOKEN_NFA_TRANSITION_TABLE,
  NFA_STATE_DESCRIPTIONS, 
  NFA_EXECUTION_EXAMPLES,
  NFA_FORMAL_NOTATION,
  NFA_PROPERTIES
} from '../automata/nfa'

export default function NFAPage() {
  return (
    <div className="infopage-root">
      <nav className="infopage-nav">
        <Logo />
        <div className="infopage-nav-links">
          <Link to="/automata" className="nav-link">Overview</Link>
          <Link to="/automata/dfa" className="nav-link">DFA</Link>
          <Link to="/automata/minimized" className="nav-link">Minimized</Link>
          <Link to="/automata/tables" className="nav-link">Tables</Link>
        </div>
        <Link to="/app" className="btn btn-primary btn-sm">
          Open LexiScan →
        </Link>
      </nav>

      <main className="infopage-content">
        <p className="eyebrow">NON-DETERMINISTIC FINITE AUTOMATON</p>
        <h1>NFA - Multi-Token Lexical Analysis</h1>
        <p className="lead">
          The NFA for full lexical analysis uses ε-transitions to branch into different token recognition paths:
          identifiers, numbers, strings, operators, and delimiters.
        </p>

        {/* Multi-Token NFA Overview */}
        <section className="info-section">
          <h2>Multi-Token NFA Overview</h2>
          <p className="section-desc">
            The full lexical analyzer NFA recognizes all token types through union construction.
            From the initial state, ε-transitions branch to separate paths for each token category.
          </p>
          
          <div className="properties-grid">
            <div className="property-card">
              <h4>Total States</h4>
              <div className="property-value">18</div>
              <p>Across all token paths</p>
            </div>
            <div className="property-card">
              <h4>Token Types</h4>
              <div className="property-value">5</div>
              <p>Identifier, Number, String, Operator, Delimiter</p>
            </div>
            <div className="property-card">
              <h4>ε-Transitions</h4>
              <div className="property-value">Yes</div>
              <p>For branching to token paths</p>
            </div>
            <div className="property-card">
              <h4>Architecture</h4>
              <div className="property-value">Union</div>
              <p>Parallel token recognition</p>
            </div>
          </div>
        </section>

        {/* Multi-Token NFA Transition Table */}
        <section className="info-section">
          <h2>Multi-Token NFA Transition Table</h2>
          <TransitionTable
            title={MULTI_TOKEN_NFA_TRANSITION_TABLE.title}
            description={MULTI_TOKEN_NFA_TRANSITION_TABLE.description}
            headers={MULTI_TOKEN_NFA_TRANSITION_TABLE.headers}
            rows={MULTI_TOKEN_NFA_TRANSITION_TABLE.rows}
          />
          <div className="table-note">
            <strong>Note:</strong> The ε-transitions from q0 allow the NFA to "guess" which token type to recognize.
            This demonstrates the union construction L = L₁ ∪ L₂ ∪ L₃ ∪ L₄ ∪ L₅ for all token languages.
          </div>
        </section>

        {/* Identifier NFA (Detailed Study) */}
        <section className="info-section">
          <h2>Identifier NFA (Detailed Study)</h2>
          <p className="section-desc">
            For detailed theoretical analysis, we focus on the identifier recognition pattern:
            <code>(letter|_)(letter|digit|_)*</code>
          </p>

          {/* Formal Definition */}
          <div className="code-block">
            <pre>{NFA_FORMAL_NOTATION}</pre>
          </div>
        </section>

        {/* NFA Diagram */}
        <section className="info-section">
          <h2>Identifier NFA Diagram</h2>
          <div className="diagram-card">
            <div className="diagram-meta">
              <span className="badge badge-nfa">NFA</span>
              <span className="meta-text">
                {NFA_PROPERTIES.totalStates} states · Non-deterministic · 
                {NFA_PROPERTIES.hasEpsilonTransitions ? ' With ε-transitions' : ' No ε-transitions'}
              </span>
            </div>
            <NFADiagram />
          </div>
        </section>

        {/* Identifier Transition Table */}
        <section className="info-section">
          <h2>Identifier NFA Transition Table</h2>
          <TransitionTable
            title={NFA_TRANSITION_TABLE.title}
            description={NFA_TRANSITION_TABLE.description}
            headers={NFA_TRANSITION_TABLE.headers}
            rows={NFA_TRANSITION_TABLE.rows}
          />
        </section>

        {/* State Descriptions */}
        <section className="info-section">
          <h2>Identifier State Descriptions</h2>
          <div className="state-descriptions">
            {Object.entries(NFA_STATE_DESCRIPTIONS).map(([state, info]) => (
              <div key={state} className="state-card">
                <div className="state-header">
                  <code className="state-name">{state}</code>
                  {info.accepting && <span className="badge badge-accepting">Accepting</span>}
                </div>
                <h4>{info.name}</h4>
                <p>{info.description}</p>
                <p className="state-role"><strong>Role:</strong> {info.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Execution Examples */}
        <section className="info-section">
          <h2>Execution Examples</h2>
          
          <h3>Accepted Inputs</h3>
          <div className="example-list">
            {NFA_EXECUTION_EXAMPLES.accepted.map((example, index) => (
              <div key={index} className="example-card accepted">
                <div className="example-input">
                  <code>{example.input}</code>
                  <span className="badge badge-success">ACCEPT</span>
                </div>
                <p className="example-explanation">{example.explanation}</p>
                <div className="example-trace">
                  <strong>Trace:</strong> {example.trace.join(' → ')}
                </div>
              </div>
            ))}
          </div>

          <h3>Rejected Inputs</h3>
          <div className="example-list">
            {NFA_EXECUTION_EXAMPLES.rejected.map((example, index) => (
              <div key={index} className="example-card rejected">
                <div className="example-input">
                  <code>{example.input}</code>
                  <span className="badge badge-error">REJECT</span>
                </div>
                <p className="example-explanation">{example.explanation}</p>
                <div className="example-trace">
                  <strong>Trace:</strong> {example.trace.join(' → ')}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Properties */}
        <section className="info-section">
          <h2>Identifier NFA Properties</h2>
          <div className="properties-grid">
            <div className="property-card">
              <h4>Total States</h4>
              <p className="property-value">{NFA_PROPERTIES.totalStates}</p>
            </div>
            <div className="property-card">
              <h4>Accepting States</h4>
              <p className="property-value">{NFA_PROPERTIES.acceptingStates}</p>
            </div>
            <div className="property-card">
              <h4>Start State</h4>
              <p className="property-value">{NFA_PROPERTIES.startState}</p>
            </div>
            <div className="property-card">
              <h4>Trap State</h4>
              <p className="property-value">{NFA_PROPERTIES.trapState}</p>
            </div>
            <div className="property-card">
              <h4>Deterministic</h4>
              <p className="property-value">{NFA_PROPERTIES.characteristics.deterministic ? 'Yes' : 'No'}</p>
            </div>
            <div className="property-card">
              <h4>Transitions</h4>
              <p className="property-value">{NFA_PROPERTIES.complexity.transitionCount}</p>
            </div>
          </div>
          
          <div className="comparison-conclusion">
            <strong>Multi-Token vs Single-Pattern:</strong> The full lexical analyzer uses a multi-token NFA with 18 states and ε-transitions to recognize all token types.
            The identifier NFA shown above is a subset (5 states) for detailed theoretical study of a single pattern.
          </div>
        </section>

        {/* Navigation */}
        <div className="section-nav">
          <Link to="/automata" className="btn btn-secondary">
            ← Back to Overview
          </Link>
          <Link to="/automata/dfa" className="btn btn-primary">
            View DFA Conversion →
          </Link>
        </div>
      </main>

      <footer className="infopage-footer">LexiScan v0.8.4 · Local workspace</footer>
    </div>
  )
}
