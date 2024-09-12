import React, { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginScreen from '../pages/LoginScreen';
import AppScreen from '../pages/AppScreen';
import RegisterScreen from '../pages/RegisterScreen';
import { auth } from '../firebase/config-firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authAction';


const AppRouter = () => {
  const dispatch = useDispatch()

  const [log, setLog] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        console.log('inicio sesión')
        dispatch(login(user.uid, user.displayName))
        setLog(true)
        console.log(log)
      } else{
        setLog(false);
        console.log(log)
      }
    })
  
    
  }, [dispatch, log])
  

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