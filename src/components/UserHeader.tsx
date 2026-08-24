import type { GithubUser } from '../types'
import { MapPin, Building2, Mail, Link as LinkIcon } from 'lucide-react'

interface UserHeaderProps {
  user: GithubUser
}

export const UserHeader = ({ user }: UserHeaderProps) => (
  <div className="d-flex gap-4 mb-4 fade-in">
    <img src={user.avatar_url} alt={user.login}
      style={{ width: 150, height: 150, borderRadius: '50%', border: '3px solid var(--border-color)' }} />
    <div>
      <h1 className="mb-1" style={{ color: 'var(--text-primary)' }}>{user.name || user.login}</h1>
      <p className="mb-2" style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>@{user.login}</p>
      {user.bio && <p className="mb-3" style={{ color: 'var(--text-secondary)', maxWidth: 600 }}>{user.bio}</p>}
      <div className="d-flex flex-wrap gap-3 mb-3">
        {user.location && <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)' }}><MapPin size={14} /> {user.location}</span>}
        {user.company && <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)' }}><Building2 size={14} /> {user.company}</span>}
        {user.email && <a href={`mailto:${user.email}`} className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)' }}><Mail size={14} /> {user.email}</a>}
        {user.blog && <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-1" style={{ color: 'var(--accent-blue)' }}><LinkIcon size={14} /> {user.blog}</a>}
      </div>
      <div className="d-flex gap-2">
        <span className="badge" style={{ backgroundColor: 'var(--accent-blue)', color: '#fff', fontSize: '0.8rem', padding: '6px 12px' }}>{user.public_repos} репо</span>
        <span className="badge" style={{ backgroundColor: 'var(--accent-green)', color: '#fff', fontSize: '0.8rem', padding: '6px 12px' }}>{user.followers} подп.</span>
        <span className="badge" style={{ backgroundColor: 'var(--accent-purple)', color: '#fff', fontSize: '0.8rem', padding: '6px 12px' }}>{user.following} подписан</span>
        {user.public_gists > 0 && <span className="badge" style={{ backgroundColor: 'var(--accent-orange)', color: '#fff', fontSize: '0.8rem', padding: '6px 12px' }}>{user.public_gists} гистов</span>}
      </div>
    </div>
  </div>
)
