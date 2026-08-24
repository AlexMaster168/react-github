import { useState, useRef, useEffect } from 'react'
import { useGithub } from '../context/GithubContext'
import { useAlert } from '../context/AlertContext'
import { Search as SearchIcon, X, Loader2 } from 'lucide-react'
import { useDebounce } from '../hooks'

interface SearchProps {
  mode?: 'users' | 'repos'
}

export const Search = ({ mode = 'users' }: SearchProps) => {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { searchUsers, searchRepos, clearSearch } = useGithub()
  const { hide } = useAlert()
  const [loading, setLoading] = useState(false)
  const debouncedValue = useDebounce(value, 500)

  useEffect(() => {
    if (debouncedValue.trim().length >= 2) {
      setLoading(true)
      const search = mode === 'users' ? searchUsers : searchRepos
      search(debouncedValue.trim()).finally(() => setLoading(false))
    }
  }, [debouncedValue, mode, searchUsers, searchRepos])

  const handleClear = () => {
    setValue('')
    clearSearch()
    hide()
    inputRef.current?.focus()
  }

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center rounded-lg"
        style={{ backgroundColor: 'var(--bg-secondary)', border: `2px solid ${isFocused ? 'var(--accent-blue)' : 'var(--border-color)'}`, transition: 'border-color 0.2s', padding: '12px 16px' }}>
        <SearchIcon size={20} style={{ color: 'var(--text-secondary)', marginRight: 12 }} />
        <input ref={inputRef} type="text" className="form-control border-0 bg-transparent"
          placeholder={mode === 'users' ? 'Поиск пользователей GitHub...' : 'Поиск репозиториев...'}
          value={value} onChange={e => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          style={{ color: 'var(--text-primary)', backgroundColor: 'transparent', boxShadow: 'none' }} />
        {loading && <Loader2 size={18} className="spin" style={{ color: 'var(--text-secondary)' }} />}
        {value && !loading && (
          <button className="btn btn-sm p-0" onClick={handleClear} style={{ color: 'var(--text-secondary)' }}>
            <X size={18} />
          </button>
        )}
      </div>
      <small style={{ color: 'var(--text-secondary)' }}>Начните вводить для поиска</small>
    </div>
  )
}
