import { Star, GitFork, ExternalLink, Calendar } from 'lucide-react'
import { formatNumber, formatDate } from '../utils/helpers'
import { Link } from 'react-router-dom'

const langColors: Record<string, string> = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219',
  'C++': '#f34b7d', C: '#555555', Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516',
  PHP: '#4F5D95', Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB', Shell: '#89e051'
}

interface RepoHeaderProps {
  owner: string
  repo: string
  description?: string | null
  stars: number
  forks: number
  watchers: number
  language?: string | null
  createdAt: string
  updatedAt: string
  topics?: string[]
}

export const RepoHeader = ({ owner, repo, description, stars, forks, watchers, language, createdAt, updatedAt, topics = [] }: RepoHeaderProps) => (
  <div className="mb-4 fade-in">
    <div className="d-flex align-items-center gap-3 mb-3">
      <h1 className="mb-0" style={{ color: 'var(--text-primary)' }}>
        <Link to={`/profile/${owner}`} style={{ color: 'var(--accent-blue)' }}>{owner}</Link>
        <span style={{ color: 'var(--text-secondary)' }}> / </span>
        <span style={{ color: 'var(--text-primary)' }}>{repo}</span>
      </h1>
      <a href={`https://github.com/${owner}/${repo}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={18} /></a>
    </div>
    {description && <p className="mb-3" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{description}</p>}
    <div className="d-flex flex-wrap gap-3 mb-3">
      {language && <span className="d-flex align-items-center gap-1"><span className="rounded-circle d-inline-block" style={{ width: 12, height: 12, backgroundColor: langColors[language] || '#6e7681' }} /><span style={{ color: 'var(--text-secondary)' }}>{language}</span></span>}
      <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)' }}><Star size={16} /> {formatNumber(stars)}</span>
      <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)' }}><GitFork size={16} /> {formatNumber(forks)}</span>
      <span style={{ color: 'var(--text-secondary)' }}>&#128065; {formatNumber(watchers)}</span>
      <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)' }}><Calendar size={14} /> Создан: {formatDate(createdAt)}</span>
      <span style={{ color: 'var(--text-secondary)' }}>Обновлён: {formatDate(updatedAt)}</span>
    </div>
    {topics.length > 0 && (
      <div className="d-flex flex-wrap gap-1">
        {topics.map(t => <span key={t} className="badge" style={{ backgroundColor: 'var(--accent-blue)', color: '#fff', fontSize: '0.75rem', padding: '4px 10px' }}>{t}</span>)}
      </div>
    )}
  </div>
)
