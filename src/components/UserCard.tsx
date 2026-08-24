import { Link } from 'react-router-dom'
import type { GithubUser } from '../types'
import { MapPin, Building2, ExternalLink } from 'lucide-react'

interface UserCardProps {
  user: GithubUser
}

export const UserCard = ({ user }: UserCardProps) => (
  <div className="rounded-lg overflow-hidden fade-in"
    style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', transition: 'border-color 0.2s, transform 0.2s' }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)' }}>
    <img src={user.avatar_url} alt={user.login} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
    <div className="p-3">
      <h5 className="mb-1" style={{ color: 'var(--text-primary)' }}>{user.name || user.login}</h5>
      <p className="mb-2" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>@{user.login}</p>
      {user.bio && <p className="mb-2" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{user.bio.length > 80 ? user.bio.slice(0, 80) + '...' : user.bio}</p>}
      <div className="d-flex flex-wrap gap-2 mb-3">
        {user.location && <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}><MapPin size={12} /> {user.location}</span>}
        {user.company && <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}><Building2 size={12} /> {user.company}</span>}
      </div>
      <div className="d-flex gap-2 mb-3">
        <span className="badge" style={{ backgroundColor: 'var(--accent-blue)', color: '#fff' }}>{user.public_repos} репо</span>
        <span className="badge" style={{ backgroundColor: 'var(--accent-green)', color: '#fff' }}>{user.followers} подп.</span>
        <span className="badge" style={{ backgroundColor: 'var(--accent-purple)', color: '#fff' }}>{user.following} подписан</span>
      </div>
      <Link to={`/profile/${user.login}`} className="btn w-100 d-flex align-items-center justify-content-center gap-1"
        style={{ backgroundColor: 'var(--accent-blue)', color: '#fff', border: 'none' }}>
        Профиль <ExternalLink size={14} />
      </Link>
    </div>
  </div>
)
