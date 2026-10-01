import { Link } from 'react-router-dom'
import Logo from './Logo'

const tokens = [
  { kind: 'keyword',     name: 'KEYWORD',     def: 'Reserved language word',       ex: 'let'     },
  { kind: 'identifier',  name: 'IDENTIFIER',  def: 'A named value or callable',     ex: 'total'   },
  { kind: 'operator',    name: 'OPERATOR',    def: 'An operation or assignment',     ex: '='       },
  { kind: 'number',      name: 'NUMBER',      def: 'Numeric literal',               ex: '42'      },
  { kind: 'string',      name: 'STRING',      def: 'Quoted character sequence',      ex: '"hello"' },
  { kind: 'punctuation', name: 'PUNCTUATION', def: 'Structural source character',    ex: ';'       },
  { kind: 'delimiter',   name: 'DELIMITER',   def: 'Separates grouped expressions',  ex: ','       },
]

export default function TokenReference() {
  return (
    <div className="infopage-root">
      <nav className="infopage-nav">
        <Logo />
        <span>Token Reference</span>
        <Link to="/app" className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>
          Open LexiScan →
        </Link>
      </nav>

      <main className="infopage-content">
        <p className="eyebrow">TOKEN REFERENCE</p>
        <h1>A compact vocabulary for your source.</h1>

        <div className="ref-table">
          <div className="ref-table-head">
            <span>Token type</span>
            <span>Definition</span>
            <span>Example</span>
          </div>
          {tokens.map(t => (
            <div className="ref-table-row" key={t.name}>
              <span className="ref-token-name">
                <span className={`dot dot-${t.kind}`} />
                <code>{t.name}</code>
              </span>
              <span>{t.def}</span>
              <span className="ref-example">{t.ex}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className="infopage-footer">LexiScan v0.8.4 · Local workspace</footer>
    </div>
  )
}
