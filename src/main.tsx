import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { worker } from './api/browser.ts'

if(import.meta.env.DEV) {
  // Enable the mocking in development mode
  worker.start({
    onUnhandledRequest: 'bypass',
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
