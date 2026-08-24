import { Github, Heart, ExternalLink } from 'lucide-react'

export const AboutPage = () => {
  return (
    <div className="fade-in">
      <div className="text-center mb-4">
        <Github size={64} style={{ color: 'var(--accent-blue)' }} />
        <h1 className="mt-3" style={{ color: 'var(--text-primary)' }}>
          GitHub Explorer
        </h1>
        <p className="lead" style={{ color: 'var(--text-secondary)' }}>
          Мощный инструмент для исследования GitHub
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div
            className="p-4 rounded-lg h-100"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            <h5 style={{ color: 'var(--text-primary)' }}>Поиск пользователей</h5>
            <p style={{ color: 'var(--text-secondary)' }}>
              Ищите пользователей по нику, имени или описанию. Просматривайте профили,
              репозитории и активность.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="p-4 rounded-lg h-100"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            <h5 style={{ color: 'var(--text-primary)' }}>Поиск репозиториев</h5>
            <p style={{ color: 'var(--text-secondary)' }}>
              Находите репозитории по темам, языкам программирования и другим критериям.
              Просматривайте статистику и контент.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="p-4 rounded-lg h-100"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            <h5 style={{ color: 'var(--text-primary)' }}>Просмотр контента</h5>
            <p style={{ color: 'var(--text-secondary)' }}>
              Читайте README, просматривайте файловую структуру, issues, pull requests
              и многое другое.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="p-4 rounded-lg h-100"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            <h5 style={{ color: 'var(--text-primary)' }}>Возможности</h5>
            <ul style={{ color: 'var(--text-secondary)' }}>
              <li>Поиск пользователей и репозиториев</li>
              <li>Просмотр профилей и статистики</li>
              <li>Issues, Pull Requests, Commits</li>
              <li>Файловый проводник с просмотром кода</li>
              <li>Релизы и ветки</li>
              <li>Контрибьюторы и языки</li>
              <li>README с подсветкой синтаксиса</li>
              <li>Тёмная и светлая темы</li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="p-4 rounded-lg h-100"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            <h5 style={{ color: 'var(--text-primary)' }}>Технологии</h5>
            <ul style={{ color: 'var(--text-secondary)' }}>
              <li>React 19 + TypeScript</li>
              <li>Vite</li>
              <li>Bootstrap 5</li>
              <li>GitHub REST API v3</li>
              <li>React Router v7</li>
              <li>React Markdown</li>
              <li>Lucide Icons</li>
              <li>Firebase Hosting</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <p style={{ color: 'var(--text-secondary)' }}>
          Сделано с <Heart size={14} className="mx-1" style={{ color: 'var(--accent-red)' }} /> для GitHub
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Версия 2.0.0 | Использует GitHub REST API
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="d-inline-flex align-items-center gap-1"
          style={{ color: 'var(--accent-blue)' }}
        >
          GitHub <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
