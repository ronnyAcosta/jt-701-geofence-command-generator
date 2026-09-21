import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginWithEmail, googleLoginWithPopUp } from '../actions/authAction';
import FormField from '../components/input/FormField';
import GoogleLogo from '../components/icons/GoogleLogo';
import AuthCard from '../components/layout/AuthCard';
import { toast } from 'sonner';

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
    <AuthCard
      title="Log in"
      subtitle="Access your geofences and generate commands for your JT701 tracker."
    >
      <form className="auth-form" method='post' onSubmit={handleSubmit}>
        <div className="row">
          <FormField
            icon="email"
            id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={handleChange}
            autoComplete="email"
          />
          <FormField
            icon="vpn_key"
            id="password"
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>

        <div className="auth-form-aside">
          <Link to="/restore" className="auth-link">Forgot password?</Link>
        </div>

        <button type='submit' className='btn auth-submit waves-effect waves-light'>Log in</button>
      </form>

      <div className="auth-divider"><span>or</span></div>

      <button
        type="button"
        className="auth-google"
        onClick={()=>{dispatch(googleLoginWithPopUp())}}
      >
        <GoogleLogo />
        Continue with Google
      </button>

      <p className="auth-footer">
        Don&apos;t have an account? <Link to="/register" className="auth-link">Create one</Link>
      </p>
    </AuthCard>
  )
}

export default LoginPage;
