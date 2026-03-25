import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import AppRouter from '../router/AppRouter'
import { UserProvider } from '../context/UserContext'
import StripeProvider from '../stripe/StripeProvider'
import { ProductProvider } from '../context/ProductContext'
import { ThemeProvider } from '../context/ThemeContext'
import '../styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <CookiesProvider>
      <StripeProvider>
          <UserProvider>
            <ProductProvider>
              <ThemeProvider>
                <AppRouter />
              </ThemeProvider>
            </ProductProvider>
          </UserProvider>
      </StripeProvider>
    </CookiesProvider>

  </StrictMode>,
)
