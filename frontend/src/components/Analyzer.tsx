import { useState, useRef } from 'react'
import { tokenize, Token, LexerError } from '../lexer'

interface TokenRow {
  token: string
  lexeme: string
  type: string
  line: number
  col: number
}

const DEFAULT_CODE = `let total = 42;
print("hello");`

export default function Analyzer() {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [tokens, setTokens] = useState<TokenRow[]>([])
  const [error, setError] = useState<LexerError | null>(null)
  const [status, setStatus] = useState<'idle' | 'scanning' | 'complete' | 'error'>('idle')
  const [searchTerm, setSearchTerm] = useState('')
  const [tokenCount, setTokenCount] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setCode(content)
        setStatus('idle')
        setError(null)
        setTokens([])
      }
      reader.readAsText(file)
    }
    // Reset the input so the same file can be selected again
    event.target.value = ''
  }

  const handleRunAnalysis = () => {
    setStatus('scanning')
    setError(null)
    setTokens([])

    // Use setTimeout to show scanning animation
    setTimeout(() => {
      const result = tokenize(code)

      if ('error' in result) {
        setError(result.error)
        setStatus('error')
        setTokenCount(0)
      } else {
        setTokens(result.tokens.map(t => ({
          token: t.token,
          lexeme: t.lexeme,
          type: t.type,
          line: t.line,
          col: t.col
        })))
        setTokenCount(result.tokens.length)
        setStatus('complete')
      }
    }, 300)
  }

  const filteredTokens = tokens.filter(t => {
    const term = searchTerm.toLowerCase()
    return (
      t.token.toLowerCase().includes(term) ||
      t.lexeme.toLowerCase().includes(term) ||
      t.type.toLowerCase().includes(term) ||
      t.line.toString().includes(term) ||
      t.col.toString().includes(term)
    )
  })

  const getStatusText = () => {
    if (status === 'idle') return 'Waiting for source'
    if (status === 'scanning') return 'Analyzing source'
    if (status === 'error') return 'Lexer halted'
    return 'Analysis complete'
  }

  const getErrorText = () => {
    if (status === 'idle') return '0 errors · 0 warnings'
    if (status === 'scanning') return 'Analyzing source'
    if (status === 'error') return '1 error · 0 warnings'
    return '0 errors · 0 warnings'
  }

  return (
    <div className="app-container">
      <header className="app-header-row">
        <div className="app-file">● untitled.lex</div>
        <input
          type="file"
          ref={fileInputRef}
          accept=".lex,.txt"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <button className="o-button" onClick={() => fileInputRef.current?.click()}>
          📂 Upload File
        </button>
        <button className="o-button" onClick={handleRunAnalysis} disabled={status === 'scanning'}>
          {status === 'scanning' ? 'Scanning…' : '▶ Run Analysis'}
        </button>
        <button className="settings-btn">⚙</button>
      </header>

      <div className="app-workspace">
        <div className="editor-panel">
          <div className="panel-title">
            <div>
              <small>EDITOR</small>
              <b>Source Input</b>
            </div>
            <span>JavaScript</span>
          </div>
          <div className="code-editor">
            <textarea
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                if (status !== 'idle') setStatus('idle')
                if (error) setError(null)
              }}
              placeholder="Paste or type source code here…"
              className={status === 'scanning' ? 'disabled' : ''}
            />
          </div>
          <div className="panel-footer">
            UTF-8 <span>Ln 1, Col 1</span>
          </div>
        </div>

        <div className="results-panel">
          <div className="panel-title">
            <div>
              <small>RESULTS</small>
              <b>Token Output</b>
            </div>
            <span>{status === 'idle' ? 'No results' : status === 'scanning' ? 'Scanning' : `${tokenCount} tokens`}</span>
          </div>

          {status === 'error' && error ? (
            <div className="error-banner">
              <div className="error-message">LexerError: {error.message} — line {error.line}, col {error.col}</div>
              <p>Fix the error and run analysis again.</p>
            </div>
          ) : status === 'idle' ? (
            <div className="empty-state">
              <i>⌁</i>
              <b>Run analysis to see tokens.</b>
              <span>Your parsed lexemes will appear here.</span>
            </div>
          ) : status === 'scanning' ? (
            <div className="scan-area">
              <span>scanning…</span>
              <div className="skeleton" />
              <div className="skeleton" />
              <div className="skeleton short" />
              <div className="skeleton" />
            </div>
          ) : (
            <>
              <div className="token-toolbar">
                <label>⌕ <input placeholder="Filter tokens" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></label>
                <span>{filteredTokens.length} shown</span>
              </div>
              <div className="token-table">
                <div className="token-head">
                  <span>Token</span>
                  <span>Lexeme</span>
                  <span>Type</span>
                  <span>Line</span>
                  <span>Col</span>
                </div>
                {filteredTokens.map((t, index) => (
                  <div className="token-row" key={`${t.lexeme}-${index}`}>
                    <span className={`token-type ${t.type.toLowerCase()}`}>{t.type}</span>
                    <code>{t.lexeme}</code>
                    <span>{t.type}</span>
                    <span>{t.line}</span>
                    <span>{t.col}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="panel-footer">
            <span>{getErrorText()}</span>
            <span>{status === 'error' ? 'Lexer halted' : getStatusText()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}