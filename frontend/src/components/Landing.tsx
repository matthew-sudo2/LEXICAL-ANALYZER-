import { Link } from 'react-router-dom'
import Logo from './Logo'

const team = [
  ['Franz Salazar',  'Leader / Programmer',  'FS'],
  ['Jhon Roy Gamboa','Tester / QA',           'JG'],
  ['Matthew',        'Automata Optimizer',    'MA'],
  ['Ace Sandoval',   'DFA Designer',          'AS'],
  ['Bench Culubong', 'Language Analyst',      'BC'],
  ['Jude Prodi',     'RE / NFA Designer',     'JP'],
  ['James Berto',    'RE / NFA Designer',     'JB'],
  ['Alecks Santos',  'Programmer',            'AS'],
  ['Leona Charlize', 'Documentation',         'LC'],
]

const demoTokens = [
  { name: 'keyword',    lexeme: 'let',     type: 'KEYWORD',    line: 1, selected: false },
  { name: 'identifier', lexeme: 'total',   type: 'IDENTIFIER', line: 1, selected: true  },
  { name: 'operator',   lexeme: '=',       type: 'OPERATOR',   line: 1, selected: false },
  { name: 'number',     lexeme: '42',      type: 'NUMBER',     line: 1, selected: false },
  { name: 'string',     lexeme: '"hello"', type: 'STRING',     line: 2, selected: false },
]

export default function Landing() {
  return (
    <div className="landing-root">
      {/* ── Navigation ───────────────────────────────── */}
      <nav className="landing-nav">
        <Logo />
        <div className="nav-links">
          <Link to="/">Product</Link>
          <Link to="/automata">Automata</Link>
          <Link to="/tests">Tests</Link>
          <Link to="/docs/token-reference">Token Reference</Link>
          <Link to="/about">Team</Link>
          <Link to="/docs/how-it-works">Docs</Link>
        </div>
        <Link to="/app" className="btn btn-primary">Open LexiScan →</Link>
      </nav>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="landing-hero">
        <p className="hero-eyebrow">LEXICAL ANALYZER · v0.8.4</p>
        <h1 className="hero-title">See every token in your source.</h1>
        <p className="hero-sub">
          Paste code, get a clean, inspectable token stream — without leaving
          the moment you are debugging.
        </p>
        <div className="hero-actions">
          <Link to="/app" className="btn btn-primary">Run the analyzer →</Link>
          <Link to="/docs/token-reference" className="btn btn-ghost">View token reference</Link>
        </div>

        {/* Demo window */}
        <div className="demo-window">
          <div className="demo-titlebar">
            <span className="demo-titlebar-dot" />
            <span className="demo-titlebar-dot" />
            <span className="demo-titlebar-dot" />
            <span className="demo-titlebar-title">LexiScan — untitled.lex</span>
          </div>
          <div className="demo-body">
            {/* Source side */}
            <div className="demo-panel">
              <div className="demo-panel-title">
                Source Input
                <span className="demo-lang-badge">JavaScript</span>
              </div>
              <div className="demo-code">
                <div className="demo-code-line">
                  <span className="demo-line-num">1</span>
                  <span>
                    <span className="demo-kw">let</span>
                    {' '}total{' '}
                    <span className="demo-op">=</span>
                    {' '}
                    <span className="demo-num">42</span>;
                  </span>
                </div>
                <div className="demo-code-line">
                  <span className="demo-line-num">2</span>
                  <span>
                    print(<span className="demo-str">"hello"</span>);
                  </span>
                </div>
              </div>
            </div>

            {/* Token output side */}
            <div className="demo-panel">
              <div className="demo-panel-title">
                Token Output
                <span className="demo-lang-badge" style={{ float: 'none' }}>24 tokens</span>
              </div>
              <div className="demo-token-table">
                <div className="demo-token-head">
                  <span>Token</span>
                  <span>Lexeme</span>
                  <span>Type</span>
                  <span>Line</span>
                </div>
                {demoTokens.map((t, i) => (
                  <div key={i} className={`demo-token-row${t.selected ? ' highlighted' : ''}`}>
                    <span className="demo-token-name">
                      <span className={`dot dot-${t.name}`} />
                      {t.name}
                    </span>
                    <span className="demo-token-lexeme">{t.lexeme}</span>
                    <span className="demo-token-type">{t.type}</span>
                    <span className="demo-token-line">{t.line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What is a Lexical Analyzer ───────────────── */}
      <section className="section-what">
        <p className="eyebrow">WHAT IS A LEXICAL ANALYZER</p>
        <div className="what-layout">
          <article>
            <h2 className="what-title">A scanner that reads code character by character.</h2>
            <p className="what-desc">
              A lexical analyzer, or scanner, reads raw source code as a stream of
              characters and groups them into meaningful tokens — keywords,
              identifiers, operators, literals — so a parser can understand the
              program.
            </p>
          </article>
          <div className="bracket-demo">
            <div className="bracket-line">let total = 42 ;</div>
            <div className="bracket-tokens">
              <span className="bracket-token kw">let<span className="bracket-token-label">KEYWORD</span></span>
              <span className="bracket-token id">total<span className="bracket-token-label">IDENTIFIER</span></span>
              <span className="bracket-token op">=<span className="bracket-token-label">OPERATOR</span></span>
              <span className="bracket-token num">42<span className="bracket-token-label">NUMBER</span></span>
              <span className="bracket-token pun">;<span className="bracket-token-label">PUNCTUATION</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section className="section-how">
        <p className="eyebrow">HOW IT WORKS</p>
        <div className="how-steps-row">
          {[
            ['01', 'Paste source',  'Drop in code or a .lex file.'],
            ['02', 'Scan',          'The analyzer splits input into tokens.'],
            ['03', 'Inspect',       'Filter, select, and read token metadata.'],
          ].map(([num, title, desc]) => (
            <div className="how-step-item" key={num}>
              <div className="how-step-num">{num}</div>
              <div className="how-step-title">{title}</div>
              <div className="how-step-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Token Reference ──────────────────────────── */}
      <section className="section-token-ref">
        <p className="eyebrow">TOKEN REFERENCE</p>
        <div className="token-ref-card">
          <div className="token-ref-code">
            <span className="demo-kw">let</span>
            {' '}total{' '}
            <span className="demo-op">=</span>
            {' '}
            <span className="demo-num">42</span>; print(
            <span className="demo-str">"hello"</span>);
          </div>
          <div className="token-legend">
            {['keyword','identifier','operator','number','string','punctuation'].map(k => (
              <span key={k} className="token-legend-item">
                <span className={`dot dot-${k}`} />
                {k}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inspect with Context ─────────────────────── */}
      <section className="section-inspect">
        <p className="eyebrow">INSPECT WITH CONTEXT</p>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.04em', margin: '12px 0 8px', color: '#1a2226' }}>
          One screen, both sides of the scan.
        </h2>
        <p style={{ fontSize: 14, color: '#6b7b82', maxWidth: 380, marginBottom: 0, lineHeight: 1.6 }}>
          Source and output stay in view together, so every lexeme has a clear origin.
        </p>
        <div className="inspect-layout">
          {/* Source panel */}
          <div className="inspect-panel">
            <div className="inspect-panel-header">
              <span className="inspect-panel-title">Source Input</span>
              <span className="inspect-panel-badge">JavaScript</span>
            </div>
            <div className="inspect-code">
              <div className="inspect-code-line">
                <span className="inspect-ln">1</span>
                <span>
                  <span className="demo-kw">let</span> total <span className="demo-op">=</span> <span className="demo-num">42</span>;
                </span>
              </div>
              <div className="inspect-code-line">
                <span className="inspect-ln">2</span>
                <span>print(<span className="demo-str">"hello"</span>);</span>
              </div>
            </div>
            <div className="inspect-footer">
              <span>UTF-8</span>
              <span>Ln 1, Col 1</span>
            </div>
          </div>

          {/* Token output panel */}
          <div className="inspect-panel">
            <div className="inspect-panel-header">
              <span className="inspect-panel-title">Token Output</span>
              <span className="inspect-panel-badge">24 tokens</span>
            </div>
            <div className="inspect-token-head">
              <span>Token</span>
              <span>Lexeme</span>
              <span>Type</span>
              <span>Line</span>
            </div>
            {demoTokens.map((t, i) => (
              <div key={i} className={`inspect-token-row${t.selected ? ' selected' : ''}`}>
                <span className="inspect-token-name">
                  <span className={`dot dot-${t.name}`} />
                  {t.name}
                </span>
                <span className="inspect-token-lexeme">{t.lexeme}</span>
                <span className="inspect-token-type">{t.type}</span>
                <span className="inspect-token-line">{t.line}</span>
              </div>
            ))}
            <div className="inspect-footer">
              <span>Analysis complete</span>
              <span>0 errors</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────── */}
      <section className="section-team">
        <p className="eyebrow">MEET THE TEAM</p>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.04em', margin: '12px 0 0', color: '#1a2226' }}>
          The team behind LexiScan.
        </h2>
        <div className="team-grid">
          {team.map(([name, role, initials], i) => (
            <div className="team-card" key={i}>
              <span className="team-avatar">{initials}</span>
              <div className="team-info">
                <span className="team-name">
                  {name}
                  {i === 0 && <span className="team-lead-badge">LEAD</span>}
                </span>
                <span className="team-role">{role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="section-cta">
        <div className="cta-card">
          <p className="eyebrow">READY WHEN YOU ARE</p>
          <h2 className="cta-title">Start scanning in seconds.</h2>
          <p className="cta-sub">
            No setup screen. No hidden processing. Just paste your source and
            inspect what the language sees.
          </p>
          <Link to="/app" className="btn btn-primary">Open LexiScan →</Link>
          <p className="cta-fine">No install · Runs locally · v0.8.4</p>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="landing-footer">
        <Logo />
        <div className="footer-links">
          <Link to="/docs/how-it-works">Docs</Link>
          <a href="https://github.com/matthew-sudo2/LEXICAL-ANALYZER-" target="_blank" rel="noopener noreferrer">GitHub</a>
          <Link to="/about">Changelog</Link>
        </div>
        <span className="footer-version">LexiScan v0.8.4 · Local workspace</span>
      </footer>
    </div>
  )
}
