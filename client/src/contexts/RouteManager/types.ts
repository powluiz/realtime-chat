import { ReactNode } from 'react'

export interface IProtectedRouteProps {
  routeElement: ReactNode
}

export interface IRouteProps {
  path: string
  element: ReactNode
  protected?: boolean
}

export interface IRouteManagerProps {
  routes: IRouteProps[]
}
