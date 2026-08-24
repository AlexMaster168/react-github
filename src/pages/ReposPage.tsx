import { useState } from 'react'
import { useGithub } from '../context/GithubContext'
import { Search } from '../components/Search'
import { RepoCard } from '../components/RepoCard'
import { Pagination } from '../components/Pagination'
import { Package, TrendingUp } from 'lucide-react'

export const ReposPage = () => {
  const { searchRepoResult, page, totalPages, searchRepos, loading } = useGithub()
  const [sortBy, setSortBy] = useState<'stars' | 'forks' | 'updated'>('stars')

  const handlePageChange = (newPage: number) => {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement
    if (input?.value) searchRepos(input.value, newPage)
  }

  return (
    <div className="fade-in">
      <div className="text-center mb-4">
        <h1 className="d-flex align-items-center justify-content-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Package size={32} /> Поиск репозиториев
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Найдите репозитории по названию, описанию или темам</p>
      </div>
      <Search mode="repos" />
      <div className="d-flex align-items-center justify-content-between mb-3">
        {searchRepoResult && <div style={{ color: 'var(--text-secondary)' }}>Найдено: {searchRepoResult.total_count.toLocaleString()} репозиториев</div>}
        <div className="d-flex gap-2">
          {(['stars', 'forks', 'updated'] as const).map(s => (
            <button key={s} className="btn btn-sm" onClick={() => setSortBy(s)}
              style={{ backgroundColor: sortBy === s ? 'var(--accent-blue)' : 'var(--bg-secondary)', color: sortBy === s ? '#fff' : 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
              {s === 'stars' && <TrendingUp size={14} className="me-1" />}
              {s === 'stars' ? 'Звёзды' : s === 'forks' ? 'Форки' : 'Обновлён'}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center p-5"><div className="spin" style={{ width: 40, height: 40, border: '3px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>
      ) : searchRepoResult?.items ? (
        <><div className="row">{searchRepoResult.items.map(r => <div key={r.id} className="col-12"><RepoCard repo={r} /></div>)}</div>
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} /></>
      ) : (
        <div className="text-center p-5" style={{ color: 'var(--text-secondary)' }}><Package size={48} style={{ opacity: 0.3, marginBottom: 16 }} /><p>Введите запрос для поиска репозиториев</p></div>
      )}
    </div>
  )
}
