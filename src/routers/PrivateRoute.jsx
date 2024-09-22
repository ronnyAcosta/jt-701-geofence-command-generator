import React from 'react'
import { Navigate } from 'react-router'

const PrivateRoute = ({log, component: Component}) => {
  return log?  <Component /> : <Navigate to='/login' />
}

export default PrivateRoute;