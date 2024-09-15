import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/config-firebase';
import { showMessage } from '../helpers/helpers';

const RestorePassword = () => {

  const [email, setEmail] = useState('')
  
  const handleChange = (e) => setEmail(e.target.value);
  

  const handleSubmit = async (e) =>{
    e.preventDefault()

    await sendPasswordResetEmail(auth, email)
      .then(() => showMessage('#emailSent'))
      .catch((error)=>{
        console.log(error)
      })
  }

  const handleFocus = (e) => e.target.previousElementSibling.style.color = '#07bcff';

  const handleBlur = (e) => e.target.previousElementSibling.style.color = '#000';
  
  return (
    <>
      <h1 className='title'>JT701 - Geofence Commands Generator</h1>
      <div className='container '>
        <h3>Reset Password</h3>
        <div className="divider"></div>
        <div className="row container">
          <form className="col s12" method='post' onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">email</i>
                <input id="email" name='email' type="email" className="validate" value={email} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} />
                <label htmlFor="email">Email</label>
              </div>
              
              <button type='submit' className='btn col s12 blue waves-effect waves-light'>Reset</button>
            </div>
            <hr />
            <br />
            <Link to="/register" className='col s12'>Register</Link>
            <Link to='/login'className='col s12' >Login</Link>
          </form>
          <div id='emailSent' className='center'>Password reset email sent</div>
          <div id='invalidCredentials' className='center'>Email is not registered</div>
        </div>
      </div>
    </>
  )
}

export default RestorePassword