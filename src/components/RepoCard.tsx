import { Link } from 'react-router-dom'
import type { GithubRepo } from '../types'
import { Star, GitFork, Eye, ExternalLink, Calendar } from 'lucide-react'
import { formatNumber, formatDate } from '../utils/helpers'

const langColors: Record<string, string> = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219',
  'C++': '#f34b7d', C: '#555555', 'C#': '#178600', Go: '#00ADD8', Rust: '#dea584',
  Ruby: '#701516', PHP: '#4F5D95', Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB',
  Shell: '#89e051', HTML: '#e34c26', CSS: '#563d7c', SCSS: '#c6538c', Vue: '#41b883'
}

interface RepoCardProps {
  repo: GithubRepo
}

export const RepoCard = ({ repo }: RepoCardProps) => (
  <div className="rounded-lg p-3 mb-3 fade-in"
    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', transition: 'border-color 0.2s' }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-blue)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}>
    <div className="d-flex justify-content-between align-items-start mb-2">
      <div>
        <Link to={`/repo/${repo.full_name}`} className="fw-bold" style={{ color: 'var(--accent-blue)', fontSize: '1.1rem' }}>{repo.name}</Link>
        {repo.fork && <span className="badge ms-2" style={{ backgroundColor: 'var(--accent-purple)', color: '#fff', fontSize: '0.7rem' }}>Fork</span>}
      </div>
      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={16} /></a>
    </div>
    {repo.description && <p className="mb-2" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{repo.description.length > 120 ? repo.description.slice(0, 120) + '...' : repo.description}</p>}
    {repo.topics && repo.topics.length > 0 && (
      <div className="d-flex flex-wrap gap-1 mb-2">
        {repo.topics.slice(0, 5).map(t => <span key={t} className="badge" style={{ backgroundColor: 'var(--accent-blue)', color: '#fff', fontSize: '0.7rem', padding: '4px 8px' }}>{t}</span>)}
      </div>
    )}
    <div className="d-flex flex-wrap gap-3 align-items-center">
      {repo.language && <span className="d-flex align-items-center gap-1" style={{ fontSize: '0.8rem' }}><span className="rounded-circle d-inline-block" style={{ width: 10, height: 10, backgroundColor: langColors[repo.language] || '#6e7681' }} /><span style={{ color: 'var(--text-secondary)' }}>{repo.language}</span></span>}
      <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}><Star size={14} /> {formatNumber(repo.stargazers_count)}</span>
      <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}><GitFork size={14} /> {formatNumber(repo.forks_count)}</span>
      {repo.watchers_count > 0 && <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}><Eye size={14} /> {formatNumber(repo.watchers_count)}</span>}
      <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}><Calendar size={14} /> {formatDate(repo.updated_at)}</span>
    </div>
    {repo.license && <div className="mt-2"><span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{repo.license.name}</span></div>}
  </div>
)
