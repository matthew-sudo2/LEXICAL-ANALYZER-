/**
 * TransitionTable Component
 * 
 * Displays transition tables for NFA, DFA, and Minimized DFA
 */
interface TransitionTableProps {
  title: string
  description: string
  headers: string[]
  rows: Array<{
    state: string
    [key: string]: string | boolean
  }>
  highlightState?: string
}

export default function TransitionTable({ title, description, headers, rows, highlightState }: TransitionTableProps) {
  // Helper to get value from row based on header
  const getValueForHeader = (row: any, header: string) => {
    // Try exact match first
    if (row[header] !== undefined) return row[header]
    
    // Try normalized key
    const normalized = header.toLowerCase().replace(/[^a-z]/g, '')
    if (row[normalized] !== undefined) return row[normalized]
    
    // Try common variations
    if (header.includes('State') || header.includes('state')) return row.state
    if (header.includes('Accepting') || header.includes('accepting')) return row.accepting
    if (header.includes('letter')) return row.letter
    if (header.includes('digit')) return row.digit
    if (header.includes('underscore')) return row.underscore
    if (header.includes('dot')) return row.dot
    if (header.includes('quote')) return row.quote
    if (header.includes('operator')) return row.operator
    if (header.includes('delimiter')) return row.delimiter
    if (header.includes('epsilon') || header.includes('ε')) return row.epsilon || row.epsilon
    
    return ''
  }

  return (
    <div className="transition-table-container">
      <h3 className="table-title">{title}</h3>
      <p className="table-description">{description}</p>
      
      <div className="table-wrapper">
        <table className="transition-table">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={highlightState && row.state === highlightState ? 'highlighted-row' : ''}
              >
                {headers.map((header, colIndex) => {
                  const value = getValueForHeader(row, header)
                  
                  if (header === 'State' || header.includes('State')) {
                    return (
                      <td key={colIndex} className="state-cell">
                        <code>{row.state}</code>
                      </td>
                    )
                  }
                  
                  if (header === 'Accepting?' || header.includes('Accepting') || header.includes('accepting')) {
                    return (
                      <td key={colIndex} className="accepting-cell">
                        {value === true || value === '✓' ? (
                          <span className="accepting-badge">✓</span>
                        ) : (
                          <span className="rejecting-badge">✗</span>
                        )}
                      </td>
                    )
                  }
                  
                  // Token Output column - show as badge
                  if (header === 'Token Output' || header.includes('Token')) {
                    return (
                      <td key={colIndex}>
                        {value && value !== 'N/A' && value !== '-' ? (
                          <span className="badge badge-nfa">{value}</span>
                        ) : (
                          <code>{String(value)}</code>
                        )}
                      </td>
                    )
                  }
                  
                  return (
                    <td key={colIndex}>
                      <code>{String(value)}</code>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
