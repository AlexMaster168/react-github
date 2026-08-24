import type { GithubUser } from '../types'
import { UserPlus } from 'lucide-react'

export const ContributorList = ({ contributors, loading }: { contributors: Array<GithubUser & { contributions: number }>; loading: boolean }) => {
  if (loading) return <LoaderInline />
  if (contributors.length === 0) return <p style={{ color: 'var(--text-secondary)' }}>Нет контрибьюторов</p>
  return (
    <div>
      {contributors.map((c, i) => (
        <div key={c.id} className="d-flex align-items-center gap-3 p-3 mb-2 rounded-lg fade-in"
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', animationDelay: `${i * 50}ms` }}>
          <img src={c.avatar_url} alt={c.login} style={{ width: 40, height: 40, borderRadius: '50%' }} />
          <div className="flex-grow-1">
            <a href={c.html_url} target="_blank" rel="noopener noreferrer" className="fw-bold" style={{ color: 'var(--text-primary)' }}>{c.login}</a>
          </div>
          <div className="d-flex align-items-center gap-2">
            <UserPlus size={14} style={{ color: 'var(--text-secondary)' }} />
            <span className="badge" style={{ backgroundColor: 'var(--accent-blue)', color: '#fff' }}>{c.contributions} коммитов</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function LoaderInline() {
  return <div className="d-flex justify-content-center p-4"><div className="spin" style={{ width: 24, height: 24, border: '2px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>
}
