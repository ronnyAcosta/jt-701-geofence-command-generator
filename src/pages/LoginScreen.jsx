import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginWithEmail, googleLoginWithPopUp } from '../actions/authAction';
import GoogleButton from 'react-google-button';

const LoginScreen = () => {

  const dispatch = useDispatch();

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })
  const {email, password} = userLogin;
  
  const handleChange = (e) =>{
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    dispatch(loginWithEmail(email, password));
    console.log(userLogin)
  }
  const handleFocus = (e) =>{
    e.target.previousElementSibling.style.color = '#07bcff'
  }

  const handleBlur = (e) =>{
    e.target.previousElementSibling.style.color = '#000'
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
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input id="email" name='email' type="email" className="validate" value={email} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input id="password" name='password' type="password" className="validate" onBlur={handleBlur} onFocus={handleFocus} value={password} onChange={handleChange} />
                <label htmlFor="password">Password</label>
              </div>
              <button type='submit' className='btn col s12 blue waves-effect waves-light'>Login</button>
            </div>
            <hr />
            <br />
            {/* <GoogleButton onClick={()=>{googleLoginWithRedirect()}} /> */}
            <GoogleButton onClick={()=>{dispatch(googleLoginWithPopUp())}} />
            <br />
            <Link to="/register" className='col s12'>Register</Link>
            <Link to='/restore' className='col s12' >Forgot Password</Link>
          </form>
          <div id='invalidCredentials' className='center'>Invalid email or password</div>
        </div>
      </div>
    </>
  )
}

export default LoginScreen