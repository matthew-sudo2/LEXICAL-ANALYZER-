import { Link } from 'react-router-dom'
import Logo from './Logo'

const steps = [
  {
    label: '01 · SOURCE',
    title: 'Paste source',
    desc:  'Drop in code or a .lex file.',
    ex:    'let total = 42;',
  },
  {
    label: '02 · SCAN',
    title: 'Scan',
    desc:  'The analyzer reads one character at a time and groups meaningful sequences.',
    ex:    'let | total | = | 42 | ;',
  },
  {
    label: '03 · OUTPUT',
    title: 'Inspect',
    desc:  'Filter, select, and read the metadata behind every token.',
    ex:    'identifier · total · line 1',
  },
]

export default function HowItWorks() {
  return (
    <div className="infopage-root">
      <nav className="infopage-nav">
        <Logo />
        <Link to="/app" className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>
          Open LexiScan →
        </Link>
      </nav>

      <main className="infopage-content">
        <p className="eyebrow">HOW IT WORKS</p>
        <h1>From raw text to useful structure.</h1>

        <div className="how-steps-list">
          {steps.map(s => (
            <div className="how-step-entry" key={s.label}>
              <div className="how-step-text">
                <code>{s.label}</code>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              <div className="how-step-box">
                <code>{s.ex}</code>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="infopage-footer">LexiScan v0.8.4 · Local workspace</footer>
    </div>
  )
}
