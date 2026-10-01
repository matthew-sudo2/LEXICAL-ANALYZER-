import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function TokenReference() {
  const tokens = [
    { type: 'keyword', name: 'KEYWORD', def: 'Reserved language word', example: 'let' },
    { type: 'identifier', name: 'IDENTIFIER', def: 'A named value or callable', example: 'total' },
    { type: 'operator', name: 'OPERATOR', def: 'An operation or assignment symbol', example: '=' },
    { type: 'number', name: 'NUMBER', def: 'Numeric literal', example: '42' },
    { type: 'string', name: 'STRING', def: 'Quoted character sequence', example: '"hello"' },
    { type: 'punctuation', name: 'PUNCTUATION', def: 'Structural source character', example: ';' },
    { type: 'delimiter', name: 'DELIMITER', def: 'Separates grouped expressions', example: ',' }
  ]

  return (
    <div className="info-page">
      <header className="info-header">
        <Logo />
        <span>Token Reference</span>
        <Link to="/app" className="o-button">Open LexiScan</Link>
      </header>

      <main className="info-content">
        <p>TOKEN REFERENCE</p>
        <h1>A compact vocabulary for your source.</h1>
        <div className="reference-table">
          <div className="reference-head">
            <span>Token type</span>
            <span>Definition</span>
            <span>Example</span>
          </div>
          {tokens.map((t, i) => (
            <div className="reference-row" key={i}>
              <span><i className={`dot ${t.type}`} /><code>{t.name}</code></span>
              <span>{t.def}</span>
              <code>{t.example}</code>
            </div>
          ))}
        </div>
      </main>

      <footer className="info-footer">LexiScan v0.8.4 · Local workspace</footer>
    </div>
  )
}