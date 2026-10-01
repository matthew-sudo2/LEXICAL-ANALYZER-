import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import DFADiagram from '../components/diagrams/DFADiagram'
import TransitionTable from '../components/diagrams/TransitionTable'
import { 
  IDENTIFIER_DFA, 
  DFA_TRANSITION_TABLE, 
  MULTI_TOKEN_DFA_TRANSITION_TABLE,
  SUBSET_CONSTRUCTION_STEPS,
  DFA_FORMAL_NOTATION,
  NFA_VS_DFA_COMPARISON,
  REACHABILITY_ANALYSIS,
  HYBRID_APPROACH_DESCRIPTION
} from '../automata/dfa'

export default function DFAPage() {
  return (
    <div className="infopage-root">
      <nav className="infopage-nav">
        <Logo />
        <div className="infopage-nav-links">
          <Link to="/automata" className="nav-link">Overview</Link>
          <Link to="/automata/nfa" className="nav-link">NFA</Link>
          <Link to="/automata/minimized" className="nav-link">Minimized</Link>
          <Link to="/automata/tables" className="nav-link">Tables</Link>
        </div>
        <Link to="/app" className="btn btn-primary btn-sm">
          Open LexiScan →
        </Link>
      </nav>

      <main className="infopage-content">
        <p className="eyebrow">DETERMINISTIC FINITE AUTOMATON</p>
        <h1>DFA - Multi-Token Lexical Analysis</h1>
        <p className="lead">
          The DFA for structured tokens (identifiers, numbers, strings) within the hybrid tokenizer.
          Operators and delimiters use pattern matching for efficiency.
        </p>

        {/* Hybrid Approach Overview */}
        <section className="info-section">
          <h2>Hybrid Tokenization Approach</h2>
          <p className="section-desc">
            LexiScan uses a hybrid approach combining DFA for structured tokens and pattern matching for fixed tokens.
          </p>
          
          <div className="steps-container">
            {HYBRID_APPROACH_DESCRIPTION.techniques.map((technique, index) => (
              <div key={index} className="step-card">
                <div className="step-header">
                  <span className="step-number">{technique.name}</span>
                </div>
                <p><strong>Tokens:</strong> {technique.tokens.join(', ')}</p>
                <p>{technique.description}</p>
                <div className="step-result">
                  <strong>States:</strong> {technique.states?.join(', ') || 'N/A'}
                </div>
              </div>
            ))}
          </div>
          
          <div className="comparison-conclusion">
            <strong>Advantages:</strong> {HYBRID_APPROACH_DESCRIPTION.advantages.join(' • ')}
          </div>
        </section>

        {/* Formal Definition */}
        <section className="info-section">
          <h2>Multi-Token DFA Formal Definition</h2>
          <p className="section-desc">
            The formal definition of the sub-DFA used for structured token recognition.
          </p>
          <div className="code-block">
            <pre>{HYBRID_APPROACH_DESCRIPTION.formalDefinition}</pre>
          </div>
        </section>

        {/* Multi-Token DFA Transition Table */}
        <section className="info-section">
          <h2>Multi-Token DFA Transition Table</h2>
          <TransitionTable
            title={MULTI_TOKEN_DFA_TRANSITION_TABLE.title}
            description={MULTI_TOKEN_DFA_TRANSITION_TABLE.description}
            headers={MULTI_TOKEN_DFA_TRANSITION_TABLE.headers}
            rows={MULTI_TOKEN_DFA_TRANSITION_TABLE.rows}
          />
          <div className="table-note">
            <strong>Note:</strong> This DFA handles identifiers, numbers, and strings.
            Operators and delimiters are matched using direct pattern matching (shown in the Token Output column).
          </div>
        </section>

        {/* Identifier Sub-DFA (Sub-DFA Study Case) */}
        <section className="info-section">
          <h2>Sub-DFA Study Case: Identifier Recognition</h2>
          <p className="section-desc">
            For detailed theoretical analysis, we study the identifier recognition DFA as a sub-DFA subset.
            This demonstrates subset construction and minimization techniques without the complexity of the full multi-token system.
          </p>

          {/* Formal Definition */}
          <div className="code-block">
            <pre>{DFA_FORMAL_NOTATION}</pre>
          </div>
          
          <div className="comparison-conclusion">
            <strong>Note:</strong> This is a sub-DFA study case focusing on a single pattern: (letter|_)(letter|digit|_)*.
            The full tokenizer uses the multi-token DFA shown above for all structured tokens.
          </div>
        </section>

        {/* Subset Construction Steps */}
        <section className="info-section">
          <h2>NFA to DFA Conversion - Subset Construction</h2>
          <p className="section-desc">
            Step-by-step conversion process showing how the NFA is transformed into a DFA.
          </p>
          
          <div className="steps-container">
            {SUBSET_CONSTRUCTION_STEPS.steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-header">
                  <span className="step-number">Step {step.step}</span>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.description}</p>
                
                {step.computation && (
                  <div className="step-computation">
                    {Array.isArray(step.computation) ? (
                      step.computation.map((line, i) => (
                        <code key={i}>{line}</code>
                      ))
                    ) : (
                      <code>{step.computation}</code>
                    )}
                  </div>
                )}
                
                {step.analysis && (
                  <div className="step-analysis">
                    {step.analysis.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                )}
                
                {step.newStates && step.newStates.length > 0 && (
                  <div className="step-result">
                    <strong>New states discovered:</strong> {step.newStates.join(', ')}
                  </div>
                )}
                
                {step.partitions && (
                  <div className="step-partitions">
                    {step.partitions.map((partition, i) => (
                      <div key={i} className="partition-item">
                        <span className="partition-id">{partition.id}</span>
                        <span className="partition-states">
                          {partition.states.join(', ')}
                        </span>
                        {partition.canMerge !== undefined && (
                          <span className={`badge ${partition.canMerge ? 'badge-success' : 'badge-warning'}`}>
                            {partition.canMerge ? 'Can merge' : 'Cannot merge'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="step-conclusion">
                  <strong>Result:</strong> {step.result}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Identifier DFA Transition Table */}
        <section className="info-section">
          <h2>Identifier Sub-DFA Transition Table</h2>
          <TransitionTable
            title={DFA_TRANSITION_TABLE.title}
            description={DFA_TRANSITION_TABLE.description}
            headers={DFA_TRANSITION_TABLE.headers}
            rows={DFA_TRANSITION_TABLE.rows}
          />
          <div className="table-note">
            <strong>Note:</strong> This is the identifier sub-DFA for theoretical study.
            The actual tokenizer uses the multi-token DFA shown above for all structured tokens.
          </div>
        </section>

        {/* DFA Diagram */}
        <section className="info-section">
          <h2>Identifier DFA Diagram</h2>
          <div className="diagram-card">
            <div className="diagram-meta">
              <span className="badge badge-dfa">DFA</span>
              <span className="meta-text">
                {IDENTIFIER_DFA.Q.length} states · Deterministic · No ε-transitions
              </span>
            </div>
            <DFADiagram />
          </div>
        </section>

        {/* Comparison */}
        <section className="info-section">
          <h2>NFA vs DFA Comparison</h2>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Aspect</th>
                  <th>NFA</th>
                  <th>DFA</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {NFA_VS_DFA_COMPARISON.characteristics.map((item, index) => (
                  <tr key={index}>
                    <td><strong>{item.aspect}</strong></td>
                    <td><code>{item.nfa}</code></td>
                    <td><code>{item.dfa}</code></td>
                    <td>{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="comparison-conclusion">{NFA_VS_DFA_COMPARISON.conclusion}</p>
        </section>

        {/* Reachability Analysis */}
        <section className="info-section">
          <h2>Reachability Analysis</h2>
          <div className="reachability-list">
            {REACHABILITY_ANALYSIS.analysis.map((item, index) => (
              <div key={index} className="reachability-item">
                <code className="state-code">{item.state}</code>
                <div className="reachability-details">
                  <p><strong>Reachable:</strong> {item.reachable ? 'Yes' : 'No'}</p>
                  <p><strong>Path:</strong> {item.path}</p>
                  <p><strong>Distance:</strong> {item.distance} from start</p>
                  <p><strong>Reason:</strong> {item.reason}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reachability-summary">
            <strong>Summary:</strong> {REACHABILITY_ANALYSIS.summary.totalStates} total states, 
            {REACHABILITY_ANALYSIS.summary.reachableStates} reachable, 
            {REACHABILITY_ANALYSIS.summary.unreachableStates} unreachable
          </div>
        </section>

        {/* Navigation */}
        <div className="section-nav">
          <Link to="/automata/nfa" className="btn btn-secondary">
            ← Back to NFA
          </Link>
          <Link to="/automata/minimized" className="btn btn-primary">
            View Minimized DFA →
          </Link>
        </div>
      </main>

      <footer className="infopage-footer">LexiScan v0.8.4 · Local workspace</footer>
    </div>
  )
}
