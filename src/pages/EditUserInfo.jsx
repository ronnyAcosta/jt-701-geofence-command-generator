import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';

import { loadGeofences } from '../actions/geofencesActions';
import { logout, updateUserName } from '../actions/authAction';
import { error, showMessage } from '../helpers/helpers';

import { updateProfile, updatePassword, deleteUser } from 'firebase/auth';
import { auth, db } from '../firebase/config-firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

const EditUserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = auth.currentUser;

  const [userInfo, setUserInfo] = useState({
    userName: user.displayName,
    newPassword: '',
    confirmNewPassword: ''
  })
  const {userName, newPassword, confirmNewPassword} = userInfo;
  
  const handleChange = (e) =>{
    e.target.nextSibling.nextSibling.style.display = 'none';
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }
  
  const handleFocus = (e) => e.target.previousElementSibling.style.color = '#07bcff';

  const handleBlur = (e) =>{
    e.target.previousElementSibling.style.color = '#000';
    e.target.style.borderBottom = '1px solid #9e9e9e';
    e.target.nextSibling.style.color = '#9e9e9e';
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const validator = { confirm: true };
    
    if(newPassword.length >= 8){
      if(confirmNewPassword === newPassword){
        await updatePassword(user, newPassword).catch((error)=> {console.log(error)});

      } else {
        error('#confirmNewPassword');
        validator.confirm = false;
      }  
    } else if(newPassword.length > 0){
      error('#newPassword');
      validator.confirm = false;
    }

    if(userName.length < 3 || userName.length > 20){
      error('#userName');

    } else if(validator.confirm){
      await updateProfile(user, {displayName: userName})
        .then( () => { 
          dispatch(updateUserName(user.uid, user.displayName));
          
          setUserInfo({
            userName: user.displayName,
            newPassword: '',
            confirmNewPassword: ''
          }); 

          showMessage('#dataUpdated');
        })
        .catch((error) => console.log(error));
    }
  }

  const handleDelete = async () =>{
    const geofencesCollectionRef = collection(db, `users/${user.uid}/geofences`);

    if(window.confirm("Are you sure you want to delete your account?")){
      const geofencesSnapshot = await getDocs(geofencesCollectionRef);

      geofencesSnapshot.docs.map(async (geofDoc)=> await deleteDoc(geofDoc.ref));

      await deleteDoc(doc(db, `users/${user.uid}`)).catch((error)=>console.log(error));

      await deleteUser(user).then(()=> dispatch(logout()))
      .catch((error)=>{ console.log(error )})
    }
  }

  const handleBack = () => {
    dispatch(loadGeofences());
    navigate('/');
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
                <div className='center error-message'>Min lenght: 3  |  Max lenght: 20</div>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input id="newPassword" name='newPassword' type="password" className="validate" onBlur={handleBlur} onFocus={handleFocus} value={newPassword} onChange={handleChange} />
                <label htmlFor="newPassword">New password</label>
                <div className='center error-message'>Min lenght: 8</div>
              </div>
              <div className="input-field col s12">
                <i className="material-icons prefix">vpn_key</i>
                <input id="confirmNewPassword" name='confirmNewPassword' type="password" className="validate" onBlur={handleBlur} onFocus={handleFocus} value={confirmNewPassword} onChange={handleChange} />
                <label htmlFor="confirmNewPassword">Confirm new password</label>
                <div className='center error-message'>Password do not match</div>
              </div>
              <button type='submit' className='btn col s12 blue waves-effect waves-light'>Submit</button>
            </div>
            <hr />
            <br />        
          </form>
          <button onClick={handleBack} className='btn col s5  waves-effect waves-light'>Go Back</button>
          <button onClick={handleDelete} className='btn col s5 offset-s2 red waves-effect waves-light'>Delete Account</button>  
        </div>
        <div id='dataUpdated' className='center'>Data updated successfully</div>
      </div>
    </>
  )
}

export default EditUserInfo;