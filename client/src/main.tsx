import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'

import './index.css'

const appRoutes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {appRoutes?.map((route, index) => (
          <Route
            key={`app-route-${index}`}
            path={route?.path}
            element={route?.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
