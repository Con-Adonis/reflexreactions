import React from 'react'
import ReactDOM from 'react-dom/client'
// --- FIXED: Import without .tsx extension ---
import App from './App'
// --- This import is now recognized because of the .d.ts file ---
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
