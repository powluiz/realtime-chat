import { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { AuthContext } from '../AuthContext'
import { IProtectedRouteProps, IRouteManagerProps } from './types'

const ProtectedRoute = ({ routeElement }: IProtectedRouteProps) => {
  const { authenticated } = useContext(AuthContext)

  if (!authenticated) {
    return <Navigate to={'/login'} replace />
  }
  return routeElement
}

const RouteManager = ({ routes }: IRouteManagerProps) => {
  return (
    <Routes>
      {routes?.map((route, index) => (
        <Route
          key={`app-route-${index}`}
          path={route?.path}
          element={
            route?.protected ? (
              <ProtectedRoute routeElement={route?.element} />
            ) : (
              route?.element
            )
          }
        />
      ))}
    </Routes>
  )
}

export default RouteManager
