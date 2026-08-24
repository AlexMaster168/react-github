const langColors: Record<string, string> = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219',
  'C++': '#f34b7d', C: '#555555', 'C#': '#178600', Go: '#00ADD8', Rust: '#dea584',
  Ruby: '#701516', PHP: '#4F5D95', Swift: '#F05138', Kotlin: '#A97BFF', Shell: '#89e051'
}

export const LanguageBar = ({ languages }: { languages: Record<string, number> }) => {
  const total = Object.values(languages).reduce((a, b) => a + b, 0)
  if (total === 0) return null
  const sorted = Object.entries(languages).sort(([, a], [, b]) => b - a).slice(0, 8)

  return (
    <div className="mb-3">
      <div className="d-flex rounded overflow-hidden" style={{ height: 8, backgroundColor: 'var(--bg-tertiary)' }}>
        {sorted.map(([lang, bytes]) => (
          <div key={lang} style={{ width: `${(bytes / total) * 100}%`, backgroundColor: langColors[lang] || '#6e7681' }} title={`${lang}: ${((bytes / total) * 100).toFixed(1)}%`} />
        ))}
      </div>
      <div className="d-flex flex-wrap gap-2 mt-2">
        {sorted.map(([lang, bytes]) => (
          <span key={lang} className="d-flex align-items-center gap-1" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <span className="rounded-circle d-inline-block" style={{ width: 8, height: 8, backgroundColor: langColors[lang] || '#6e7681' }} />
            {lang} ({((bytes / total) * 100).toFixed(1)}%)
          </span>
        ))}
      </div>
    </div>
  )
}
