import type { GithubPullRequest } from '../types'
import { formatDate } from '../utils/helpers'
import { GitPullRequest, ExternalLink } from 'lucide-react'

export const PullRequestList = ({ pullRequests, loading }: { pullRequests: GithubPullRequest[]; loading: boolean }) => {
  if (loading) return <LoaderInline />
  if (pullRequests.length === 0) return <p style={{ color: 'var(--text-secondary)' }}>Нет pull request'ов</p>
  return (
    <div>
      {pullRequests.map(pr => (
        <div key={pr.id} className="p-3 mb-2 rounded-lg fade-in" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="d-flex align-items-start gap-2">
            <GitPullRequest size={18} style={{ color: pr.merged_at ? 'var(--accent-purple)' : 'var(--accent-green)', marginTop: 2 }} />
            <div className="flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-1">
                <a href={pr.html_url} target="_blank" rel="noopener noreferrer" className="fw-bold" style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{pr.title}</a>
                <a href={pr.html_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={12} /></a>
              </div>
              <div className="d-flex align-items-center gap-3" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                <span>#{pr.number} opened {formatDate(pr.created_at)} by {pr.user.login}</span>
                <span className="badge" style={{ backgroundColor: pr.merged_at ? 'var(--accent-purple)' : pr.state === 'open' ? 'var(--accent-green)' : 'var(--accent-red)', color: '#fff', fontSize: '0.7rem' }}>{pr.merged_at ? 'merged' : pr.state}</span>
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
