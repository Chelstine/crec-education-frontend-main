import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import axios from 'axios'

// ✅ SECURITY HARDENING Phase 2: Ensure all Axios requests send cookies (HttpOnly tokens)
axios.defaults.withCredentials = true;
createRoot(document.getElementById('root')!).render(
    <App />,
)
