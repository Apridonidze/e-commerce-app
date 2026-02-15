import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import AppRouter from '../router/AppRouter'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <CookiesProvider>
      <AppRouter />
    </CookiesProvider>

  </StrictMode>,
)
