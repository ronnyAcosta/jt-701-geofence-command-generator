import React, { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes  } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PublicRoutes from './PublicRoutes';
import PrivateRoute from './PrivateRoute';

import LoginScreen from '../pages/LoginScreen';
import AppScreen from '../pages/AppScreen';
import RegisterScreen from '../pages/RegisterScreen';
import EditUserInfo from '../pages/EditUserInfo';
import RestorePassword from '../pages/RestorePassword';

import { auth } from '../firebase/config-firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { login } from '../actions/authAction';
import { loadGeofences } from '../actions/geofencesActions';


const AppRouter = () => {
  const dispatch = useDispatch()
  
  const [log, setLog] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user){
        dispatch(login(user.uid, user.displayName))
        dispatch(loadGeofences())
        setLog(true)
      } else{
        setLog(false);
      }
    })
  
    
  }, [dispatch, log])
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PrivateRoute log={log} component={AppScreen} /> } />
        <Route exact path='/edit' element={<PrivateRoute log={log} component={EditUserInfo} /> } />    
        <Route exact path='/login' element={<PublicRoutes log={log} component={LoginScreen} /> } /> 
        <Route exact path='/register' element={<PublicRoutes log={log} component={RegisterScreen} /> } />
        <Route exact path='/restore' element={<PublicRoutes log={log} component={RestorePassword} /> } />      
      </Routes>
    </Router>)
      

}
export default AppRouter;