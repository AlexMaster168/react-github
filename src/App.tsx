import { Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Alert } from './components/Alert'
import { GithubProvider } from './context/GithubContext'
import { AlertProvider } from './context/AlertContext'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { RepoPage } from './pages/RepoPage'
import { ReposPage } from './pages/ReposPage'
import { AboutPage } from './pages/AboutPage'

export const App = () => {
  return (
    <GithubProvider>
      <AlertProvider>
        <Navbar />
        <main className="container py-4" style={{ minHeight: 'calc(100vh - 56px)' }}>
          <Alert />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/repos" element={<ReposPage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/repo/:owner/:name" element={<RepoPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="py-3 text-center" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <div className="container">GitHub Explorer v2.0.0 | Powered by GitHub API</div>
        </footer>
      </AlertProvider>
    </GithubProvider>
  )
}
