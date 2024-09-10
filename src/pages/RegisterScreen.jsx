import React, { useState } from 'react'

const RegisterScreen = () => {
  const [userRegister, setUserRegister] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const {name, lastName, email, password, confirmPassword} = userRegister;
  
  const handleRegister = (e) =>{
    setUserRegister({
      ...userRegister,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(userRegister)
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
      <div className='container'>
        <h3>Register</h3>
        <div className="divider"></div>
        <div className="row container">
          <form className="col s12" method='post' onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">person</i>
                <input id="userName" name='userName' type="text" className="validate" value={name} onBlur={handleBlur} onFocus={handleFocus} onChange={handleRegister} />
                <label htmlFor="userName">User Name</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input id="email" name='email' type="email" className="validate" value={email} onBlur={handleBlur} onFocus={handleFocus} onChange={handleRegister} />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input id="password" name='password' type="password" className="validate" onBlur={handleBlur} onFocus={handleFocus} value={password} onChange={handleRegister} />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input id="confirmPassword" name='confirmPassword' type="password" className="validate" onBlur={handleBlur} onFocus={handleFocus} value={confirmPassword} onChange={handleRegister} />
                <label htmlFor="confirmPassword">Confirm password</label>
              </div>
              <button type='submit' className='btn col s12 blue waves-effect waves-light'>Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterScreen