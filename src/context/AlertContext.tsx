import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface AlertState {
  text: string
  type: 'success' | 'danger' | 'warning' | 'info'
}

interface AlertContextType {
  alert: AlertState | null
  show: (text: string, type?: AlertState['type']) => void
  hide: () => void
}

export const AlertContext = createContext<AlertContextType>({
  alert: null,
  show: () => {},
  hide: () => {}
})

export const useAlert = () => useContext(AlertContext)

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alert, setAlert] = useState<AlertState | null>(null)

  const show = useCallback((text: string, type: AlertState['type'] = 'danger') => {
    setAlert({ text, type })
  }, [])

  const hide = useCallback(() => {
    setAlert(null)
  }, [])

  return (
    <AlertContext.Provider value={{ alert, show, hide }}>
      {children}
    </AlertContext.Provider>
  )
}
