/**
 * NFADiagram Component
 * 
 * Displays the NFA diagram for multi-pattern lexical analyzer
 * Extracted from AutomataView for reusability
 */
export default function NFADiagram() {
  return (
    <svg className="av-diagram-svg" viewBox="0 0 960 520" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="nfa-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#14586b" />
        </marker>
        <marker id="nfa-arrow-eps" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8b84a9" />
        </marker>
        <marker id="nfa-arrow-err" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#c59b75" />
        </marker>
      </defs>

      {/* Start arrow */}
      <path d="M 15 260 L 48 260" stroke="#6b7b82" strokeWidth="2" markerEnd="url(#nfa-arrow)" />

      {/* q0: Start state */}
      <circle cx="72" cy="260" r="24" fill="white" stroke="#14586b" strokeWidth="2.5" />
      <text x="72" y="265" textAnchor="middle" fill="#1a2226" fontSize="13" fontWeight="600">q₀</text>

      {/* ε-transitions from q0 */}
      {/* q0 → q1 (Identifier branch) */}
      <path d="M 90 242 Q 140 80, 200 80" stroke="#8b84a9" strokeWidth="1.8" strokeDasharray="5 3" fill="none" markerEnd="url(#nfa-arrow-eps)" />
      <text x="128" y="140" fill="#8b84a9" fontSize="10" fontFamily="DM Mono">ε</text>
      
      {/* q0 → q5 (Number branch) */}
      <path d="M 90 246 Q 140 170, 200 170" stroke="#8b84a9" strokeWidth="1.8" strokeDasharray="5 3" fill="none" markerEnd="url(#nfa-arrow-eps)" />
      <text x="136" y="198" fill="#8b84a9" fontSize="10" fontFamily="DM Mono">ε</text>
      
      {/* q0 → q8 (String branch) */}
      <path d="M 96 260 L 192 260" stroke="#8b84a9" strokeWidth="1.8" strokeDasharray="5 3" fill="none" markerEnd="url(#nfa-arrow-eps)" />
      <text x="138" y="254" fill="#8b84a9" fontSize="10" fontFamily="DM Mono">ε</text>
      
      {/* q0 → q11 (Operator branch) */}
      <path d="M 90 274 Q 140 350, 200 350" stroke="#8b84a9" strokeWidth="1.8" strokeDasharray="5 3" fill="none" markerEnd="url(#nfa-arrow-eps)" />
      <text x="128" y="324" fill="#8b84a9" fontSize="10" fontFamily="DM Mono">ε</text>
      
      {/* q0 → q13 (Delimiter branch) */}
      <path d="M 90 278 Q 140 430, 200 430" stroke="#8b84a9" strokeWidth="1.8" strokeDasharray="5 3" fill="none" markerEnd="url(#nfa-arrow-eps)" />
      <text x="120" y="400" fill="#8b84a9" fontSize="10" fontFamily="DM Mono">ε</text>

      {/* IDENTIFIER BRANCH (q1 → q2 → q3 → q4) */}
      {/* q1 */}
      <circle cx="218" cy="80" r="22" fill="#f0f9fc" stroke="#14586b" strokeWidth="2" />
      <text x="218" y="85" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁</text>
      
      {/* q1 → q2 (letter) */}
      <path d="M 240 80 L 330 55" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="278" y="58" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">letter</text>
      
      {/* q1 → q3 (underscore) */}
      <path d="M 240 80 L 330 105" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="285" y="104" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">_</text>
      
      {/* q2 (after letter) */}
      <circle cx="354" cy="50" r="22" fill="white" stroke="#14586b" strokeWidth="2" />
      <circle cx="354" cy="50" r="17" fill="none" stroke="#14586b" strokeWidth="1.2" />
      <text x="354" y="55" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₂</text>
      
      {/* q3 (after underscore) */}
      <circle cx="354" cy="110" r="22" fill="white" stroke="#14586b" strokeWidth="2" />
      <circle cx="354" cy="110" r="17" fill="none" stroke="#14586b" strokeWidth="1.2" />
      <text x="354" y="115" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₃</text>
      
      {/* q2 → q4 */}
      <path d="M 376 50 Q 430 50, 490 80" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="432" y="52" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">letter,digit,_</text>
      
      {/* q3 → q4 */}
      <path d="M 376 110 Q 430 110, 490 88" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="432" y="116" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">letter,digit,_</text>
      
      {/* q4 (continuation — accepting, self-loop) */}
      <circle cx="514" cy="80" r="22" fill="white" stroke="#14586b" strokeWidth="2" />
      <circle cx="514" cy="80" r="17" fill="none" stroke="#14586b" strokeWidth="1.2" />
      <text x="514" y="85" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₄</text>
      
      {/* q4 self-loop */}
      <path d="M 534 68 Q 556 50, 556 80 Q 556 110, 534 92" stroke="#14586b" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="562" y="76" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">letter</text>
      <text x="562" y="86" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">digit,_</text>

      {/* Branch label: IDENTIFIER */}
      <rect x="600" y="60" width="90" height="20" rx="4" fill="#e8f5f0" stroke="rgba(20,88,107,0.2)" strokeWidth="1" />
      <text x="645" y="74" textAnchor="middle" fill="#14586b" fontSize="9" fontWeight="600" fontFamily="DM Mono">IDENTIFIER</text>

      {/* NUMBER BRANCH (q5 → q6 → q7) */}
      {/* q5 */}
      <circle cx="218" cy="170" r="22" fill="#f5f0fa" stroke="#8a84a9" strokeWidth="2" />
      <text x="218" y="175" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₅</text>
      
      {/* q5 → q6 (digit) */}
      <path d="M 240 170 L 330 170" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="280" y="164" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">digit</text>
      
      {/* q6 (integer — accepting) */}
      <circle cx="354" cy="170" r="22" fill="white" stroke="#8a84a9" strokeWidth="2" />
      <circle cx="354" cy="170" r="17" fill="none" stroke="#8a84a9" strokeWidth="1.2" />
      <text x="354" y="175" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₆</text>
      
      {/* q6 self-loop (digit) */}
      <path d="M 374 158 Q 396 140, 396 170 Q 396 200, 374 182" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="401" y="174" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">digit</text>
      
      {/* q6 → q7 (dot) */}
      <path d="M 376 170 L 468 170" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="420" y="164" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">.</text>
      
      {/* q7 (reading decimal digits) */}
      <circle cx="492" cy="170" r="22" fill="#faf5ff" stroke="#8a84a9" strokeWidth="2" />
      <text x="492" y="175" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₇</text>
      
      {/* q7 → q8_num (digit — accepting float) */}
      <path d="M 514 170 L 575 170" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="542" y="164" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">digit</text>
      
      {/* q8_num (float accepted) */}
      <circle cx="598" cy="170" r="22" fill="white" stroke="#8a84a9" strokeWidth="2" />
      <circle cx="598" cy="170" r="17" fill="none" stroke="#8a84a9" strokeWidth="1.2" />
      <text x="598" y="175" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₈</text>
      
      {/* q8_num self-loop */}
      <path d="M 618 158 Q 640 140, 640 170 Q 640 200, 618 182" stroke="#8a84a9" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="645" y="174" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">digit</text>

      {/* Branch label: NUMBER */}
      <rect x="670" y="160" width="72" height="20" rx="4" fill="#f0eef5" stroke="rgba(138,132,169,0.2)" strokeWidth="1" />
      <text x="706" y="174" textAnchor="middle" fill="#8a84a9" fontSize="9" fontWeight="600" fontFamily="DM Mono">NUMBER</text>

      {/* STRING BRANCH (q9 → q10 → q11) */}
      {/* q9 */}
      <circle cx="218" cy="260" r="22" fill="#fdf2f3" stroke="#b48789" strokeWidth="2" />
      <text x="218" y="265" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₉</text>
      
      {/* q9 → q10 (quote) */}
      <path d="M 240 260 L 330 260" stroke="#b48789" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="278" y="254" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">quote</text>
      
      {/* q10 (reading string content) */}
      <circle cx="354" cy="260" r="22" fill="#fef8f8" stroke="#b48789" strokeWidth="2" />
      <text x="354" y="265" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₀</text>
      
      {/* q10 self-loop (any except quote) */}
      <path d="M 374 248 Q 396 228, 396 260 Q 396 292, 374 272" stroke="#b48789" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="401" y="256" fill="#6b7b82" fontSize="8" fontFamily="DM Mono">¬quote</text>
      
      {/* q10 → q11 (closing quote) */}
      <path d="M 376 260 L 468 260" stroke="#b48789" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="412" y="254" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">quote</text>
      
      {/* q11 (string accepted) */}
      <circle cx="492" cy="260" r="22" fill="white" stroke="#b48789" strokeWidth="2" />
      <circle cx="492" cy="260" r="17" fill="none" stroke="#b48789" strokeWidth="1.2" />
      <text x="492" y="265" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₁</text>

      {/* Branch label: STRING */}
      <rect x="534" y="250" width="68" height="20" rx="4" fill="#fdf0f0" stroke="rgba(180,135,137,0.2)" strokeWidth="1" />
      <text x="568" y="264" textAnchor="middle" fill="#b48789" fontSize="9" fontWeight="600" fontFamily="DM Mono">STRING</text>

      {/* OPERATOR BRANCH (q12 → q13) */}
      {/* q12 */}
      <circle cx="218" cy="350" r="22" fill="#fef6ee" stroke="#c59b75" strokeWidth="2" />
      <text x="218" y="355" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₂</text>
      
      {/* q12 → q13 (single op) */}
      <path d="M 240 342 L 330 325" stroke="#c59b75" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="274" y="324" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">+,-,*,/,%</text>
      
      {/* q13 (single op accepted) */}
      <circle cx="354" cy="320" r="22" fill="white" stroke="#c59b75" strokeWidth="2" />
      <circle cx="354" cy="320" r="17" fill="none" stroke="#c59b75" strokeWidth="1.2" />
      <text x="354" y="325" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₃</text>
      
      {/* q12 → q14 (=, !, <, >) for compound ops */}
      <path d="M 240 358 L 330 378" stroke="#c59b75" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="272" y="380" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">=,!,&lt;,&gt;</text>
      
      {/* q14 (compound op - first char) */}
      <circle cx="354" cy="385" r="22" fill="#fef6ee" stroke="#c59b75" strokeWidth="2" />
      <circle cx="354" cy="385" r="17" fill="none" stroke="#c59b75" strokeWidth="1.2" />
      <text x="354" y="390" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₄</text>
      
      {/* q14 → q15 (=) for ==, !=, <=, >= */}
      <path d="M 376 385 L 468 385" stroke="#c59b75" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="418" y="378" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">=</text>
      
      {/* q15 (compound op accepted) */}
      <circle cx="492" cy="385" r="22" fill="white" stroke="#c59b75" strokeWidth="2" />
      <circle cx="492" cy="385" r="17" fill="none" stroke="#c59b75" strokeWidth="1.2" />
      <text x="492" y="390" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₅</text>
      
      {/* Branch label: OPERATOR */}
      <rect x="534" y="375" width="82" height="20" rx="4" fill="#fef2ea" stroke="rgba(197,155,117,0.2)" strokeWidth="1" />
      <text x="575" y="389" textAnchor="middle" fill="#c59b75" fontSize="9" fontWeight="600" fontFamily="DM Mono">OPERATOR</text>

      {/* DELIMITER / PUNCTUATION BRANCH (q16 → q17) */}
      {/* q16 */}
      <circle cx="218" cy="430" r="22" fill="#f0f7f3" stroke="#8aad9c" strokeWidth="2" />
      <text x="218" y="435" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₆</text>
      
      {/* q16 → q17 (delimiters) */}
      <path d="M 240 430 L 330 430" stroke="#8aad9c" strokeWidth="1.8" fill="none" markerEnd="url(#nfa-arrow)" />
      <text x="270" y="424" fill="#6b7b82" fontSize="9" fontFamily="DM Mono">( ) {'{ }'} [ ] ; ,</text>
      
      {/* q17 (delimiter accepted) */}
      <circle cx="354" cy="430" r="22" fill="white" stroke="#8aad9c" strokeWidth="2" />
      <circle cx="354" cy="430" r="17" fill="none" stroke="#8aad9c" strokeWidth="1.2" />
      <text x="354" y="435" textAnchor="middle" fill="#1a2226" fontSize="12" fontWeight="600">q₁₇</text>

      {/* Branch label: DELIMITER */}
      <rect x="396" y="420" width="82" height="20" rx="4" fill="#eaf5ef" stroke="rgba(138,173,156,0.2)" strokeWidth="1" />
      <text x="437" y="434" textAnchor="middle" fill="#8aad9c" fontSize="9" fontWeight="600" fontFamily="DM Mono">DELIMITER</text>

      {/* ERROR STATE */}
      <path d="M 72 284 L 72 465" stroke="#c59b75" strokeWidth="1.5" strokeDasharray="4 3" fill="none" markerEnd="url(#nfa-arrow-err)" />
      <text x="80" y="400" fill="#8b5a3c" fontSize="8" fontFamily="DM Mono">invalid</text>
      
      <circle cx="72" cy="488" r="20" fill="#fff5f5" stroke="#c59b75" strokeWidth="2" />
      <text x="72" y="493" textAnchor="middle" fill="#8b5a3c" fontSize="11" fontWeight="600">qₑ</text>
    </svg>
  )
}
