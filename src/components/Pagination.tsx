interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null
  const pages: (number | string)[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 2 && i <= page + 2)) pages.push(i)
    else if (pages[pages.length - 1] !== '...') pages.push('...')
  }

  return (
    <nav className="d-flex justify-content-center mt-4">
      <ul className="pagination">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page - 1)} disabled={page === 1}
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>&laquo;</button>
        </li>
        {pages.map((p, i) => (
          <li key={i} className={`page-item ${p === page ? 'active' : ''} ${p === '...' ? 'disabled' : ''}`}>
            {p === '...' ? (
              <span className="page-link" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>...</span>
            ) : (
              <button className="page-link" onClick={() => onPageChange(p as number)}
                style={{ backgroundColor: p === page ? 'var(--accent-blue)' : 'var(--bg-secondary)', borderColor: p === page ? 'var(--accent-blue)' : 'var(--border-color)', color: '#fff' }}>{p}</button>
            )}
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(page + 1)} disabled={page === totalPages}
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>&raquo;</button>
        </li>
      </ul>
    </nav>
  )
}
