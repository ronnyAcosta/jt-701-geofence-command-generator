import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Routes  } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PublicRoutes from './PublicRoutes';
import PrivateRoute from './PrivateRoute';

import LoginPage from '../pages/LoginPage';
import AppMainPage from '../pages/AppMainPage';
import RegisterPage from '../pages/RegisterPage';
import EditUserPage from '../pages/EditUserPage';
import RestorePasswordPage from '../pages/RestorePasswordPage';
import SetMapPage from '../pages/SetMapPage';

import { auth } from '../firebase/config-firebase';
import { onAuthStateChanged } from 'firebase/auth';

import { login } from '../actions/authAction';
import { loadGeofences } from '../actions/geofencesActions';
import { loadCenterPoint } from '../actions/centerPointSetterAction';

const AppRouter = () => {
  const dispatch = useDispatch()
  
  const [log, setLog] = useState(false)

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(login(user.uid, user.displayName))
      dispatch(loadGeofences())
      dispatch(loadCenterPoint())
      setLog(true)
    } else {
      setLog(false);
    }
  })

  return () => unsubscribe();
}, [dispatch])
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PrivateRoute log={log} component={AppMainPage} /> } />
        <Route exact path='/edit' element={<PrivateRoute log={log} component={EditUserPage} /> } />
        <Route exact path='/set-map-location' element={<PrivateRoute log={log} component={SetMapPage} /> } />     
        <Route exact path='/login' element={<PublicRoutes log={log} component={LoginPage} /> } /> 
        <Route exact path='/register' element={<PublicRoutes log={log} component={RegisterPage} /> } />
        <Route exact path='/restore' element={<PublicRoutes log={log} component={RestorePasswordPage} /> } />      
      </Routes>
    </Router>)
      

}
export default AppRouter;