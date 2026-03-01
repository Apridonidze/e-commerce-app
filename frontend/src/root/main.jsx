import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import AppRouter from '../router/AppRouter'
import { UserProvider } from '../context/UserContext'
import StripeProvider from '../stripe/StripeProvider'
import { ProductProvider } from '../context/ProductContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <CookiesProvider>
      <StripeProvider>
          <UserProvider>
            <ProductProvider>
              <AppRouter />
            </ProductProvider>
          </UserProvider>
      </StripeProvider>
    </CookiesProvider>

  </StrictMode>,
)
