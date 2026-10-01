import { Link } from 'react-router-dom'
import Logo from './Logo'
import Analyzer from './Analyzer'

export default function Landing() {
  const team = [
    ['Franz Salazar', 'Leader / Programmer', 'FS'],
    ['Jhon Roy Gamboa', 'Tester / QA', 'JG'],
    ['Matthew', 'Automata Optimizer', 'MA'],
    ['Ace Sandoval', 'DFA Designer', 'AS'],
    ['Bench Culubong', 'Language Analyst', 'BC'],
    ['Jude Prodi', 'RE / NFA Designer', 'JP'],
    ['James Berto', 'RE / NFA Designer', 'JB'],
    ['Alecks Santos', 'Programmer', 'AS'],
    ['Leona Charlize', 'Documentation', 'LC']
  ]

  return (
    <div className="landing-container">
      <header className="landing-header">
        <Logo />
        <nav className="landing-nav">
          <Link to="/">Product</Link>
          <Link to="/docs/token-reference">Token Reference</Link>
          <Link to="/about">Team</Link>
          <Link to="/docs/how-it-works">Docs</Link>
        </nav>
        <Link to="/app" className="o-button">Open LexiScan</Link>
      </header>

      <section className="landing-hero">
        <p>LEXICAL ANALYZER · v0.8.4</p>
        <h1>See every token in your source.</h1>
        <p>Paste code, get a clean, inspectable token stream.</p>
        <div className="hero-buttons">
          <Link to="/app" className="o-button">Run the analyzer</Link>
          <Link to="/docs/token-reference" className="o-button ghost">View token reference</Link>
        </div>
        <div className="landing-demo">
          <div className="demo-bar">● ● ● <span>LexiScan — untitled.lex</span></div>
          <div className="demo-grid">
            <div className="demo-source">
              <b>Source Input</b>
              <div className="code-block">
                <div><i>1</i><code><em>let</em> total <b>=</b> <strong>42</strong>;</code></div>
                <div><i>2</i><code>print(<u>"hello"</u>);</code></div>
              </div>
            </div>
            <div className="demo-results">
              <b>Token Output</b>
              <div className="token-table-small">
                <div className="token-head-small">
                  <span>Token</span><span>Lexeme</span><span>Type</span><span>Line</span><span>Col</span>
                </div>
                {[
                  ['keyword', 'let', 'KEYWORD', '1', '1'],
                  ['identifier', 'total', 'IDENTIFIER', '1', '5'],
                  ['operator', '=', 'OPERATOR', '1', '11'],
                  ['number', '42', 'NUMBER', '1', '13']
                ].map((row, i) => (
                  <div className="token-row-small" key={i}>
                    <span className={`dot ${row[0]}`} />
                    <code>{row[1]}</code>
                    <span>{row[2]}</span>
                    <span>{row[3]}</span>
                    <span>{row[4]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-what">
        <p>WHAT IS A LEXICAL ANALYZER</p>
        <div className="what-grid">
          <article>
            <h2>A scanner that reads code character by character.</h2>
            <p>A lexical analyzer, or scanner, reads raw source code as a stream of characters and groups them into meaningful tokens — keywords, identifiers, operators, literals — so a parser can understand the program.</p>
          </article>
          <div className="bracket-code">
            <span className="keyword-token">let</span>
            <span className="identifier-token">total</span>
            <span className="operator-token">=</span>
            <span className="number-token">42</span>
            <span className="punctuation-token">;</span>
          </div>
        </div>
      </section>

      <section className="landing-steps">
        <p>HOW IT WORKS</p>
        <div className="steps-grid">
          {[
            ['01', 'Paste source', 'Drop in code or a .lex file.'],
            ['02', 'Scan', 'The analyzer splits input into tokens.'],
            ['03', 'Inspect', 'Filter, select, and read token metadata.']
          ].map(([step, title, desc], i) => (
            <article key={i}>
              <i>{step}</i>
              <b>{title}</b>
              <span>{desc}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-reference">
        <p>TOKEN REFERENCE</p>
        <div className="reference-grid">
          <code>let total = 42; print("hello");</code>
          <div className="dot-kinds">
            {['keyword', 'identifier', 'operator', 'number', 'punctuation', 'string'].map(k => (
              <span key={k}><i className={`dot ${k}`} />{k}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-team">
        <p>MEET THE TEAM</p>
        <h2>The team behind LexiScan.</h2>
        <div className="team-grid">
          {team.map(([name, role, initials], i) => (
            <div className="team-item" key={i}>
              <span className="avatar">{initials}</span>
              <div>
                <b>{name}{i === 0 && <em>LEAD</em>}</b>
                <small>{role}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-cta">
        <p>READY WHEN YOU ARE</p>
        <h2>Start scanning in seconds.</h2>
        <p>No setup screen. Just paste your source and inspect what the language sees.</p>
        <Link to="/app" className="o-button">Open LexiScan</Link>
        <span>No install · Runs locally · v0.8.4</span>
      </section>

      <footer className="landing-footer">
        <Logo />
        <div className="footer-links">
          <Link to="/docs/how-it-works">Docs</Link>
          <a href="https://github.com/matthew-sudo2/LEXICAL-ANALYZER-" target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link to="/about">Changelog</Link>
        </div>
        <code>LexiScan v0.8.4 · Local workspace</code>
      </footer>
    </div>
  )
}