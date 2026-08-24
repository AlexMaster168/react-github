import { useGithub } from '../context/GithubContext'
import { Search } from '../components/Search'
import { UserGrid } from '../components/UserGrid'
import { Pagination } from '../components/Pagination'
import { Users, Search as SearchIcon } from 'lucide-react'

export const HomePage = () => {
  const { users, searchResult, page, totalPages, searchUsers, loading } = useGithub()

  const handlePageChange = (newPage: number) => {
    const input = document.querySelector('input[type="text"]') as HTMLInputElement
    if (input?.value) searchUsers(input.value, newPage)
  }

  return (
    <div className="fade-in">
      <div className="text-center mb-4">
        <h1 className="d-flex align-items-center justify-content-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Users size={32} /> Поиск пользователей
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Найдите любого пользователя GitHub по имени или нику</p>
      </div>
      <Search mode="users" />
      {searchResult && <div className="mb-3" style={{ color: 'var(--text-secondary)' }}>Найдено: {searchResult.total_count.toLocaleString()} пользователей</div>}
      {loading ? (
        <div className="d-flex justify-content-center p-5"><div className="spin" style={{ width: 40, height: 40, border: '3px solid var(--border-color)', borderTopColor: 'var(--accent-blue)', borderRadius: '50%' }} /></div>
      ) : users.length > 0 ? (
        <><UserGrid users={users} /><Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} /></>
      ) : (
        <div className="text-center p-5" style={{ color: 'var(--text-secondary)' }}><SearchIcon size={48} style={{ opacity: 0.3, marginBottom: 16 }} /><p>Введите ник для поиска</p></div>
      )}
    </div>
  )
}
