import { useState, useEffect } from 'react'
import type { GithubContent } from '../types'
import { githubApi } from '../api/github'
import { File, Folder, FileCode, FileText, ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react'

export const FileExplorer = ({ owner, repo, defaultBranch = 'main' }: { owner: string; repo: string; defaultBranch?: string }) => {
  const [items, setItems] = useState<Array<{ path: string; name: string; type: string; size?: number; sha: string }>>([])
  const [currentPath, setCurrentPath] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState<GithubContent | null>(null)

  useEffect(() => {
    setLoading(true)
    setSelectedFile(null)
    githubApi.getRepoContent(owner, repo, currentPath)
      .then(data => {
        const arr = Array.isArray(data) ? data : [data]
        setItems(arr.sort((a, b) => {
          if (a.type === 'dir' && b.type !== 'dir') return -1
          if (a.type !== 'dir' && b.type === 'dir') return 1
          return a.name.localeCompare(b.name)
        }).map(i => ({ path: i.path, name: i.name, type: i.type, size: i.size, sha: i.sha })))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [owner, repo, currentPath, defaultBranch])

  const handleClick = async (item: { path: string; type: string }) => {
    if (item.type === 'dir') {
      setCurrentPath(item.path)
    } else {
      setLoading(true)
      try {
        const data = await githubApi.getRepoContent(owner, repo, item.path) as GithubContent
        setSelectedFile(data)
      } catch {}
      setLoading(false)
    }
  }

  const goBack = () => {
    const parts = currentPath.split('/')
    parts.pop()
    setCurrentPath(parts.join('/'))
  }

  const getFileIcon = (name: string, type: string) => {
    if (type === 'dir') return <Folder size={16} style={{ color: 'var(--accent-blue)' }} />
    const ext = name.split('.').pop()?.toLowerCase()
    if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'go', 'rs', 'rb'].includes(ext || '')) return <FileCode size={16} style={{ color: 'var(--accent-orange)' }} />
    if (['md', 'txt', 'rst'].includes(ext || '')) return <FileText size={16} style={{ color: 'var(--accent-green)' }} />
    return <File size={16} style={{ color: 'var(--text-secondary)' }} />
  }

  const formatSize = (bytes?: number) => {
    if (!bytes) return ''
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1048576).toFixed(1)} MB`
  }

  if (loading) return <div className="d-flex justify-content-center p-4"><div className="spin" style={{ width: 24, height: 24, border: '2px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>

  if (selectedFile) {
    const decoded = selectedFile.content ? atob(selectedFile.content) : ''
    return (
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <div className="d-flex align-items-center justify-content-between p-3" style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-sm" onClick={() => setSelectedFile(null)} style={{ color: 'var(--text-secondary)' }}><ArrowLeft size={16} /></button>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{selectedFile.name}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{formatSize(selectedFile.size)}</span>
          </div>
          <a href={selectedFile.html_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}><ExternalLink size={14} /></a>
        </div>
        <pre className="p-3 mb-0 overflow-auto" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.875rem', lineHeight: 1.5, maxHeight: 500 }}><code>{decoded}</code></pre>
      </div>
    )
  }

  return (
    <div className="rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
      {currentPath && (
        <div className="d-flex align-items-center gap-2 p-3" style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
          <button className="btn btn-sm" onClick={goBack} style={{ color: 'var(--text-secondary)' }}><ArrowLeft size={16} /></button>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{currentPath}</span>
        </div>
      )}
      <div>
        {items.map(item => (
          <div key={item.sha} className="d-flex align-items-center gap-2 px-3 py-2"
            onClick={() => handleClick(item)}
            style={{ cursor: 'pointer', borderBottom: '1px solid var(--border-color)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            {item.type === 'dir' && <ChevronRight size={14} style={{ color: 'var(--text-secondary)' }} />}
            {getFileIcon(item.name, item.type)}
            <span style={{ color: 'var(--text-primary)', flex: 1 }}>{item.name}</span>
            {item.size !== undefined && <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{formatSize(item.size)}</span>}
          </div>
        ))}
        {items.length === 0 && <div className="p-4 text-center" style={{ color: 'var(--text-secondary)' }}>Папка пуста</div>}
      </div>
    </div>
  )
}
