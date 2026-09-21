import { useState } from 'react'

import { useDispatch } from 'react-redux';
import { register } from '../actions/authAction';
import { Link } from 'react-router-dom';

import FormField from '../components/input/FormField';
import AuthCard from '../components/layout/AuthCard';
import { toast } from 'sonner';

const initialFieldState = { error: false, message: false };

const RegisterPage = () => {

  const dispatch = useDispatch();

  const [userRegister, setUserRegister] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const {userName, email, password, confirmPassword} = userRegister;

  const [fields, setFields] = useState({
    userName: { ...initialFieldState },
    email: { ...initialFieldState },
    password: { ...initialFieldState },
    confirmPassword: { ...initialFieldState },
  });

  const setFieldError = (name, error) =>
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], error, message: error } }));

  const clearFieldErrorColor = (name) =>
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], error: false } }));

  const clearFieldMessage = (name) =>
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], message: false } }));

  const handleChange = (e) =>{
    clearFieldMessage(e.target.name);
    setUserRegister({
      ...userRegister,
      [e.target.name]: e.target.value
    })
  }

  const handleRegister = (e) =>{
    e.preventDefault();

    const validator = { confirm: true };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(userName.length < 3 || userName.length > 20){
      setFieldError('userName', true);
      validator.confirm = false;
    }

    if(emailRegex.test(email) === false){
      setFieldError('email', true);
      validator.confirm = false;
    }

    if(password.length < 8){
      setFieldError('password', true);
      validator.confirm = false;
    } else if(confirmPassword !== password){
        setFieldError('confirmPassword', true);
        validator.confirm = false;
      }

    if(validator.confirm === true){
      dispatch(register(userName, email, password))
        .catch((error) => {
          if(error.code === 'auth/email-already-in-use'){
            toast.error("Email already in use");
          }
        });
    }
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Generate geofences and use the commands for your JT701 devices."
    >
      <form className="auth-form" method='post' onSubmit={handleRegister}>
        <div className="row">
          <FormField
            icon="person"
            id="userName"
            name="userName"
            label="User name"
            value={userName}
            onChange={handleChange}
            onBlurClearError={() => clearFieldErrorColor('userName')}
            hasError={fields.userName.error}
            showErrorMessage={fields.userName.message}
            errorMessage="Use between 3 and 20 characters"
            autoComplete="nickname"
          />
          <FormField
            icon="email"
            id="email"
            name="email"
            label="Email"
            value={email}
            onChange={handleChange}
            onBlurClearError={() => clearFieldErrorColor('email')}
            hasError={fields.email.error}
            showErrorMessage={fields.email.message}
            errorMessage="Enter a valid email address"
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
            onBlurClearError={() => clearFieldErrorColor('password')}
            hasError={fields.password.error}
            showErrorMessage={fields.password.message}
            errorMessage="Use at least 8 characters"
            autoComplete="new-password"
          />
          <FormField
            icon="vpn_key"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm password"
            value={confirmPassword}
            onChange={handleChange}
            onBlurClearError={() => clearFieldErrorColor('confirmPassword')}
            hasError={fields.confirmPassword.error}
            showErrorMessage={fields.confirmPassword.message}
            errorMessage="Passwords do not match"
            autoComplete="new-password"
          />
        </div>

        <button type='submit' className='btn auth-submit waves-effect waves-light'>Create account</button>
      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/login" className="auth-link">Log in</Link>
      </p>
    </AuthCard>
  )
}

export default RegisterPage;
