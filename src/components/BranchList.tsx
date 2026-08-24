import type { GithubBranch } from '../types'
import { GitBranch } from 'lucide-react'

export const BranchList = ({ branches, loading }: { branches: GithubBranch[]; loading: boolean }) => {
  if (loading) return <LoaderInline />
  if (branches.length === 0) return <p style={{ color: 'var(--text-secondary)' }}>Нет веток</p>
  return (
    <div className="d-flex flex-wrap gap-2">
      {branches.map(b => (
        <span key={b.name} className="d-inline-flex align-items-center gap-1 px-3 py-1 rounded-lg"
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: b.name === 'main' || b.name === 'master' ? 'var(--accent-green)' : 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <GitBranch size={14} /> {b.name}
          {b.protected && <span style={{ fontSize: '0.7rem', color: 'var(--accent-orange)' }}>&#128274;</span>}
        </span>
      ))}
    </div>
  )
}

function LoaderInline() {
  return <div className="d-flex justify-content-center p-4"><div className="spin" style={{ width: 24, height: 24, border: '2px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>
}
