import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { register } from '../actions/authAction';
import { Link } from 'react-router-dom';

import { error } from '../helpers/helpers';

const RegisterScreen = () => {
  
  const dispatch = useDispatch();

  const [userRegister, setUserRegister] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const {userName, email, password, confirmPassword} = userRegister;
  
  const handleChange = (e) =>{
    e.target.nextSibling.nextSibling.style.display = 'none';
    setUserRegister({
      ...userRegister,
      [e.target.name]: e.target.value
    })
  }

  const handleFocus = (e) => e.target.previousElementSibling.style.color = '#07bcff';

  const handleBlur = (e) =>{
    e.target.previousElementSibling.style.color = '#000'
    e.target.style.borderBottom = '1px solid #9e9e9e'
    e.target.nextSibling.style.color = '#9e9e9e'
  }
  
  const handleRegister = (e) =>{
    e.preventDefault()

    const validator = { confirm: true };
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(userName.length < 3 || userName.length > 20){
      error('#userName')
      validator.confirm = false;
    }

    if(emailRegex.test(email) === false){
      error('#email')
      validator.confirm = false;
    }

    if(password.length < 8){
      error('#password');
      validator.confirm = false;
    } else if(confirmPassword !== password){
        error('#confirmPassword');
        validator.confirm = false;
      }

    if(validator.confirm === true){
      dispatch(register(userName, email, password))
    }
  }
  
  return (
    <>
      <h1 className='title'>JT701 - Geofence Commands Generator</h1>
      <div className='container'>
        <h3>Register</h3>
        <div className="divider"></div>
        <br />
        <div className="row container">
          <form className="col s12" method='post' onSubmit={handleRegister}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input id="userName" name='userName' type="text" className="validate" value={userName} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} />
                <label htmlFor="userName">User Name</label>
                <div className='center error-message'>Min lenght: 3  |  Max lenght: 20</div>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input id="email" name='email' type="text" className="validate" value={email} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} />
                <label htmlFor="email">Email</label>
                <div className='center error-message'>Invalid email</div>
                <div id='duplicatedEmail' className='center'>Email is alredy in use</div>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input id="password" name='password' type="password" className="validate" onBlur={handleBlur} onFocus={handleFocus} value={password} onChange={handleChange}  />
                <label htmlFor="password">Password</label>
                <div className='center error-message'>Min lenght: 8</div>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input id="confirmPassword" name='confirmPassword' type="password" className="validate" onBlur={handleBlur} onFocus={handleFocus} value={confirmPassword} onChange={handleChange}  />
                <label htmlFor="confirmPassword">Confirm password</label>
                <div className='center error-message'>Password do not match</div>
              </div>
              <button type='submit' className='btn col s12 blue waves-effect waves-light'>Register</button>
            </div>
            <hr />
            <Link to="/login">Login into account</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterScreen;