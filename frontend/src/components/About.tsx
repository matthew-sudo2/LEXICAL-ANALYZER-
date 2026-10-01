import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function About() {
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
    <div className="info-page">
      <header className="info-header">
        <Logo />
        <Link to="/app" className="o-button">Open LexiScan</Link>
      </header>

      <main className="info-content">
        <p>ABOUT LEXISCAN</p>
        <h1>A lexical analyzer, made legible.</h1>
        <article>
          LexiScan is a course project focused on building a lexical analyzer: a practical view into how a language tool reads source, identifies token boundaries, and prepares programs for parsing.
        </article>

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
      </main>

      <footer className="info-footer">LexiScan v0.8.4 · Local workspace</footer>
    </div>
  )
}