import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes,  } from 'react-router-dom';
import LoginScreen from '../pages/LoginScreen';
import AppScreen from '../pages/AppScreen';
import RegisterScreen from '../pages/RegisterScreen';
import { auth } from '../firebase/config-firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/authAction';
import PublicRoutes from './PublicRoutes';
import PrivateRoute from './PrivateRoute';


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
  
  return (
    <Router>
      <Routes>
        <Route path='*' element={<PrivateRoute log={log} component={AppScreen} /> } />    
        <Route exact path='/login' element={<PublicRoutes log={log} component={LoginScreen} /> } /> 
        <Route exact path='/register' element={<PublicRoutes log={log} component={RegisterScreen} /> } />   
      </Routes>
    </Router>)
      

}
export default AppRouter