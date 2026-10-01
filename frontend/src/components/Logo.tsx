import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" className="o-logo">
      <b>L</b>
      <span>LexiScan</span>
    </Link>
  )
}