/**
 * MinimizedDFADiagram Component
 * 
 * Displays the minimized DFA diagram for identifier recognition
 * Reduced from 5 states to 3 states using partition refinement
 */
export default function MinimizedDFADiagram() {
  return (
    <svg className="av-diagram-svg" viewBox="0 0 800 350" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="mindfa-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#14586b" />
        </marker>
        <marker id="mindfa-arrow-err" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#c59b75" />
        </marker>
      </defs>

      {/* Start arrow */}
      <path d="M 15 175 L 48 175" stroke="#6b7b82" strokeWidth="2" markerEnd="url(#mindfa-arrow)" />

      {/* q0: Start state */}
      <circle cx="72" cy="175" r="24" fill="white" stroke="#14586b" strokeWidth="2.5" />
      <text x="72" y="180" textAnchor="middle" fill="#1a2226" fontSize="13" fontWeight="600">q₀</text>

      {/* q0 → qACC (letter) */}
      <path d="M 96 155 Q 150 80, 200 80" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#mindfa-arrow)" />
      <text x="130" y="110" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">letter</text>
      
      {/* q0 → qACC (underscore) */}
      <path d="M 96 165 Q 150 140, 200 140" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#mindfa-arrow)" />
      <text x="130" y="150" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">_</text>
      
      {/* q0 → qREJ (digit - error) */}
      <path d="M 96 185 Q 150 240, 200 240" stroke="#c59b75" strokeWidth="1.8" fill="none" markerEnd="url(#mindfa-arrow-err)" />
      <text x="130" y="230" fill="#8b5a3c" fontSize="9" fontFamily="DM Mono">digit</text>

      {/* qACC (merged accepting state) */}
      <circle cx="224" cy="110" r="28" fill="#e8f5f0" stroke="#14586b" strokeWidth="2.5" />
      <circle cx="224" cy="110" r="22" fill="none" stroke="#14586b" strokeWidth="1.5" />
      <text x="224" y="115" textAnchor="middle" fill="#14586b" fontSize="13" fontWeight="600">qACC</text>
      
      {/* qACC self-loop (all symbols) */}
      <path d="M 250 95 Q 280 70, 280 110 Q 280 150, 250 125" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#mindfa-arrow)" />
      <text x="288" y="108" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">letter</text>
      <text x="288" y="118" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">digit,_</text>

      {/* qREJ (error/trap state) */}
      <circle cx="224" cy="240" r="28" fill="#fff5f5" stroke="#c59b75" strokeWidth="2.5" />
      <text x="224" y="245" textAnchor="middle" fill="#8b5a3c" fontSize="13" fontWeight="600">qREJ</text>
      
      {/* qREJ self-loop (trap) */}
      <path d="M 250 225 Q 280 200, 280 240 Q 280 280, 250 255" stroke="#c59b75" strokeWidth="2" fill="none" markerEnd="url(#mindfa-arrow-err)" />
      <text x="288" y="238" fill="#8b5a3c" fontSize="8" fontFamily="DM Mono">letter</text>
      <text x="288" y="248" fill="#8b5a3c" fontSize="8" fontFamily="DM Mono">digit,_</text>

      {/* Merging indicator */}
      <path d="M 320 80 L 350 80 L 350 140 L 320 140" stroke="#8b84a9" strokeWidth="1.5" fill="none" strokeDasharray="4 2" />
      <text x="335" y="115" textAnchor="middle" fill="#8b84a9" fontSize="9" fontFamily="DM Mono">merged</text>
      
      <circle cx="370" cy="110" r="15" fill="#f0f9fc" stroke="#14586b" strokeWidth="1.5" />
      <text x="370" y="114" textAnchor="middle" fill="#14586b" fontSize="9" fontWeight="600">q₁</text>
      
      <circle cx="395" cy="110" r="15" fill="#f0f9fc" stroke="#14586b" strokeWidth="1.5" />
      <text x="395" y="114" textAnchor="middle" fill="#14586b" fontSize="9" fontWeight="600">q₂</text>
      
      <circle cx="420" cy="110" r="15" fill="#f0f9fc" stroke="#14586b" strokeWidth="1.5" />
      <text x="420" y="114" textAnchor="middle" fill="#14586b" fontSize="9" fontWeight="600">q₃</text>

      {/* Legend */}
      <rect x="500" y="30" width="280" height="200" rx="8" fill="#f8f9fa" stroke="#e0e0e0" strokeWidth="1" />
      <text x="505" y="50" fill="#1a2226" fontSize="11" fontWeight="600">Minimized DFA Legend</text>
      
      {/* Merged accepting state legend */}
      <circle cx="520" cy="75" r="12" fill="#e8f5f0" stroke="#14586b" strokeWidth="1.5" />
      <circle cx="520" cy="75" r="9" fill="none" stroke="#14586b" strokeWidth="1" />
      <text x="540" y="79" fill="#6b7b82" fontSize="10">Merged accepting state (q₁,q₂,q₃)</text>
      
      {/* Start state legend */}
      <circle cx="520" cy="105" r="12" fill="white" stroke="#14586b" strokeWidth="1.5" />
      <text x="540" y="109" fill="#6b7b82" fontSize="10">Start state (unchanged)</text>
      
      {/* Error state legend */}
      <circle cx="520" cy="135" r="12" fill="#fff5f5" stroke="#c59b75" strokeWidth="1.5" />
      <text x="540" y="139" fill="#6b7b82" fontSize="10">Error/trap state (renamed q₄)</text>
      
      {/* Merge indicator legend */}
      <path d="M 510 160 L 530 160" stroke="#8b84a9" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="540" y="164" fill="#6b7b82" fontSize="10">States merged during minimization</text>
      
      {/* Statistics */}
      <rect x="500" y="250" width="280" height="80" rx="8" fill="#e8f5f0" stroke="#14586b" strokeWidth="1" />
      <text x="505" y="270" fill="#14586b" fontSize="11" fontWeight="600">Minimization Results</text>
      
      <text x="505" y="290" fill="#1a2226" fontSize="10">Original: 5 states → Minimized: 3 states</text>
      <text x="505" y="305" fill="#14586b" fontSize="10" fontWeight="600">40% reduction in states</text>
      <text x="505" y="320" fill="#1a2226" fontSize="10">Transitions: 15 → 9 (40% reduction)</text>
    </svg>
  )
}
