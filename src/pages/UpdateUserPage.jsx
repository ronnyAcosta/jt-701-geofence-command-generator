import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import NavBar from '../components/layout/NavBar';
import FormField from '../components/input/FormField';

import { logout, updateUserName, googleLoginWithPopUp } from '../actions/authAction';

import { updateProfile, updatePassword, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { auth, db } from '../firebase/config-firebase';
import { collection, deleteDoc, getDocs } from 'firebase/firestore';
import { toast } from 'sonner';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const initialFieldState = { error: false, message: false };

const UpdateUserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = auth.currentUser;

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

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);


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

  const reauthenticateWithGoogle = async () => {
    try {
      dispatch(googleLoginWithPopUp());
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
      })
      .catch((error) => console.log(error));

      toast.success('User data updated successfully');
  }

  const handleDelete = async () => {
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


  return (
    <>
      <NavBar />

      <div className="auth-page">
        <section className="auth-card" aria-labelledby="edit-user-heading">
          <h2 id="edit-user-heading" className="auth-heading">Update user info</h2>
          <p className="auth-subheading">Update your user name or choose a new password.</p>

          <form className="auth-form" method='post' onSubmit={handleSubmit}>
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
                errorMessage="Use between 3 and 20 characters"
                autoComplete="nickname"
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
                errorMessage="Use at least 8 characters"
                autoComplete="new-password"
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
                errorMessage="Passwords do not match"
                autoComplete="new-password"
              />
            </div>

            <button type='submit' className='btn auth-submit waves-effect waves-light'>Save changes</button>
          </form>

          <div className="danger-zone">
            <h3 className="danger-zone-title">Delete account</h3>
            <p className="danger-zone-text">
              This permanently removes your account, geofences and map center. It can&apos;t be undone.
            </p>

            <AlertDialog.Root open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialog.Trigger asChild>
                <button type="button" className="danger-btn">Delete account</button>
              </AlertDialog.Trigger>

              <AlertDialog.Portal>
                <AlertDialog.Overlay className="dialog-overlay" />
                <AlertDialog.Content className="dialog-content">
                  <AlertDialog.Title className="dialog-title">Delete your account?</AlertDialog.Title>
                  <AlertDialog.Description className="dialog-description">
                    This permanently removes your account, geofences and map center. This action can&apos;t be undone.
                  </AlertDialog.Description>

                  <div className="dialog-actions">
                    <AlertDialog.Cancel asChild>
                      <button type="button" className="dialog-btn dialog-btn-cancel">Cancel</button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button type="button" className="dialog-btn dialog-btn-danger" onClick={handleDelete}>
                        Delete account
                      </button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          </div>

          <p className="auth-footer">
            <Link to="/" className="auth-link">Back to map</Link>
          </p>
        </section>
      </div>
    </>
  )
}

export default UpdateUserPage;
