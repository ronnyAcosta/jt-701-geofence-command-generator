import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import FormField from '../components/FormField';
import Toast from '../components/Toast';

import { loadGeofences } from '../actions/geofencesActions';
import { logout, updateUserName } from '../actions/authAction';

import { updateProfile, updatePassword, deleteUser } from 'firebase/auth';
import { auth, db } from '../firebase/config-firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

const initialFieldState = { error: false, message: false };

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

  const [fields, setFields] = useState({
    userName: { ...initialFieldState },
    newPassword: { ...initialFieldState },
    confirmNewPassword: { ...initialFieldState },
  });

  const [showDataUpdated, setShowDataUpdated] = useState(false);

  const setFieldError = (name, error) =>
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], error, message: error } }));

  const clearFieldErrorColor = (name) =>
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], error: false } }));

  const clearFieldMessage = (name) =>
    setFields((prev) => ({ ...prev, [name]: { ...prev[name], message: false } }));

  const handleChange = (e) =>{
    clearFieldMessage(e.target.name);
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const validator = { confirm: true };

    if(newPassword.length >= 8){
      if(confirmNewPassword === newPassword){
        await updatePassword(user, newPassword).catch((error)=> {console.log(error)});

      } else {
        setFieldError('confirmNewPassword', true);
        validator.confirm = false;
      }
    } else if(newPassword.length > 0){
      setFieldError('newPassword', true);
      validator.confirm = false;
    }

    if(userName.length < 3 || userName.length > 20){
      setFieldError('userName', true);

    } else if(validator.confirm){
      await updateProfile(user, {displayName: userName})
        .then( () => {
          dispatch(updateUserName(user.uid, user.displayName));

          setUserInfo({
            userName: user.displayName,
            newPassword: '',
            confirmNewPassword: ''
          });

          setShowDataUpdated(true);
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
              <FormField
                icon="account_circle"
                id="userName"
                name="userName"
                label="User name"
                value={userName}
                onChange={handleChange}
                onBlurClearError={() => clearFieldErrorColor('userName')}
                hasError={fields.userName.error}
                showErrorMessage={fields.userName.message}
                errorMessage="Min lenght: 3  |  Max lenght: 20"
              />
              <FormField
                icon="vpn_key"
                id="newPassword"
                name="newPassword"
                type="password"
                label="New password"
                value={newPassword}
                onChange={handleChange}
                onBlurClearError={() => clearFieldErrorColor('newPassword')}
                hasError={fields.newPassword.error}
                showErrorMessage={fields.newPassword.message}
                errorMessage="Min lenght: 8"
              />
              <FormField
                icon="vpn_key"
                id="confirmNewPassword"
                name="confirmNewPassword"
                type="password"
                label="Confirm new password"
                value={confirmNewPassword}
                onChange={handleChange}
                onBlurClearError={() => clearFieldErrorColor('confirmNewPassword')}
                hasError={fields.confirmNewPassword.error}
                showErrorMessage={fields.confirmNewPassword.message}
                errorMessage="Password do not match"
              />
              <button type='submit' className='btn col s12 blue waves-effect waves-light'>Submit</button>
            </div>
            <hr />
            <br />
          </form>
          <button onClick={handleBack} className='btn col s5  waves-effect waves-light'>Go Back</button>
          <button onClick={handleDelete} className='btn col s5 offset-s2 red waves-effect waves-light'>Delete Account</button>
        </div>
        <Toast
          id="dataUpdated"
          message="Data updated successfully"
          show={showDataUpdated}
          onHide={() => setShowDataUpdated(false)}
        />
      </div>
    </>
  )
}

export default EditUserInfo;
