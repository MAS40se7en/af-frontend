import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { Toaster } from 'sonner'
import Footer from './components/footer.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <App />
          <Footer />
          <Toaster />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
