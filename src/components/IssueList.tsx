import type { GithubIssue } from '../types'
import { formatDate } from '../utils/helpers'
import { MessageSquare, Tag, ExternalLink } from 'lucide-react'

export const IssueList = ({ issues, loading }: { issues: GithubIssue[]; loading: boolean }) => {
  if (loading) return <LoaderInline />
  if (issues.length === 0) return <p style={{ color: 'var(--text-secondary)' }}>Нет issues</p>
  return (
    <div>
      {issues.map(issue => (
        <div key={issue.id} className="p-3 mb-2 rounded-lg fade-in" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="d-flex align-items-start gap-2">
            <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              style={{ width: 20, height: 20, backgroundColor: issue.state === 'open' ? 'var(--accent-green)' : 'var(--accent-purple)', marginTop: 2 }}>
              {issue.state === 'open'
                ? <svg width="12" height="12" viewBox="0 0 16 16" fill="white"><path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/><path fillRule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/></svg>
                : <svg width="12" height="12" viewBox="0 0 16 16" fill="white"><path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/></svg>
              }
            </div>
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-1">
                <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="fw-bold" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{issue.title}</a>
                <a href={issue.html_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={12} /></a>
              </div>
              <div className="d-flex flex-wrap gap-2 mb-1">
                {issue.labels.map(l => <span key={l.id} className="badge" style={{ backgroundColor: `#${l.color}33`, color: `#${l.color}`, border: `1px solid #${l.color}55`, fontSize: '0.7rem' }}><Tag size={10} className="me-1" />{l.name}</span>)}
              </div>
              <div className="d-flex align-items-center gap-3" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                <span>#{issue.number} opened {formatDate(issue.created_at)} by {issue.user.login}</span>
                {issue.comments > 0 && <span className="d-flex align-items-center gap-1"><MessageSquare size={12} /> {issue.comments}</span>}
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
