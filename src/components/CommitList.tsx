import type { GithubCommit } from '../types'
import { formatDate, truncate } from '../utils/helpers'
import { GitCommit } from 'lucide-react'

export const CommitList = ({ commits, loading }: { commits: GithubCommit[]; loading: boolean }) => {
  if (loading) return <LoaderInline />
  if (commits.length === 0) return <p style={{ color: 'var(--text-secondary)' }}>Нет коммитов</p>
  return (
    <div>
      {commits.map(c => (
        <div key={c.sha} className="p-3 mb-2 rounded-lg fade-in" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="d-flex align-items-start gap-2">
            <GitCommit size={18} style={{ color: 'var(--accent-orange)', marginTop: 2 }} />
            <div className="flex-grow-1">
              <a href={c.html_url} target="_blank" rel="noopener noreferrer" className="fw-bold d-block mb-1" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{truncate(c.commit.message, 80)}</a>
              <div className="d-flex align-items-center gap-3" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                {c.author && <span className="d-flex align-items-center gap-1"><img src={c.author.avatar_url} alt="" style={{ width: 16, height: 16, borderRadius: '50%' }} />{c.author.login}</span>}
                <code style={{ fontSize: '0.75rem', color: 'var(--accent-blue)' }}>{c.sha.slice(0, 7)}</code>
                <span>{formatDate(c.commit.author.date)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function LoaderInline() {
  return <div className="d-flex justify-content-center p-4"><div className="spin" style={{ width: 24, height: 24, border: '2px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>
}
