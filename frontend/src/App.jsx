import { useState } from 'react'
import { AlertCircle, Braces, Check, Code2, LoaderCircle, Play, RotateCcw, Sparkles } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const starterCode = `for item in values:\n    if item >= 10:\n        print("ready")`

const tokenColors = {
  KEYWORD: 'token-keyword',
  IDENTIFIER: 'token-identifier',
  STRING: 'token-string',
  INTEGER: 'token-number',
  FLOAT: 'token-number',
}

function App() {
  const [sourceCode, setSourceCode] = useState(starterCode)
  const [result, setResult] = useState({ lexemes: [], errors: [] })
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [requestError, setRequestError] = useState('')

  async function analyzeSource() {
    setIsAnalyzing(true)
    setRequestError('')
    try {
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_code: sourceCode }),
      })
      if (!response.ok) throw new Error(`API responded with ${response.status}`)
      setResult(await response.json())
    } catch (error) {
      setRequestError(`Could not reach the analyzer. ${error.message}`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  function resetWorkspace() {
    setSourceCode(starterCode)
    setResult({ lexemes: [], errors: [] })
    setRequestError('')
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] text-slate-950">
      <header className="border-b border-slate-900/10 bg-[#fbfaf6]/90 px-6 py-5 backdrop-blur md:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-slate-950 text-[#d7f36b] shadow-lg shadow-slate-900/10"><Braces size={21} strokeWidth={2.5} /></div>
            <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">DFA / 01</p><h1 className="font-display text-xl font-bold tracking-tight">Lexical Analyzer</h1></div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-slate-900/10 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:flex"><span className="size-2 rounded-full bg-[#a5c94d]" /> Stateless engine online</div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-10 md:px-10 md:pt-14">
        <div className="mb-9 max-w-2xl"><div className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#6e7f24]"><Sparkles size={15} /> Token workbench</div><h2 className="font-display text-4xl font-bold leading-[0.98] tracking-tight text-slate-950 md:text-6xl">See source code become structure.</h2><p className="mt-5 max-w-xl text-base leading-7 text-slate-600">Drop in a snippet and let the deterministic finite automaton identify every lexeme, location, and invalid character.</p></div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <section className="panel flex min-h-[560px] flex-col bg-slate-950 text-white">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4"><div className="flex items-center gap-3"><Code2 size={18} className="text-[#d7f36b]" /><span className="font-mono text-sm font-bold">source.input</span></div><button className="icon-button" title="Reset source" onClick={resetWorkspace}><RotateCcw size={16} /></button></div>
            <div className="flex flex-1 overflow-hidden"><div className="select-none border-r border-white/10 px-4 py-5 text-right font-mono text-xs leading-7 text-slate-600">{sourceCode.split('\n').map((_, index) => <div key={index}>{String(index + 1).padStart(2, '0')}</div>)}</div><textarea aria-label="Source code" value={sourceCode} onChange={(event) => setSourceCode(event.target.value)} spellCheck="false" className="min-h-full w-full resize-none bg-transparent px-5 py-5 font-mono text-sm leading-7 text-slate-200 outline-none placeholder:text-slate-700" placeholder="Paste source code here..." /></div>
            <div className="border-t border-white/10 p-4"><button className="primary-button" onClick={analyzeSource} disabled={isAnalyzing}><span>{isAnalyzing ? <LoaderCircle className="animate-spin" size={17} /> : <Play size={17} fill="currentColor" />}</span>{isAnalyzing ? 'Analyzing...' : 'Analyze source'}</button></div>
          </section>

          <section className="panel min-h-[560px] overflow-hidden bg-white">
            <div className="flex items-center justify-between border-b border-slate-900/10 px-5 py-4"><div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Output stream</p><h3 className="mt-1 font-display text-lg font-bold">Token ledger</h3></div><div className="rounded-full bg-[#eef6ce] px-3 py-1 font-mono text-xs font-bold text-[#65741f]">{result.lexemes.length} tokens</div></div>
            {requestError && <div className="m-4 flex gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-700"><AlertCircle size={18} />{requestError}</div>}
            {result.errors.length > 0 && <div className="m-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"><div className="flex items-center gap-2 font-bold"><AlertCircle size={17} />{result.errors.length} invalid {result.errors.length === 1 ? 'character' : 'characters'} found</div><div className="mt-2 font-mono text-xs">{result.errors.map((error) => `${error.value} at ${error.line}:${error.column}`).join('  |  ')}</div></div>}
            <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-slate-900/10 bg-[#fbfaf6] font-mono text-[10px] uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-3">Line</th><th className="px-5 py-3">Lexeme</th><th className="px-5 py-3">Token type</th><th className="px-5 py-3 text-right">State</th></tr></thead><tbody>{result.lexemes.length === 0 ? <tr><td colSpan="4" className="px-5 py-24 text-center"><div className="mx-auto mb-3 grid size-10 place-items-center rounded-full bg-[#eef6ce] text-[#6e7f24]"><Check size={19} /></div><p className="font-semibold text-slate-700">Ready for analysis</p><p className="mt-1 text-xs text-slate-400">Your token stream will appear here</p></td></tr> : result.lexemes.map((item, index) => <tr key={`${item.line}-${item.column}-${index}`} className="border-b border-slate-900/5 last:border-0"><td className="px-5 py-3 font-mono text-xs text-slate-400">{String(item.line).padStart(2, '0')}</td><td className="px-5 py-3 font-mono font-semibold text-slate-800">{item.lexeme}</td><td className="px-5 py-3"><span className={`token-pill ${tokenColors[item.token_type] || 'token-default'}`}>{item.token_type}</span></td><td className="px-5 py-3 text-right"><span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#6e7f24]"><span className="size-1.5 rounded-full bg-[#a5c94d]" /> accepted</span></td></tr>)}</tbody></table></div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App
