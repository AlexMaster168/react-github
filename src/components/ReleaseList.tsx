import type { GithubRelease } from '../types'
import { formatDate } from '../utils/helpers'
import { Tag, ExternalLink, Download } from 'lucide-react'

export const ReleaseList = ({ releases, loading }: { releases: GithubRelease[]; loading: boolean }) => {
  if (loading) return <LoaderInline />
  if (releases.length === 0) return <p style={{ color: 'var(--text-secondary)' }}>Нет релизов</p>
  return (
    <div>
      {releases.map(r => (
        <div key={r.id} className="p-3 mb-2 rounded-lg fade-in" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <div className="d-flex align-items-center justify-content-between mb-2">
            <div className="d-flex align-items-center gap-2">
              <Tag size={16} style={{ color: 'var(--accent-blue)' }} />
              <span className="fw-bold" style={{ color: 'var(--text-primary)' }}>{r.tag_name}</span>
              {r.name && <span style={{ color: 'var(--text-secondary)' }}>- {r.name}</span>}
              {r.prerelease && <span className="badge" style={{ backgroundColor: 'var(--accent-orange)', color: '#fff', fontSize: '0.7rem' }}>Pre-release</span>}
            </div>
            <a href={r.html_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={14} /></a>
          </div>
          {r.body && <p className="mb-2" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{r.body.length > 200 ? r.body.slice(0, 200) + '...' : r.body}</p>}
          <div className="d-flex align-items-center justify-content-between">
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{formatDate(r.published_at)} by {r.author.login}</span>
            {r.assets.length > 0 && <span className="d-flex align-items-center gap-1" style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}><Download size={12} /> {r.assets.length} файл(ов)</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

function LoaderInline() {
  return <div className="d-flex justify-content-center p-4"><div className="spin" style={{ width: 24, height: 24, border: '2px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>
}
