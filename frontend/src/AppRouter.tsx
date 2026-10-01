import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './components/Landing'
import Analyzer from './components/Analyzer'
import TokenReference from './components/TokenReference'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import AutomataView from './components/AutomataView'
import TestSuite from './components/TestSuite'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<Analyzer />} />
      <Route path="/automata" element={<AutomataView />} />
      <Route path="/tests" element={<TestSuite />} />
      <Route path="/docs/token-reference" element={<TokenReference />} />
      <Route path="/docs/how-it-works" element={<HowItWorks />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}