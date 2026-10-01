import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './components/Landing'
import Analyzer from './components/Analyzer'
import TokenReference from './components/TokenReference'
import HowItWorks from './components/HowItWorks'
import About from './components/About'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<Analyzer />} />
      <Route path="/docs/token-reference" element={<TokenReference />} />
      <Route path="/docs/how-it-works" element={<HowItWorks />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}