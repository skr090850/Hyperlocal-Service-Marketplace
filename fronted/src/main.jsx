import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Pages/UserPannel/UserPannel.css';
import './Pages/ProviderPannel/ProviderPannel.css';
import App from './App.jsx'
import './App.css'

createRoot(document.getElementById('root')).render(
    <App />
)
