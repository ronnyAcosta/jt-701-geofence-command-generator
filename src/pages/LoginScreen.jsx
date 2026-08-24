import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginWithEmail, googleLoginWithPopUp } from '../actions/authAction';
import GoogleButton from 'react-google-button';
import FormField from '../components/FormField';
import Toast from '../components/Toast';

const LoginScreen = () => {

  const dispatch = useDispatch();

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })
  const {email, password} = userLogin;

  const [showInvalidCredentials, setShowInvalidCredentials] = useState(false);

  const handleChange = (e) =>{
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(loginWithEmail(email, password))
      .catch((error) => {
        if(error.code === 'auth/invalid-credential'){
          setShowInvalidCredentials(true);
        }
      });
  }

  return (
    <>
      <h1 className='title'>JT701 - Geofence Commands Generator</h1>
      <div className='container '>
        <h3>Login</h3>
        <div className="divider"></div>
        <br />
        <div className="row container">
          <form className="col s12" method='post' onSubmit={handleSubmit}>
            <div className="row">
              <FormField
                icon="email"
                id="email"
                name="email"
                type="email"
                label="Email"
                value={email}
                onChange={handleChange}
              />
              <FormField
                icon="vpn_key"
                id="password"
                name="password"
                type="password"
                label="Password"
                value={password}
                onChange={handleChange}
              />
              <button type='submit' className='btn col s12 blue waves-effect waves-light'>Login</button>
            </div>
            <hr />
            <br />
            <GoogleButton onClick={()=>{dispatch(googleLoginWithPopUp())}} />
            <br />
            <Link to="/register" className='col s12'>Register</Link>
            <Link to='/restore' className='col s12' >Forgot Password</Link>
          </form>
          <Toast
            id="invalidCredentials"
            message="Invalid email or password"
            show={showInvalidCredentials}
            onHide={() => setShowInvalidCredentials(false)}
          />
        </div>
      </div>
    </>
  )
}

export default LoginScreen;
