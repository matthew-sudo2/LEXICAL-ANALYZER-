import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <Link to="/">LexiScan</Link>
        <div className="footer-links">
          <a href="https://github.com/matthew-sudo2/LEXICAL-ANALYZER-" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="/docs/token-reference">Docs</a>
          <a href="/about">About</a>
        </div>
      </div>
      <code className="footer-version">LexiScan v0.8.4 · Local workspace</code>
    </footer>
  )
}