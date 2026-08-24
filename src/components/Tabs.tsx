import type { ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  icon?: ReactNode
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (id: string) => void
  children: ReactNode
}

export const Tabs = ({ tabs, activeTab, onTabChange, children }: TabsProps) => (
  <div>
    <div className="d-flex gap-1 mb-3 p-1 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', overflowX: 'auto' }}>
      {tabs.map(tab => (
        <button key={tab.id} className="btn d-flex align-items-center gap-1 px-3 py-2 rounded-md"
          onClick={() => onTabChange(tab.id)}
          style={{ backgroundColor: activeTab === tab.id ? 'var(--accent-blue)' : 'transparent', color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)', border: 'none', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && <span className="badge ms-1" style={{ backgroundColor: activeTab === tab.id ? 'rgba(255,255,255,0.2)' : 'var(--bg-tertiary)', color: activeTab === tab.id ? '#fff' : 'var(--text-secondary)', fontSize: '0.7rem' }}>{tab.count}</span>}
        </button>
      ))}
    </div>
    {children}
  </div>
)
