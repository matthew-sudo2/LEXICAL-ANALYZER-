/**
 * DFADiagram Component
 * 
 * Displays the multi-token DFA diagram for structured tokens
 * Shows all states: INITIAL, Q1, Q3, Q4, Q5, Q6, REJECT
 * with token output labels
 */
export default function DFADiagram() {
  return (
    <svg className="av-diagram-svg" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="dfa-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#14586b" />
        </marker>
        <marker id="dfa-arrow-err" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#c59b75" />
        </marker>
      </defs>

      {/* Title */}
      <text x="600" y="35" textAnchor="middle" fill="#1a2226" fontSize="18" fontWeight="600">Multi-Token DFA (Structured Tokens)</text>

      {/* Start arrow */}
      <path d="M 15 300 L 55 300" stroke="#6b7b82" strokeWidth="2.5" markerEnd="url(#dfa-arrow)" />

      {/* INITIAL state */}
      <circle cx="90" cy="300" r="30" fill="white" stroke="#14586b" strokeWidth="3" />
      <text x="90" y="306" textAnchor="middle" fill="#1a2226" fontSize="14" fontWeight="600">INITIAL</text>

      {/* INITIAL → Q1 (letter/underscore) */}
      <path d="M 120 280 Q 180 120, 240 120" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <text x="160" y="110" fill="#6b7b82" fontSize="10" fontFamily="DM Mono">letter,_</text>
      
      {/* INITIAL → Q4 (digit) */}
      <path d="M 120 300 L 240 300" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <text x="165" y="288" fill="#6b7b82" fontSize="10" fontFamily="DM Mono">digit</text>
      
      {/* INITIAL → Q3 (quote) */}
      <path d="M 120 320 Q 180 480, 240 480" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <text x="160" y="470" fill="#6b7b82" fontSize="10" fontFamily="DM Mono">quote</text>

      {/* INITIAL → REJECT (dot from INITIAL) */}
      <path d="M 120 300 Q 140 220, 160 190" stroke="#c59b75" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow-err)" />
      <text x="125" y="250" fill="#8b5a3c" fontSize="8" fontFamily="DM Mono">dot</text>

      {/* Q1 (identifier - accepting) */}
      <circle cx="280" cy="120" r="28" fill="white" stroke="#14586b" strokeWidth="2.5" />
      <circle cx="280" cy="120" r="21" fill="none" stroke="#14586b" strokeWidth="1.5" />
      <text x="280" y="126" textAnchor="middle" fill="#1a2226" fontSize="14" fontWeight="600">Q1</text>
      <text x="280" y="155" textAnchor="middle" fill="#14586b" fontSize="10" fontWeight="600">IDENTIFIER</text>
      
      {/* Q1 self-loop */}
      <path d="M 308 120 L 360 120" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <path d="M 360 120 Q 385 95, 385 120 Q 385 145, 308 120" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <text x="373" y="85" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">letter,digit,_</text>

      {/* Q3 (string - accepting) */}
      <circle cx="280" cy="480" r="28" fill="white" stroke="#8a84a9" strokeWidth="2.5" />
      <circle cx="280" cy="480" r="21" fill="none" stroke="#8a84a9" strokeWidth="1.5" />
      <text x="280" y="486" textAnchor="middle" fill="#1a2226" fontSize="14" fontWeight="600">Q3</text>
      <text x="280" y="515" textAnchor="middle" fill="#8a84a9" fontSize="10" fontWeight="600">STRING</text>
      
      {/* Q3 self-loop */}
      <path d="M 308 480 L 360 480" stroke="#8a84a9" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <path d="M 360 480 Q 385 455, 385 480 Q 385 505, 308 480" stroke="#8a84a9" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <text x="373" y="445" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">char</text>

      {/* Q4 (integer - accepting) */}
      <circle cx="350" cy="300" r="28" fill="white" stroke="#14586b" strokeWidth="2.5" />
      <circle cx="350" cy="300" r="21" fill="none" stroke="#14586b" strokeWidth="1.5" />
      <text x="350" y="306" textAnchor="middle" fill="#1a2226" fontSize="14" fontWeight="600">Q4</text>
      <text x="350" y="335" textAnchor="middle" fill="#14586b" fontSize="10" fontWeight="600">INTEGER</text>
      
      {/* Q4 self-loop */}
      <path d="M 378 300 L 420 300" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <path d="M 420 300 Q 445 275, 445 300 Q 445 325, 378 300" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <text x="433" y="265" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">digit</text>

      {/* Q4 → Q5 (dot) */}
      <path d="M 350 328 L 350 400" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <text x="356" y="370" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">dot</text>

      {/* Q5 (after dot - non-accepting) */}
      <circle cx="350" cy="430" r="28" fill="white" stroke="#14586b" strokeWidth="2.5" />
      <text x="350" y="436" textAnchor="middle" fill="#1a2226" fontSize="14" fontWeight="600">Q5</text>
      
      {/* Q5 → Q6 (digit) */}
      <path d="M 378 430 L 430 430" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <text x="395" y="420" fill="#6b7b82" fontSize="8" fontFamily="DMono">digit</text>

      {/* Q6 (float - accepting) */}
      <circle cx="480" cy="430" r="28" fill="white" stroke="#14586b" strokeWidth="2.5" />
      <circle cx="480" cy="430" r="21" fill="none" stroke="#14586b" strokeWidth="1.5" />
      <text x="480" y="436" textAnchor="middle" fill="#1a2226" fontSize="14" fontWeight="600">Q6</text>
      <text x="480" y="465" textAnchor="middle" fill="#14586b" fontSize="10" fontWeight="600">FLOAT</text>
      
      {/* Q6 self-loop */}
      <path d="M 508 430 L 550 430" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <path d="M 550 430 Q 575 405, 575 430 Q 575 455, 508 430" stroke="#14586b" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow)" />
      <text x="563" y="395" fill="#6b7b82" fontSize="8" fontFamily="DMono">digit</text>

      {/* REJECT state */}
      <circle cx="200" cy="170" r="28" fill="#fff5f5" stroke="#c59b75" strokeWidth="2.5" />
      <text x="200" y="176" textAnchor="middle" fill="#8b5a3c" fontSize="14" fontWeight="600">REJECT</text>
      
      {/* REJECT self-loop */}
      <path d="M 228 170 L 275 170" stroke="#c59b75" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow-err)" />
      <path d="M 275 170 Q 300 145, 300 170 Q 300 195, 228 170" stroke="#c59b75" strokeWidth="2" fill="none" markerEnd="url(#dfa-arrow-err)" />
      <text x="288" y="135" fill="#8b5a3c" fontSize="8" fontFamily="DM Mono">all</text>

      {/* Transitions to REJECT from other states */}
      <path d="M 280 95 Q 280 70, 230 70 Q 210 70, 205 142" stroke="#c59b75" strokeWidth="1.5" fill="none" markerEnd="url(#dfa-arrow-err)" />
      <text x="235" y="65" fill="#8b5a3c" fontSize="7" fontFamily="DM Mono">dot,quote</text>

      <path d="M 280 455 Q 280 400, 230 280 Q 215 255, 208 195" stroke="#c59b75" strokeWidth="1.5" fill="none" markerEnd="url(#dfa-arrow-err)" />
      <text x="245" y="300" fill="#8b5a3c" fontSize="7" fontFamily="DM Mono">dot</text>

      <path d="M 350 275 Q 350 230, 235 195" stroke="#c59b75" strokeWidth="1.5" fill="none" markerEnd="url(#dfa-arrow-err)" />
      <text x="290" y="220" fill="#8b5a3c" fontSize="7" fontFamily="DM Mono">letter,_</text>

      <path d="M 350 455 Q 350 520, 280 520 Q 220 520, 215 198" stroke="#c59b75" strokeWidth="1.5" fill="none" markerEnd="url(#dfa-arrow-err)" />
      <text x="280" y="535" fill="#8b5a3c" fontSize="7" fontFamily="DM Mono">dot,quote</text>

      <path d="M 350 405 Q 350 350, 240 215" stroke="#c59b75" strokeWidth="1.5" fill="none" markerEnd="url(#dfa-arrow-err)" />
      <text x="285" y="330" fill="#8b5a3c" fontSize="7" fontFamily="DM Mono">dot,quote,_</text>

      <path d="M 480 405 Q 480 350, 250 205" stroke="#c59b75" strokeWidth="1.5" fill="none" markerEnd="url(#dfa-arrow-err)" />
      <text x="365" y="320" fill="#8b5a3c" fontSize="7" fontFamily="DM Mono">dot,quote,_</text>

      {/* Legend */}
      <rect x="620" y="50" width="550" height="400" rx="10" fill="#f8f9fa" stroke="#e0e0e0" strokeWidth="1.5" />
      <text x="630" y="75" fill="#1a2226" fontSize="13" fontWeight="600">Multi-Token DFA Legend</text>
      
      {/* Color-coded token types */}
      <rect x="630" y="95" width="18" height="18" fill="#14586b" rx="4" />
      <text x="660" y="110" fill="#14586b" fontSize="11" fontWeight="600">IDENTIFIER (Q1) → TOKEN_IDENTIFIER</text>
      
      <rect x="630" y="125" width="18" height="18" fill="#8a84a9" rx="4" />
      <text x="660" y="140" fill="#8a84a9" fontSize="11" fontWeight="600">STRING (Q3) → TOKEN_STRING</text>
      
      <rect x="630" y="155" width="18" height="18" fill="#14586b" rx="4" />
      <text x="660" y="170" fill="#14586b" fontSize="11" fontWeight="600">INTEGER (Q4) → TOKEN_INT</text>
      
      <rect x="630" y="185" width="18" height="18" fill="#14586b" rx="4" />
      <text x="660" y="200" fill="#14586b" fontSize="11" fontWeight="600">FLOAT (Q6) → TOKEN_FLOAT</text>
      
      <rect x="630" y="215" width="18" height="18" fill="#c59b75" rx="4" />
      <text x="660" y="230" fill="#c59b75" fontSize="11" fontWeight="600">Q5 (intermediate) → REJECT</text>
      
      {/* State symbols */}
      <circle cx="639" cy="260" r="12" fill="white" stroke="#14586b" strokeWidth="2" />
      <circle cx="639" cy="260" r="8" fill="none" stroke="#14586b" strokeWidth="1.2" />
      <text x="660" y="265" fill="#6b7b82" fontSize="11">Accepting state (double circle)</text>
      
      <circle cx="639" cy="290" r="12" fill="white" stroke="#14586b" strokeWidth="2" />
      <text x="660" y="295" fill="#6b7b82" fontSize="11">Non-accepting state</text>
      
      <circle cx="639" cy="320" r="12" fill="#fff5f5" stroke="#c59b75" strokeWidth="2" />
      <text x="660" y="325" fill="#8b5a3c" fontSize="11">Error/trap state</text>
      
      {/* Transition symbols */}
      <line x1="620" y1="350" x2="645" y2="350" stroke="#14586b" strokeWidth="2" markerEnd="url(#dfa-arrow)" />
      <text x="660" y="355" fill="#6b7b82" fontSize="11">Valid transition</text>
      
      <line x1="620" y1="380" x2="645" y2="380" stroke="#c59b75" strokeWidth="2" markerEnd="url(#dfa-arrow-err)" />
      <text x="660" y="385" fill="#8b5a3c" fontSize="11">Error transition (to REJECT)</text>

      {/* State descriptions */}
      <rect x="620" y="410" width="550" height="90" rx="10" fill="#f0f9fc" stroke="#14586b" strokeWidth="1.5" />
      <text x="630" y="435" fill="#14586b" fontSize="13" fontWeight="600">State Descriptions</text>
      
      <text x="630" y="460" fill="#1a2226" fontSize="10">INITIAL: Start state, branches to token paths</text>
      <text x="630" y="480" fill="#1a2226" fontSize="10">Q1/Q3/Q4/Q6: Accepting states with token outputs</text>
      <text x="630" y="500" fill="#1a2226" fontSize="10">Q5: Intermediate state (after decimal, must have digit)</text>
      <text x="630" y="520" fill="#8b5a3c" fontSize="10">REJECT: Error/trap state for invalid transitions</text>
    </svg>
  )
}
