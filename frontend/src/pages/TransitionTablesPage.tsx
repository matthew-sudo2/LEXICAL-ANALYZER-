import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import TransitionTable from '../components/diagrams/TransitionTable'
import { 
  NFA_TRANSITION_TABLE, 
  MULTI_TOKEN_NFA_TRANSITION_TABLE 
} from '../automata/nfa'
import { 
  DFA_TRANSITION_TABLE, 
  MULTI_TOKEN_DFA_TRANSITION_TABLE 
} from '../automata/dfa'
import { MINIMIZED_DFA_TRANSITION_TABLE } from '../automata/minimizedDFA'

export default function TransitionTablesPage() {
  return (
    <div className="infopage-root">
      <nav className="infopage-nav">
        <Logo />
        <div className="infopage-nav-links">
          <Link to="/automata" className="nav-link">Overview</Link>
          <Link to="/automata/nfa" className="nav-link">NFA</Link>
          <Link to="/automata/dfa" className="nav-link">DFA</Link>
          <Link to="/automata/minimized" className="nav-link">Minimized</Link>
        </div>
        <Link to="/app" className="btn btn-primary btn-sm">
          Open LexiScan →
        </Link>
      </nav>

      <main className="infopage-content">
        <p className="eyebrow">TRANSITION TABLES</p>
        <h1>Automata Transition Tables</h1>
        <p className="lead">
          Complete transition tables for NFA, DFA, and Minimized DFA showing state transitions for each input symbol.
          Includes both identifier-focused tables (for detailed study) and multi-token tables (for full system documentation).
        </p>

        {/* Multi-Token NFA Transition Table */}
        <section className="info-section">
          <h2>Multi-Token NFA Transition Table</h2>
          <p className="section-desc">
            The NFA for full lexical analysis with ε-transitions to all token branches.
            Shows how the NFA branches into identifier, number, string, operator, and delimiter paths.
          </p>
          <TransitionTable
            title={MULTI_TOKEN_NFA_TRANSITION_TABLE.title}
            description={MULTI_TOKEN_NFA_TRANSITION_TABLE.description}
            headers={MULTI_TOKEN_NFA_TRANSITION_TABLE.headers}
            rows={MULTI_TOKEN_NFA_TRANSITION_TABLE.rows}
          />
          <div className="table-note">
            <strong>Note:</strong> The NFA uses ε-transitions (epsilon) to branch to all token recognition paths from the initial state.
            This demonstrates the union construction for multi-token lexical analysis.
          </div>
        </section>

        {/* Identifier NFA Transition Table */}
        <section className="info-section">
          <h2>Identifier NFA Transition Table (Detailed Study)</h2>
          <p className="section-desc">
            The NFA transition function δ: Q × Σ → P(Q) returns a set of possible next states.
            This table focuses on the identifier recognition pattern for detailed analysis.
          </p>
          <TransitionTable
            title={NFA_TRANSITION_TABLE.title}
            description={NFA_TRANSITION_TABLE.description}
            headers={NFA_TRANSITION_TABLE.headers}
            rows={NFA_TRANSITION_TABLE.rows}
          />
          <div className="table-note">
            <strong>Note:</strong> Each cell contains a set of possible next states (non-deterministic).
            The identifier NFA is actually deterministic but defined in NFA form for theoretical consistency.
          </div>
        </section>

        {/* Multi-Token DFA Transition Table */}
        <section className="info-section">
          <h2>Multi-Token DFA Transition Table</h2>
          <p className="section-desc">
            The DFA used in the hybrid tokenizer for structured tokens (identifiers, numbers, strings).
            Operators and delimiters use pattern matching instead of DFA transitions.
          </p>
          <TransitionTable
            title={MULTI_TOKEN_DFA_TRANSITION_TABLE.title}
            description={MULTI_TOKEN_DFA_TRANSITION_TABLE.description}
            headers={MULTI_TOKEN_DFA_TRANSITION_TABLE.headers}
            rows={MULTI_TOKEN_DFA_TRANSITION_TABLE.rows}
          />
          <div className="table-note">
            <strong>Note:</strong> This DFA handles variable-length tokens (identifiers, numbers, strings).
            Fixed-character tokens (operators, delimiters) are matched using direct pattern matching for efficiency.
            The "Token Output" column shows which token type is emitted when reaching an accepting state.
          </div>
          
          <h3>Token Type Mapping</h3>
          <div className="state-descriptions">
            {Object.entries(MULTI_TOKEN_DFA_TRANSITION_TABLE.tokenTypeMapping).map(([token, description]) => (
              <div key={token} className="state-card">
                <div className="state-header">
                  <code className="state-name">{token}</code>
                </div>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Identifier DFA Transition Table */}
        <section className="info-section">
          <h2>Identifier DFA Transition Table (Detailed Study)</h2>
          <p className="section-desc">
            The DFA transition function δ': Q × Σ → Q returns exactly one next state (deterministic).
            This table focuses on the identifier recognition pattern for detailed analysis.
          </p>
          <TransitionTable
            title={DFA_TRANSITION_TABLE.title}
            description={DFA_TRANSITION_TABLE.description}
            headers={DFA_TRANSITION_TABLE.headers}
            rows={DFA_TRANSITION_TABLE.rows}
          />
          <div className="table-note">
            <strong>Note:</strong> Each cell contains exactly one next state (deterministic).
          </div>
        </section>

        {/* Minimized DFA Transition Table */}
        <section className="info-section">
          <h2>Minimized DFA Transition Table</h2>
          <p className="section-desc">
            The minimized DFA has fewer states but accepts the same language.
          </p>
          <TransitionTable
            title={MINIMIZED_DFA_TRANSITION_TABLE.title}
            description={MINIMIZED_DFA_TRANSITION_TABLE.description}
            headers={MINIMIZED_DFA_TRANSITION_TABLE.headers}
            rows={MINIMIZED_DFA_TRANSITION_TABLE.rows}
          />
          <div className="table-note">
            <strong>Note:</strong> States q1, q2, q3 from the original DFA are merged into qACC.
          </div>
        </section>

        {/* Comparison Summary */}
        <section className="info-section">
          <h2>Table Comparison</h2>
          <div className="comparison-summary">
            <div className="comparison-card">
              <h3>Multi-Token NFA</h3>
              <ul>
                <li>18 states (all token paths)</li>
                <li>Non-deterministic with ε-transitions</li>
                <li>Multiple possible next states</li>
                <li>Union construction for all tokens</li>
              </ul>
            </div>
            
            <div className="comparison-card">
              <h3>Identifier NFA</h3>
              <ul>
                <li>5 states</li>
                <li>Non-deterministic transitions</li>
                <li>Multiple possible next states</li>
                <li>Single pattern study focus</li>
              </ul>
            </div>
            
            <div className="comparison-card">
              <h3>Multi-Token DFA</h3>
              <ul>
                <li>7 states (structured tokens only)</li>
                <li>Deterministic transitions</li>
                <li>Exactly one next state per symbol</li>
                <li>Used in hybrid tokenizer</li>
              </ul>
            </div>
            
            <div className="comparison-card highlighted">
              <h3>Minimized DFA</h3>
              <ul>
                <li>3 states (40% reduction)</li>
                <li>Deterministic transitions</li>
                <li>Exactly one next state per symbol</li>
                <li>Optimal for implementation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Differences */}
        <section className="info-section">
          <h2>Key Differences</h2>
          <div className="differences-list">
            <div className="difference-item">
              <h4>Scope</h4>
              <p>
                <strong>Multi-Token Tables:</strong> Show the full lexical analyzer with all token types (identifiers, numbers, strings, operators, delimiters).
                <br />
                <strong>Identifier Tables:</strong> Focus on a single pattern for detailed theoretical study.
              </p>
            </div>
            
            <div className="difference-item">
              <h4>Approach</h4>
              <p>
                <strong>Multi-Token NFA:</strong> Uses ε-transitions to branch into different token recognition paths (union construction).
                <br />
                <strong>Multi-Token DFA:</strong> Part of hybrid approach - DFA for structured tokens, pattern matching for fixed tokens.
                <br />
                <strong>Identifier DFA:</strong> Pure DFA for single pattern recognition.
              </p>
            </div>
            
            <div className="difference-item">
              <h4>Implementation</h4>
              <p>
                <strong>LexiScan Analyzer:</strong> Uses hybrid approach - DFA for identifiers/numbers/strings, direct pattern matching for operators/delimiters.
                <br />
                <strong>Advantage:</strong> More efficient than a single monolithic DFA for all tokens.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="section-nav">
          <Link to="/automata/minimized" className="btn btn-secondary">
            ← Back to Minimized DFA
          </Link>
          <Link to="/docs/system-design" className="btn btn-primary">
            View System Design →
          </Link>
        </div>
      </main>

      <footer className="infopage-footer">LexiScan v0.8.4 · Local workspace</footer>
    </div>
  )
}
