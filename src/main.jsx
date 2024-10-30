import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import News from './new.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './context/UserContext.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import TagForm from './Pages/Students/input.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
  <BrowserRouter>
  {/*
  <TagForm/>
*/}
<News />

  </BrowserRouter>
  </AuthProvider>
  </React.StrictMode>,
)
