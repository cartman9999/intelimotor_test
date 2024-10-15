import { createContext, useContext, ReactNode } from 'react'

interface EnvContextProps {
  apiUrl: string
  appName: string
}

const EnvContext = createContext<EnvContextProps | undefined>(undefined)

export const EnvProvider = ({ children }: { children: ReactNode }) => {
  const apiUrl = import.meta.env.VITE_API_URL || ''
  const appName = import.meta.env.VITE_APP_NAME || ''

  return (
    <EnvContext.Provider value={{ apiUrl, appName }}>
      {children}
    </EnvContext.Provider>
  )
}

export const useEnv = () => {
  const context = useContext(EnvContext)
  if (!context) {
    throw new Error('useEnv must be used inside EnvProvider')
  }
  return context
}
