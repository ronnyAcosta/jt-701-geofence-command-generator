import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginScreen from '../pages/LoginScreen';
import AppScreen from '../pages/AppScreen';
import RegisterScreen from '../pages/RegisterScreen';
import NavBar from '../components/NavBar';

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginScreen />,
    },
    {
      path: '/register',
      element: <RegisterScreen />,
    },
    {
      path: '/',
      element: <AppScreen />
    }
  ])
  
  
  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter