import React, { useState } from 'react'

import { useDispatch } from 'react-redux';
import { register } from '../actions/authAction';
import { Link } from 'react-router-dom';


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
    e.target.nextSibling.nextSibling.style.display = 'none'
    setUserRegister({
      ...userRegister,
      [e.target.name]: e.target.value
    })
  }

  const handleFocus = (e) =>{
    e.target.previousElementSibling.style.color = '#07bcff'
  }

  const handleBlur = (e) =>{
    e.target.previousElementSibling.style.color = '#000'
    e.target.style.borderBottom = '1px solid #9e9e9e'
    e.target.nextSibling.style.color = '#9e9e9e'
  }
  
  const handleRegister = (e) =>{
    e.preventDefault()
    const validator = {
      confirm: true
    };
    
    const error = (prop) =>{
      document.querySelector(prop).previousElementSibling.style.color = 'red'
      document.querySelector(prop).style.borderBottom = '2px solid red';
      document.querySelector(prop).nextSibling.style.color = 'red';
      document.querySelector(prop).nextSibling.nextSibling.style.display = 'block';
      validator.confirm = false;
      console.log(validator)
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(userName.length < 3){
      error('#userName')
    }

    if(emailRegex.test(email) === false){
      error('#email')
    }
    if(password.length < 8){
      error('#password');
    } else if(confirmPassword !== password){
        error('#confirmPassword');
      }

    if(validator.confirm === true){
      console.log(userRegister)
      dispatch(register(userName, email, password))
    }
  }
  
  return (
    <>
      <h1 className='title'>JT701 - Geofence Commands Generator</h1>
      <div className='container'>
        <h3>Register</h3>
        <div className="divider"></div>
        <div className="row container">
          <form className="col s12" method='post' onSubmit={handleRegister}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input id="userName" name='userName' type="text" className="validate" value={userName} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} />
                <label htmlFor="userName">User Name</label>
                <div className='center error-message'>Min lenght: 3</div>
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
                <div className='center error-message'>Wrong Password</div>
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

export default RegisterScreen