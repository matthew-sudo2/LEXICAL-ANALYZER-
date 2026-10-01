import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import { tokenize, type LexerError, type Token, type StateTransition } from '../dfaLexer'

interface TokenRow {
  token: string
  lexeme: string
  type: string
  line: number
  col: number
  stateTrace?: string[]
  finalState?: string
}

const DEFAULT_CODE = `let total = 42;\nprint("hello");`

function lineCount(code: string) {
  return code.split('\n').length
}

export default function Analyzer() {
  const [code, setCode]           = useState(DEFAULT_CODE)
  const [tokens, setTokens]       = useState<TokenRow[]>([])
  const [error, setError]         = useState<LexerError | null>(null)
  const [status, setStatus]       = useState<'idle'|'scanning'|'complete'|'error'>('idle')
  const [searchTerm, setSearch]   = useState('')
  const [tokenCount, setCount]    = useState(0)
  const [selectedRow, setRow]     = useState<number | null>(null)
  const [transitions, setTransitions] = useState<StateTransition[]>([])
  const [showTransitions, setShowTransitions] = useState(false)

  const fileRef = useRef<HTMLInputElement>(null)

  /* ── File upload ─────────────────────────────── */
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      setCode(ev.target?.result as string)
      setStatus('idle')
      setError(null)
      setTokens([])
      setRow(null)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  /* ── Run Analysis ────────────────────────────── */
  const handleRun = useCallback(() => {
    if (status === 'scanning') return
    setStatus('scanning')
    setError(null)
    setTokens([])
    setRow(null)
    setSearch('')
    setTransitions([])

    setTimeout(() => {
      const result = tokenize(code)
      if ('error' in result) {
        setError(result.error)
        setStatus('error')
        setCount(0)
        setTransitions([])
      } else {
        const rows = result.tokens.map(t => ({
          token: t.token, 
          lexeme: t.lexeme,
          type: t.type, 
          line: t.line, 
          col: t.col,
          stateTrace: t.stateTrace,
          finalState: t.finalState
        }))
        setTokens(rows)
        setCount(rows.length)
        setTransitions(result.transitions)
        setStatus('complete')
      }
    }, 300)
  }, [code, status])

  /* ── Derived ─────────────────────────────────── */
  const filtered = tokens.filter(t => {
    const s = searchTerm.toLowerCase()
    return !s ||
      t.token.toLowerCase().includes(s) ||
      t.lexeme.toLowerCase().includes(s) ||
      t.type.toLowerCase().includes(s) ||
      String(t.line).includes(s)
  })

  const lines = code.split('\n')

  const errorLine  = error?.line ?? null
  const statusText = status === 'idle'     ? 'Waiting for source'
                   : status === 'scanning' ? 'Analyzing source'
                   : status === 'error'    ? 'Lexer halted'
                   :                         'Analysis complete'
  const errorText  = status === 'error'    ? '1 error · 0 warnings'
                   : status === 'idle'     ? '0 errors · 0 warnings'
                   : status === 'scanning' ? 'Analyzing source'
                   :                         '0 errors · 0 warnings'

  return (
    <div className="analyzer-root">
      {/* ── Top bar ──────────────────────────────── */}
      <header className="analyzer-topbar">
        <Logo />

        <span className="analyzer-filename">● untitled.lex</span>

        <input
          ref={fileRef}
          type="file"
          accept=".lex,.txt,.js,.ts"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
        <button className="btn btn-ghost btn-sm" onClick={() => fileRef.current?.click()}>
          Upload file
        </button>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleRun}
          disabled={status === 'scanning'}
        >
          {status === 'scanning' ? 'Scanning…' : '▶ Run Analysis'}
        </button>
      </header>

      {/* ── Workspace ────────────────────────────── */}
      <div className="analyzer-workspace">

        {/* ── Editor panel ─────────────────────── */}
        <div className="editor-card">
          <div className="panel-header">
            <div className="panel-label">
              <small>EDITOR</small>
              <strong>Source Input</strong>
            </div>
            <span className="panel-badge">JavaScript</span>
          </div>

          <div className="editor-body">
            {/* Gutter */}
            <div className="editor-gutter" aria-hidden>
              {lines.map((_, i) => (
                <span
                  key={i}
                  style={
                    errorLine === i + 1
                      ? { color: '#c97b7d', fontWeight: 600 }
                      : undefined
                  }
                >
                  {i + 1}
                </span>
              ))}
            </div>
            {/* Textarea */}
            <div className="editor-textarea-wrap">
              <textarea
                className="editor-textarea"
                value={code}
                onChange={e => {
                  setCode(e.target.value)
                  if (status !== 'idle') setStatus('idle')
                  if (error) setError(null)
                }}
                placeholder="Paste or type source code here…"
                disabled={status === 'scanning'}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
              />
            </div>
          </div>

          <div className="editor-statusbar">
            <span>UTF-8</span>
            <span>
              {lineCount(code)} {lineCount(code) === 1 ? 'line' : 'lines'}
            </span>
          </div>
        </div>

        {/* ── Results panel ────────────────────── */}
        <div className="results-card">
          <div className="panel-header">
            <div className="panel-label">
              <small>RESULTS</small>
              <strong>Token Output</strong>
            </div>
            <span className="panel-badge">
              {status === 'idle'     && 'No results'}
              {status === 'scanning' && 'Scanning'}
              {status === 'complete' && `${tokenCount} tokens`}
              {status === 'error'    && '0 tokens'}
            </span>
          </div>

          {/* ── error ──── */}
          {status === 'error' && error && (
            <div className="state-error">
              <div className="error-card">
                <div className="error-card-msg">
                  LexerError: {error.message} — line {error.line}, col {error.col}
                </div>
              </div>
              <p className="error-card-hint">Fix the marked character and run analysis again.</p>
            </div>
          )}

          {/* ── idle ───── */}
          {status === 'idle' && (
            <div className="state-empty">
              <span className="state-empty-icon">⌁</span>
              <span className="state-empty-title">Run analysis to see tokens.</span>
              <span className="state-empty-sub">Your parsed lexemes will appear here.</span>
            </div>
          )}

          {/* ── scanning ─ */}
          {status === 'scanning' && (
            <div className="state-scanning">
              <span className="scanning-label">scanning…</span>
              <div className="skel" />
              <div className="skel" />
              <div className="skel half" />
              <div className="skel" />
            </div>
          )}

          {/* ── complete ─ */}
          {status === 'complete' && (
            <>
              <div className="token-toolbar">
                <label className="token-search">
                  <span style={{ color: '#b0bcc0' }}>⌕</span>
                  <input
                    placeholder="Filter tokens…"
                    value={searchTerm}
                    onChange={e => setSearch(e.target.value)}
                  />
                </label>
                <span className="token-count">{filtered.length} shown</span>
              </div>

              <div className="token-table-wrap">
                <div className="token-table-head">
                  <span>Token</span>
                  <span>Lexeme</span>
                  <span>Type</span>
                  <span>Line</span>
                  <span>State</span>
                </div>
                {filtered.map((t, i) => (
                  <div
                    key={`${t.lexeme}-${i}`}
                    className={`token-table-row${selectedRow === i ? ' selected-row' : ''}`}
                    onClick={() => setRow(selectedRow === i ? null : i)}
                  >
                    <span className="token-name-cell">
                      <span className={`dot dot-${t.type.toLowerCase()}`} />
                      {t.type.toLowerCase()}
                    </span>
                    <span className="token-lexeme-cell">{t.lexeme}</span>
                    <span className="token-type-cell">{t.type}</span>
                    <span className="token-line-cell">{t.line}</span>
                    <span className="token-state-cell">
                      {t.finalState || '—'}
                    </span>
                  </div>
                ))}
              </div>

              {/* State Transition Details for Selected Token */}
              {selectedRow !== null && filtered[selectedRow]?.stateTrace && (
                <div className="state-trace-panel">
                  <div className="state-trace-header">
                    <span className="eyebrow">DFA STATE TRACE</span>
                    <span className="state-trace-token">{filtered[selectedRow].lexeme}</span>
                  </div>
                  <div className="state-trace-path">
                    {filtered[selectedRow].stateTrace!.map((state, i, arr) => (
                      <span key={i} className="state-trace-item">
                        <span className={`state-badge ${arr[arr.length - 1] === state && state.includes('ACC') ? 'state-accept' : state.includes('REJ') ? 'state-reject' : ''}`}>
                          {state}
                        </span>
                        {i < arr.length - 1 && <span className="state-arrow">→</span>}
                      </span>
                    ))}
                  </div>
                  <div className="state-trace-result">
                    <span className={`result-badge ${filtered[selectedRow].finalState?.includes('ACC') || filtered[selectedRow].finalState?.includes('ACCEPT') ? 'result-accept' : filtered[selectedRow].finalState?.includes('REJ') || filtered[selectedRow].finalState?.includes('ERROR') ? 'result-reject' : 'result-neutral'}`}>
                      {filtered[selectedRow].finalState?.includes('ACC') || filtered[selectedRow].finalState?.includes('ACCEPT') ? '✓ ACCEPTED' : 
                       filtered[selectedRow].finalState?.includes('REJ') || filtered[selectedRow].finalState?.includes('ERROR') ? '✗ REJECTED' : 
                       'COMPLETED'}
                    </span>
                    <span className="result-text">
                      Final state: <code>{filtered[selectedRow].finalState}</code>
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="results-statusbar">
            <span>{errorText}</span>
            <span>{statusText}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
