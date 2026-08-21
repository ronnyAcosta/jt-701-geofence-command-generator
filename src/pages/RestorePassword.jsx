import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config-firebase';
import FormField from '../components/FormField';
import Toast from '../components/Toast';

const RestorePassword = () => {

  const [email, setEmail] = useState('');
  const [showEmailSent, setShowEmailSent] = useState(false);

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    await sendPasswordResetEmail(auth, email)
      .then(() => setShowEmailSent(true))
      .catch((error)=> console.log(error));
  }

  return (
    <>
      <h1 className='title'>JT701 - Geofence Commands Generator</h1>
      <div className='container '>
        <h3>Reset Password</h3>
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

              <button type='submit' className='btn col s12 blue waves-effect waves-light'>Reset</button>
            </div>
            <hr />
            <br />
            <Link to="/register" className='col s12'>Register</Link>
            <Link to='/login'className='col s12' >Login</Link>
          </form>
          <Toast
            id="emailSent"
            message="Password reset email sent"
            show={showEmailSent}
            onHide={() => setShowEmailSent(false)}
          />
        </div>
      </div>
    </>
  )
}

export default RestorePassword;
