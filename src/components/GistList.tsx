import type { GithubGist } from '../types'
import { formatDate } from '../utils/helpers'
import { FileCode, ExternalLink } from 'lucide-react'

export const GistList = ({ gists, loading }: { gists: GithubGist[]; loading: boolean }) => {
  if (loading) return <LoaderInline />
  if (gists.length === 0) return <p style={{ color: 'var(--text-secondary)' }}>Нет гистов</p>
  return (
    <div>
      {gists.map(g => (
        <div key={g.id} className="p-3 mb-2 rounded-lg fade-in" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center gap-2">
              <FileCode size={16} style={{ color: 'var(--accent-blue)' }} />
              <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{Object.keys(g.files)[0] || 'gist'}</span>
            </div>
            <a href={g.html_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={14} /></a>
          </div>
          {g.description && <p className="mb-2" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{g.description}</p>}
          <div className="d-flex flex-wrap gap-2">
            {Object.keys(g.files).map(f => <span key={f} className="badge" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>{f}</span>)}
          </div>
          <div className="mt-2" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{formatDate(g.created_at)} | {g.comments} комментари(й/ев)</div>
        </div>
      ))}
    </div>
  )
}

function LoaderInline() {
  return <div className="d-flex justify-content-center p-4"><div className="spin" style={{ width: 24, height: 24, border: '2px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>
}
