import { useAlert } from '../context/AlertContext'
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react'

export const Alert = () => {
  const { alert, hide } = useAlert()
  if (!alert) return null

  const icons = {
    danger: <XCircle size={18} />,
    success: <CheckCircle size={18} />,
    warning: <AlertTriangle size={18} />,
    info: <Info size={18} />
  }

  const colors = {
    danger: { bg: '#f8514922', border: '#f85149', text: '#f85149' },
    success: { bg: '#3fb95022', border: '#3fb950', text: '#3fb950' },
    warning: { bg: '#d2992222', border: '#d29922', text: '#d29922' },
    info: { bg: '#58a6ff22', border: '#58a6ff', text: '#58a6ff' }
  }

  const c = colors[alert.type]

  return (
    <div className="fade-in d-flex align-items-center justify-content-between p-3 rounded mb-3"
      style={{ backgroundColor: c.bg, border: `1px solid ${c.border}`, color: c.text }} role="alert">
      <div className="d-flex align-items-center gap-2">
        {icons[alert.type]}
        {alert.text}
      </div>
      <button type="button" className="btn-close" aria-label="Close" onClick={hide}
        style={{ filter: 'invert(1)', opacity: 0.7 }} />
    </div>
  )
}
