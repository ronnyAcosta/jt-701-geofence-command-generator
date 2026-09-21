import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginWithEmail, googleLoginWithPopUp } from '../actions/authAction';
import GoogleButton from 'react-google-button';
import FormField from '../components/input/FormField';
import { toast } from 'sonner';
import Title from '../components/layout/Title';

const LoginPage = () => {

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
    e.preventDefault();
    dispatch(loginWithEmail(email, password))
      .catch((error) => {
        if(error.code === 'auth/invalid-credential'){
          toast.error("Invalid email or password");
        }
      });
  }

  return (
    <>
      <Title />

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
        </div>
      </div>
    </>
  )
}

export default LoginPage;
