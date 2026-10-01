import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import MinimizedDFADiagram from '../components/diagrams/MinimizedDFADiagram'
import TransitionTable from '../components/diagrams/TransitionTable'
import { 
  MINIMIZED_DFA, 
  MINIMIZED_DFA_TRANSITION_TABLE, 
  MINIMIZATION_STEPS,
  MINIMIZED_DFA_FORMAL_NOTATION,
  DFA_MINIMIZATION_COMPARISON,
  EQUIVALENCE_ANALYSIS,
  MINIMIZED_STATE_DESCRIPTIONS
} from '../automata/minimizedDFA'

export default function MinimizedDFAPage() {
  try {
    return (
      <div className="infopage-root">
        <nav className="infopage-nav">
          <Logo />
          <div className="infopage-nav-links">
            <Link to="/automata" className="nav-link">Overview</Link>
            <Link to="/automata/nfa" className="nav-link">NFA</Link>
            <Link to="/automata/dfa" className="nav-link">DFA</Link>
            <Link to="/automata/tables" className="nav-link">Tables</Link>
          </div>
          <Link to="/app" className="btn btn-primary btn-sm">
            Open LexiScan →
          </Link>
        </nav>

        <main className="infopage-content">
          <p className="eyebrow">MINIMIZED DFA</p>
          <h1>Minimized DFA - Identifier Recognition</h1>
          <p className="lead">
            The DFA is minimized using partition refinement to merge equivalent states, reducing from 5 states to 3 states (40% reduction).
          </p>

          {/* Formal Definition */}
          <section className="info-section">
            <h2>Formal Definition</h2>
            <div className="code-block">
              <pre>{MINIMIZED_DFA_FORMAL_NOTATION}</pre>
            </div>
          </section>

          {/* Minimization Steps */}
          <section className="info-section">
            <h2>DFA Minimization - Partition Refinement</h2>
            <p className="section-desc">
              Step-by-step process to identify and merge equivalent states.
            </p>
            
            <div className="steps-container">
              {MINIMIZATION_STEPS.steps.map((step, index) => (
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
                      ) : typeof step.computation === 'object' ? (
                        <div>
                          {Object.entries(step.computation).map(([key, value]) => (
                            <div key={key}>
                              <strong>{key}:</strong> {Array.isArray(value) ? value.join(', ') : String(value)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <code>{step.computation}</code>
                      )}
                    </div>
                  )}
                  
                  {step.analysis && (
                    <div className="step-analysis">
                      {step.analysis.checkEquivalence && (
                        <p><strong>Check:</strong> {step.analysis.checkEquivalence}</p>
                      )}
                      {step.analysis.transitions && (
                        <div className="transitions-analysis">
                          {step.analysis.transitions.map((trans, i) => (
                            <div key={i} className="transition-row">
                              <code>{trans.state}</code>
                              <span>{trans.signature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {step.merging && (
                    <div className="step-merging">
                      {step.merging.map((merge, i) => (
                        <div key={i} className="merge-item">
                          <code>{merge.originalStates.join(', ')}</code>
                          <span>→</span>
                          <code>{merge.newState}</code>
                          <p>{merge.reason}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {step.stateMapping && (
                    <div className="state-mapping">
                      <strong>State Mapping:</strong>
                      {Object.entries(step.stateMapping).map(([from, to]) => (
                        <span key={from} className="mapping-item">
                          <code>{from}</code> → <code>{to}</code>
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {step.comparison && (
                    <div className="step-comparison">
                      <div className="comparison-metrics">
                        <div>
                          <strong>Original:</strong> {step.comparison.originalDFA?.states || 'N/A'} states
                        </div>
                        <div>
                          <strong>Minimized:</strong> {step.comparison.minimizedDFA?.states || 'N/A'} states
                        </div>
                        <div className="highlight">
                          <strong>Reduction:</strong> {step.comparison.reduction?.percentReduction || 'N/A'}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="step-conclusion">
                    <strong>Result:</strong> {step.result}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Minimized DFA Diagram */}
          <section className="info-section">
            <h2>Minimized DFA Diagram</h2>
            <div className="diagram-card">
              <div className="diagram-meta">
                <span className="badge badge-minimized">Minimized DFA</span>
                <span className="meta-text">
                  {MINIMIZED_DFA.Q.length} states · Optimized · {MINIMIZATION_STEPS.conclusion?.minimizedStates || 3} states (reduced from {MINIMIZATION_STEPS.conclusion?.originalStates || 5})
                </span>
              </div>
              <MinimizedDFADiagram />
            </div>
          </section>

          {/* Transition Table */}
          <section className="info-section">
            <h2>Minimized DFA Transition Table</h2>
            <TransitionTable
              title={MINIMIZED_DFA_TRANSITION_TABLE?.title || 'Transition Table'}
              description={MINIMIZED_DFA_TRANSITION_TABLE?.description || ''}
              headers={MINIMIZED_DFA_TRANSITION_TABLE?.headers || []}
              rows={MINIMIZED_DFA_TRANSITION_TABLE?.rows || []}
            />
          </section>

          {/* Equivalence Analysis */}
          <section className="info-section">
            <h2>State Equivalence Analysis</h2>
            <p className="section-desc">
              Detailed proof of which states are equivalent and can be merged.
            </p>
            
            <div className="equivalence-classes">
              {EQUIVALENCE_ANALYSIS?.equivalenceClasses?.map((eqClass, index) => (
                <div key={index} className="equivalence-class">
                  <div className="class-header">
                    <h4>{eqClass.class}</h4>
                    {eqClass.equivalent ? (
                      <span className="badge badge-success">EQUIVALENT</span>
                    ) : (
                      <span className="badge badge-warning">NOT EQUIVALENT</span>
                    )}
                  </div>
                  <div className="class-states">
                    <strong>States:</strong> {eqClass.states.join(', ')}
                  </div>
                  <div className="class-proof">
                    {eqClass.proof.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  <div className="class-result">
                    <strong>Merged into:</strong> <code>{eqClass.mergedInto}</code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison */}
          <section className="info-section">
            <h2>DFA Before and After Minimization</h2>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Original DFA</th>
                    <th>Minimized DFA</th>
                    <th>Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  {DFA_MINIMIZATION_COMPARISON?.metrics?.map((metric, index) => (
                    <tr key={index}>
                      <td><strong>{metric.metric}</strong></td>
                      <td><code>{metric.original}</code></td>
                      <td><code>{metric.minimized}</code></td>
                      <td className="highlight">{metric.improvement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h3>State Mapping</h3>
            <div className="state-mapping-list">
              {DFA_MINIMIZATION_COMPARISON?.stateMapping?.mappings?.map((mapping, index) => (
                <div key={index} className="mapping-item-card">
                  <code>{mapping.original}</code>
                  <span>→</span>
                  <code>{mapping.minimized}</code>
                  <p>{mapping.note}</p>
                </div>
              ))}
            </div>
            
            <h3>Language Equivalence</h3>
            <div className="language-equivalence">
              <p><strong>{DFA_MINIMIZATION_COMPARISON?.languageEquivalence?.statement || ''}</strong></p>
              <p>{DFA_MINIMIZATION_COMPARISON?.languageEquivalence?.proof || ''}</p>
              <div className="test-cases">
                {DFA_MINIMIZATION_COMPARISON?.languageEquivalence?.testCases?.map((test, index) => (
                  <div key={index} className="test-case">
                    <code>{test.input}</code>
                    <span>Original: {test.originalTrace}</span>
                    <span>Minimized: {test.minimizedTrace}</span>
                    <span className={test.both === 'ACCEPT' ? 'badge-success' : 'badge-error'}>
                      {test.both}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* State Descriptions */}
          <section className="info-section">
            <h2>Minimized State Descriptions</h2>
            <div className="state-descriptions">
              {Object.entries(MINIMIZED_STATE_DESCRIPTIONS || {}).map(([state, info]) => (
                <div key={state} className="state-card">
                  <div className="state-header">
                    <code className="state-name">{state}</code>
                    {info.accepting && <span className="badge badge-accepting">Accepting</span>}
                  </div>
                  <h4>{info.name}</h4>
                  <p>{info.description}</p>
                  <p className="state-behavior"><strong>Behavior:</strong> {info.behavior}</p>
                  {info.originalStates && (
                    <p className="state-original">
                      <strong>Merged from:</strong> {info.originalStates.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Navigation */}
          <div className="section-nav">
            <Link to="/automata/dfa" className="btn btn-secondary">
              ← Back to DFA
            </Link>
            <Link to="/automata/tables" className="btn btn-primary">
              View Transition Tables →
            </Link>
          </div>
        </main>

        <footer className="infopage-footer">LexiScan v0.8.4 · Local workspace</footer>
      </div>
    )
  } catch (error) {
    console.error('Error in MinimizedDFAPage:', error)
    return (
      <div className="infopage-root">
        <main className="infopage-content">
          <h1>Error Loading Page</h1>
          <p>There was an error loading the Minimized DFA page.</p>
          <pre>{String(error)}</pre>
          <Link to="/automata" className="btn btn-primary">Back to Overview</Link>
        </main>
      </div>
    )
  }
}
