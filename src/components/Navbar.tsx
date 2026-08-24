import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun, Github, Search, Package, Info } from 'lucide-react'

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)'
    }}>
      <div className="container">
        <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <Github size={28} />
          <span className="fw-bold">GitHub Explorer</span>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          style={{ borderColor: 'var(--border-color)' }}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link d-flex align-items-center gap-1">
                <Search size={16} /> Поиск
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/repos" className="nav-link d-flex align-items-center gap-1">
                <Package size={16} /> Репозитории
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link d-flex align-items-center gap-1">
                <Info size={16} /> О проекте
              </NavLink>
            </li>
          </ul>
          <button onClick={toggleTheme} className="btn btn-outline-secondary d-flex align-items-center gap-1"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Светлая' : 'Тёмная'}
          </button>
        </div>
      </div>
    </nav>
  )
}
