import React from 'react'
import { Navigate } from 'react-router'

const PublicRoutes = ({log, component: Component}) => {
  return log?  <Navigate to='/' /> : <Component />
}

export default PublicRoutes