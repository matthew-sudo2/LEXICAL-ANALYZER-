/**
 * SystemDesignDiagram Component
 * 
 * Displays the system architecture diagram showing frontend/backend interaction
 */
export default function SystemDesignDiagram() {
  return (
    <svg className="system-diagram-svg" viewBox="0 0 900 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="sys-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#14586b" />
        </marker>
        <marker id="sys-arrow-bi" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8a84a9" />
        </marker>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="900" height="500" fill="#f8f9fa" />

      {/* Title */}
      <text x="450" y="30" textAnchor="middle" fill="#1a2226" fontSize="18" fontWeight="600">
        LexiScan System Architecture
      </text>

      {/* Frontend Box */}
      <rect x="50" y="60" width="380" height="380" rx="12" fill="#f0f9fc" stroke="#14586b" strokeWidth="2" />
      <text x="60" y="85" fill="#14586b" fontSize="14" fontWeight="600">Frontend (React + Vite)</text>
      
      {/* Frontend Components */}
      <rect x="70" y="100" width="150" height="60" rx="6" fill="white" stroke="#14586b" strokeWidth="1.5" />
      <text x="145" y="125" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="600">Analyzer.tsx</text>
      <text x="145" y="140" textAnchor="middle" fill="#6b7b82" fontSize="9">Main UI Component</text>
      
      <rect x="70" y="170" width="150" height="60" rx="6" fill="white" stroke="#14586b" strokeWidth="1.5" />
      <text x="145" y="195" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="600">AutomataView.tsx</text>
      <text x="145" y="210" textAnchor="middle" fill="#6b7b82" fontSize="9">NFA/DFA Diagrams</text>
      
      <rect x="70" y="240" width="150" height="60" rx="6" fill="white" stroke="#14586b" strokeWidth="1.5" />
      <text x="145" y="265" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="600">automata/</text>
      <text x="145" y="280" textAnchor="middle" fill="#6b7b82" fontSize="9">Data Structures</text>
      
      <rect x="70" y="310" width="150" height="60" rx="6" fill="white" stroke="#14586b" strokeWidth="1.5" />
      <text x="145" y="335" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="600">diagrams/</text>
      <text x="145" y="350" textAnchor="middle" fill="#6b7b82" fontSize="9">SVG Components</text>
      
      <rect x="70" y="380" width="150" height="40" rx="6" fill="#e8f5f0" stroke="#14586b" strokeWidth="1.5" />
      <text x="145" y="405" textAnchor="middle" fill="#14586b" fontSize="10" fontWeight="600">React Router</text>

      {/* Backend Box */}
      <rect x="470" y="60" width="380" height="380" rx="12" fill="#f5f0fa" stroke="#8a84a9" strokeWidth="2" />
      <text x="480" y="85" fill="#8a84a9" fontSize="14" fontWeight="600">Backend (FastAPI + Python)</text>
      
      {/* Backend Components */}
      <rect x="490" y="100" width="150" height="60" rx="6" fill="white" stroke="#8a84a9" strokeWidth="1.5" />
      <text x="565" y="125" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="600">main.py</text>
      <text x="565" y="140" textAnchor="middle" fill="#6b7b82" fontSize="9">FastAPI App</text>
      
      <rect x="490" y="170" width="150" height="60" rx="6" fill="white" stroke="#8a84a9" strokeWidth="1.5" />
      <text x="565" y="195" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="600">automaton.py</text>
      <text x="565" y="210" textAnchor="middle" fill="#6b7b82" fontSize="9">DFA Engine</text>
      
      <rect x="490" y="240" width="150" height="60" rx="6" fill="white" stroke="#8a84a9" strokeWidth="1.5" />
      <text x="565" y="265" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="600">analyzer.py</text>
      <text x="565" y="280" textAnchor="middle" fill="#6b7b82" fontSize="9">Lexical Analyzer</text>
      
      <rect x="490" y="310" width="150" height="60" rx="6" fill="white" stroke="#8a84a9" strokeWidth="1.5" />
      <text x="565" y="335" textAnchor="middle" fill="#1a2226" fontSize="11" fontWeight="600">tokens.py</text>
      <text x="565" y="350" textAnchor="middle" fill="#6b7b82" fontSize="9">Token Definitions</text>
      
      <rect x="490" y="380" width="150" height="40" rx="6" fill="#f0eef5" stroke="#8a84a9" strokeWidth="1.5" />
      <text x="565" y="405" textAnchor="middle" fill="#8a84a9" fontSize="10" fontWeight="600">Uvicorn Server</text>

      {/* API Connection */}
      <path d="M 430 220 L 470 220" stroke="#14586b" strokeWidth="2" markerEnd="url(#sys-arrow)" />
      <path d="M 470 240 L 430 240" stroke="#8a84a9" strokeWidth="2" markerEnd="url(#sys-arrow-bi)" />
      
      <text x="450" y="215" textAnchor="middle" fill="#14586b" fontSize="9" fontWeight="600">POST /api/analyze</text>
      <text x="450" y="255" textAnchor="middle" fill="#8a84a9" fontSize="9" fontWeight="600">JSON Response</text>

      {/* External Components */}
      <rect x="50" y="460" width="120" height="30" rx="6" fill="#fef6ee" stroke="#c59b75" strokeWidth="1.5" />
      <text x="110" y="480" textAnchor="middle" fill="#c59b75" fontSize="10" fontWeight="600">Browser</text>
      
      <rect x="730" y="460" width="120" height="30" rx="6" fill="#f0f7f3" stroke="#8aad9c" strokeWidth="1.5" />
      <text x="790" y="480" textAnchor="middle" fill="#8aad9c" fontSize="10" fontWeight="600">No Database</text>

      {/* Browser to Frontend */}
      <path d="M 110 460 L 110 440" stroke="#c59b75" strokeWidth="1.5" markerEnd="url(#sys-arrow)" />
      
      {/* Backend to No Database */}
      <path d="M 790 460 L 790 440" stroke="#8aad9c" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="790" y="450" textAnchor="middle" fill="#8aad9c" fontSize="8">Stateless</text>

      {/* Legend */}
      <rect x="250" y="460" width="400" height="30" rx="6" fill="white" stroke="#e0e0e0" strokeWidth="1" />
      <text x="260" y="480" fill="#6b7b82" fontSize="9">
        <tspan fill="#14586b">● Frontend</tspan>
        <tspan dx="20" fill="#8a84a9">● Backend</tspan>
        <tspan dx="20" fill="#c59b75">● Client</tspan>
        <tspan dx="20" fill="#8aad9c">● Stateless</tspan>
      </text>

      {/* Data Flow Labels */}
      <text x="290" y="320" fill="#6b7b82" fontSize="8">Source Code</text>
      <text x="290" y="332" fill="#6b7b82" fontSize="8">Input</text>
      
      <text x="610" y="320" fill="#6b7b82" fontSize="8">DFA Scanning</text>
      <text x="610" y="332" fill="#6b7b82" fontSize="8">Tokenization</text>
    </svg>
  )
}
