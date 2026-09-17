import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import NavBar from '../components/layout/NavBar';
import FormField from '../components/input/FormField';
import Toast from '../components/ui/Toast';

import { loadGeofences } from '../actions/geofencesActions';
import { logout, updateUserName, googleLoginWithPopUp } from '../actions/authAction';

import { updateProfile, updatePassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth, db } from '../firebase/config-firebase';
import { collection, deleteDoc, getDocs } from 'firebase/firestore';

const initialFieldState = { error: false, message: false };

const EditUserInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = auth.currentUser;

  // If the "password" provider is not present, the account was created with
  // Google only and there is no password to ask for or validate.
  const hasPasswordProvider = user.providerData.some(
    (provider) => provider.providerId === 'password'
  );

  const [userInfo, setUserInfo] = useState({
    userName: user.displayName,
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  })
  const {userName, currentPassword, newPassword, confirmNewPassword} = userInfo;

  const [fields, setFields] = useState({
    userName: { ...initialFieldState },
    currentPassword: { ...initialFieldState },
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

  // Password accounts: any save (username and/or password) requires the
  // current password to be entered and valid.
  const reauthenticateWithCurrentPassword = async () => {
    if(currentPassword.length === 0){
      setFieldError('currentPassword', true);
      return false;
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);

    try {
      await reauthenticateWithCredential(auth.currentUser, credential);
      return true;
    } catch (error) {
      console.log(error);
      setFieldError('currentPassword', true);
      return false;
    }
  }

  // Google-only accounts: there is no password to check, so a fresh Google
  // sign-in is used to satisfy Firebase's "recent login" requirement instead,
  // for both username and password changes.
  const reauthenticateWithGoogle = async () => {
    try {
      await dispatch(googleLoginWithPopUp());
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const wantsPasswordChange = newPassword.length > 0 || confirmNewPassword.length > 0;
    let passwordFieldsValid = true;

    if(wantsPasswordChange){
      if(newPassword.length >= 8){
        if(confirmNewPassword !== newPassword){
          setFieldError('confirmNewPassword', true);
          passwordFieldsValid = false;
        }
      } else {
        setFieldError('newPassword', true);
        passwordFieldsValid = false;
      }
    }

    const userNameValid = userName.length >= 3 && userName.length <= 20;
    if(!userNameValid){
      setFieldError('userName', true);
    }

    if(!passwordFieldsValid || !userNameValid) return;

    // Password accounts always need the current password to save any change.
    // Google-only accounts only need a fresh Google sign-in when they are
    // actually setting a new password, not for a plain username edit.
    const needsReauth = hasPasswordProvider || wantsPasswordChange;

    if(needsReauth){
      const reauthenticated = hasPasswordProvider
        ? await reauthenticateWithCurrentPassword()
        : await reauthenticateWithGoogle();

      if(!reauthenticated) return;
    }

    if(wantsPasswordChange){
      await updatePassword(auth.currentUser, newPassword).catch((error) => console.log(error));
    }

    // Read auth.currentUser fresh: a Google reauth may have refreshed the
    // user instance, so the "user" reference captured at render time can be stale.
    const currentUser = auth.currentUser;

    await updateProfile(currentUser, {displayName: userName})
      .then( () => {
        dispatch(updateUserName(currentUser.uid, currentUser.displayName));

        setUserInfo({
          userName: currentUser.displayName,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        });

        setShowDataUpdated(true);
      })
      .catch((error) => console.log(error));
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    const reauthenticated = hasPasswordProvider
      ? await reauthenticateWithCurrentPassword()
      : await reauthenticateWithGoogle();

    if (!reauthenticated) return;

    try {
      const geofencesSnapshot = await getDocs(collection(db, `users/${user.uid}/geofences`));
      const centerPointSnapshot = await getDocs(collection(db, `users/${user.uid}/centerPoint`));

      await Promise.all([
        ...geofencesSnapshot.docs.map((docSnap) => deleteDoc(docSnap.ref)),
        ...centerPointSnapshot.docs.map((docSnap) => deleteDoc(docSnap.ref)),
      ]);

      await deleteUser(auth.currentUser);
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
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
              {hasPasswordProvider && (
                <FormField
                  icon="vpn_key"
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  label="Current password"
                  value={currentPassword}
                  onChange={handleChange}
                  onBlurClearError={() => clearFieldErrorColor('currentPassword')}
                  hasError={fields.currentPassword.error}
                  showErrorMessage={fields.currentPassword.message}
                  errorMessage="Current password is required to save changes"
                  autoComplete="current-password"
                />
              )}
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