import { useState, useCallback, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { Moon, Sun, Github, Search, Package, Info, Menu, X } from 'lucide-react'

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const collapseRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && collapseRef.current && !collapseRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link d-flex align-items-center gap-2 py-2 ${isActive ? 'active' : ''}`

  return (
    <nav className="navbar sticky-top" style={{
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      zIndex: 1030
    }}>
      <div className="container-xxl px-3">
        <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2 m-0" style={{ color: 'var(--text-primary)' }}>
          <Github size={28} />
          <span className="fw-bold d-none d-sm-inline">GitHub Explorer</span>
          <span className="fw-bold d-sm-none">GH</span>
        </NavLink>

        <button
          className="navbar-toggler border-0 p-2"
          type="button"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          style={{ color: 'var(--text-primary)', fontSize: '1.25rem' }}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div
          ref={collapseRef}
          className={`navbar-collapse ${isOpen ? 'show' : ''}`}
          style={{
            ...(isOpen
              ? { display: 'block', position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '12px 16px', zIndex: 1029, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }
              : { display: 'none' })
          }}
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" end className={navLinkClass} style={{ color: 'var(--text-secondary)' }}>
                <Search size={18} /> Поиск
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/repos" className={navLinkClass} style={{ color: 'var(--text-secondary)' }}>
                <Package size={18} /> Репозитории
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={navLinkClass} style={{ color: 'var(--text-secondary)' }}>
                <Info size={18} /> О проекте
              </NavLink>
            </li>
          </ul>
          <button onClick={toggleTheme} className="btn d-flex align-items-center gap-2 w-100 w-lg-auto"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', backgroundColor: 'transparent', padding: '8px 12px' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            {theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
          </button>
        </div>
      </div>
    </nav>
  )
}
