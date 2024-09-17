import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import init from '../helpers/init';
import { reloadGeofences } from '../actions/geofencesActions';

const EditUserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state)=> state.auth)

  const [userInfo, setUserInfo] = useState({
    userName: user.displayName,
    newPassword: '',
    confirmNewPassword: ''
  })
  const {userName, newPassword} = userInfo;
  
  const handleChange = (e) =>{
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }
  

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log("userInfo")
  }
  const handleBack = () => {
    dispatch(reloadGeofences());
    navigate('/');
  }

  const handleFocus = (e) =>{
    e.target.previousElementSibling.style.color = '#07bcff'
  }

  const handleBlur = (e) =>{
    e.target.previousElementSibling.style.color = '#000'
  }
  return (
    <>
      <NavBar />
      <div className='container '>
        <h3>Edit user info</h3>
        <div className="divider"></div>
        <br />
        <div className="row container">
          <form className="col s12" method='post' onSubmit={handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input id="userName" name='userName' type="text" className="validate active" value={userName} onBlur={handleBlur} onFocus={handleFocus} onChange={handleChange} />
                <label htmlFor="userName">User name</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input id="newPassword" name='newPassword' type="password" className="validate" onBlur={handleBlur} onFocus={handleFocus} value={newPassword} onChange={handleChange} />
                <label htmlFor="newPassword">New password</label>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input id="confirmNewPassword" name='confirmNewPassword' type="password" className="validate" onBlur={handleBlur} onFocus={handleFocus} value={newPassword} onChange={handleChange} />
                <label htmlFor="confirmNewPassword">Confirm new password</label>
              </div>
              <button type='submit' className='btn col s12 blue waves-effect waves-light'>Submit</button>
            </div>
            <hr />
            <br />        
          </form>
          <button onClick={handleBack} className='btn col s5  waves-effect waves-light'>Go Back</button>
          <button className='btn col s5 offset-s2 red waves-effect waves-light'>Delete Account</button>
          
        </div>
      </div>
    </>
  )
}

export default EditUserInfo