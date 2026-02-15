import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <CookiesProvider>


    </CookiesProvider>

  </StrictMode>,
)
