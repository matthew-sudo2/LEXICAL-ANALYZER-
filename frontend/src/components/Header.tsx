import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

export default function Header() {
  const location = useLocation()

  return (
    <header className="app-header">
      <Logo />
      <nav className="app-nav">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/app" className={location.pathname === '/app' ? 'active' : ''}>Open LexiScan</Link>
        <Link to="/automata" className={location.pathname.startsWith('/automata') ? 'active' : ''}>Automata</Link>
        <Link to="/docs/token-reference" className={location.pathname.startsWith('/docs/token-reference') ? 'active' : ''}>Token Reference</Link>
        <Link to="/docs/how-it-works" className={location.pathname.startsWith('/docs/how-it-works') ? 'active' : ''}>How It Works</Link>
        <Link to="/docs/system-design" className={location.pathname.startsWith('/docs/system-design') ? 'active' : ''}>System Design</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
      </nav>
    </header>
  )
}