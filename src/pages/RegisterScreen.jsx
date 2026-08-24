import { useState } from 'react'

import { useDispatch } from 'react-redux';
import { register } from '../actions/authAction';
import { Link } from 'react-router-dom';

import FormField from '../components/FormField';
import Toast from '../components/Toast';

const initialFieldState = { error: false, message: false };

const RegisterScreen = () => {

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

  const [showDuplicatedEmail, setShowDuplicatedEmail] = useState(false);

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
            setShowDuplicatedEmail(true);
          }
        });
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
              <FormField
                icon="person"
                id="userName"
                name="userName"
                label="User Name"
                value={userName}
                onChange={handleChange}
                onBlurClearError={() => clearFieldErrorColor('userName')}
                hasError={fields.userName.error}
                showErrorMessage={fields.userName.message}
                errorMessage="Min lenght: 3  |  Max lenght: 20"
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
                errorMessage="Invalid email"
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
                errorMessage="Min lenght: 8"
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
                errorMessage="Password do not match"
              />
              <button type='submit' className='btn col s12 blue waves-effect waves-light'>Register</button>
            </div>
            <hr />
            <Link to="/login">Login into account</Link>
          </form>
          <Toast
            id="duplicatedEmail"
            message="Email is alredy in use"
            show={showDuplicatedEmail}
            onHide={() => setShowDuplicatedEmail(false)}
          />
        </div>
      </div>
    </>
  )
}

export default RegisterScreen;
