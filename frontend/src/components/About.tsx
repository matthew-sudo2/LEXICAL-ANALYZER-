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

export default function About() {
  return (
    <div className="infopage-root">
      <nav className="infopage-nav">
        <Logo />
        <Link to="/app" className="btn btn-primary btn-sm">Open LexiScan →</Link>
      </nav>

      <main className="infopage-content">
        <p className="eyebrow">ABOUT LEXISCAN</p>
        <h1>A lexical analyzer, made legible.</h1>

        <p className="infopage-article">
          LexiScan is a course project focused on building a lexical analyzer:
          a practical view into how a language tool reads source, identifies token
          boundaries, and prepares programs for parsing.
        </p>

        <p className="eyebrow" style={{ marginTop: 56 }}>MEET THE TEAM</p>
        <h2>The team behind LexiScan.</h2>

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
      </main>

      <footer className="infopage-footer">LexiScan v0.8.4 · Local workspace</footer>
    </div>
  )
}
