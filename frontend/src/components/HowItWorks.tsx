import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function HowItWorks() {
  const steps = [
    { title: 'SOURCE', desc: 'Paste source', example: 'let total = 42;' },
    { title: 'SCAN', desc: 'Scan', example: 'let | total | = | 42 | ;' },
    { title: 'OUTPUT', desc: 'Inspect', example: 'identifier · total · line 1' }
  ]

  return (
    <div className="info-page">
      <header className="info-header">
        <Logo />
        <Link to="/app" className="o-button">Open LexiScan</Link>
      </header>

      <main className="info-content">
        <p>HOW IT WORKS</p>
        <h1>From raw text to useful structure.</h1>
        <div className="how-steps">
          {steps.map((s, i) => (
            <article key={i} className="how-step">
              <div>
                <code>{i + 1} · {s.title}</code>
                <h2>{s.desc}</h2>
                <p>
                  {i === 0 && 'Drop in code or a .lex file.'}
                  {i === 1 && 'The analyzer reads one character at a time and groups meaningful sequences.'}
                  {i === 2 && 'Filter, select, and read the metadata behind every token.'}
                </p>
              </div>
              <div className="example-box">
                <code>{s.example}</code>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}