import React, { useState } from 'react'


const LoginScreen = () => {
  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })
  const {email, password} = userLogin;
  
  const handleLogin = (e) =>{
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault()
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
        <div className="row container">
          <form className="col s12" method='post' onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input id="email" name='email' type="email" className="validate" value={email} onBlur={handleBlur} onFocus={handleFocus} onChange={handleLogin} />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input id="password" name='password' type="password" className="validate" onBlur={handleBlur} onFocus={handleFocus} value={password} onChange={handleLogin} />
                <label htmlFor="password">Password</label>
              </div>
              <button type='submit' className='btn col s12 blue waves-effect waves-light'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginScreen