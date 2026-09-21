import { useState } from 'react'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config-firebase';
import FormField from '../components/input/FormField';
import { toast } from 'sonner';
import Title from '../components/layout/Title';

const RestorePasswordPage = () => {

  const [email, setEmail] = useState('');

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) =>{
    e.preventDefault();

    await sendPasswordResetEmail(auth, email)
      .then(() => toast.success("Password reset email sent"))
      .catch((e)=> toast.error("Error sending password reset email"));
  }

  return (
    <>
      <Title />

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
        </div>
      </div>
    </>
  )
}

export default RestorePasswordPage;
