import type { GithubUser } from '../types'
import { MapPin, Building2, Mail, Link as LinkIcon } from 'lucide-react'

interface UserHeaderProps {
  user: GithubUser
}

export const UserHeader = ({ user }: UserHeaderProps) => (
  <div className="user-header-flex d-flex gap-3 gap-md-4 mb-4 fade-in">
    <img src={user.avatar_url} alt={user.login}
      style={{ width: 120, height: 120, borderRadius: '50%', border: '3px solid var(--border-color)', flexShrink: 0 }} />
    <div className="text-center text-sm-start">
      <h1 className="mb-1" style={{ color: 'var(--text-primary)', fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}>{user.name || user.login}</h1>
      <p className="mb-2" style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>@{user.login}</p>
      {user.bio && <p className="mb-3" style={{ color: 'var(--text-secondary)', maxWidth: 600 }}>{user.bio}</p>}
      <div className="d-flex flex-wrap gap-2 gap-md-3 mb-3 info-row justify-content-center justify-content-sm-start">
        {user.location && <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}><MapPin size={14} /> {user.location}</span>}
        {user.company && <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}><Building2 size={14} /> {user.company}</span>}
        {user.email && <a href={`mailto:${user.email}`} className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}><Mail size={14} /> {user.email}</a>}
        {user.blog && <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-1" style={{ color: 'var(--accent-blue)', fontSize: '0.85rem' }}><LinkIcon size={14} /> {user.blog}</a>}
      </div>
      <div className="d-flex gap-2 badges-row justify-content-center justify-content-sm-start">
        <span className="badge" style={{ backgroundColor: 'var(--accent-blue)', color: '#fff' }}>{user.public_repos} репо</span>
        <span className="badge" style={{ backgroundColor: 'var(--accent-green)', color: '#fff' }}>{user.followers} подп.</span>
        <span className="badge" style={{ backgroundColor: 'var(--accent-purple)', color: '#fff' }}>{user.following} подписан</span>
        {user.public_gists > 0 && <span className="badge" style={{ backgroundColor: 'var(--accent-orange)', color: '#fff' }}>{user.public_gists} гистов</span>}
      </div>
    </div>
  </div>
)
