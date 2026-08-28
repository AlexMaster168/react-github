import type { GithubUser } from '../types'
import { Link } from 'react-router-dom'

interface UserGridProps {
  users: GithubUser[]
}

export const UserGrid = ({ users }: UserGridProps) => {
  if (users.length === 0) return null
  return (
    <div className="row g-3">
      {users.map(user => (
        <div key={user.id} className="col-12 col-sm-6 col-md-4 col-lg-3 fade-in">
          <div className="rounded-lg overflow-hidden h-100"
            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', transition: 'border-color 0.2s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <img src={user.avatar_url} alt={user.login} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
            <div className="p-3">
              <h6 className="mb-1" style={{ color: 'var(--text-primary)' }}>{user.name || user.login}</h6>
              <p className="mb-2" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>@{user.login}</p>
              <Link to={`/profile/${user.login}`} className="btn btn-sm w-100"
                style={{ backgroundColor: 'var(--accent-blue)', color: '#fff', border: 'none' }}>Профиль</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
