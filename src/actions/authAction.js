import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase/config-firebase";
import { authType } from "../types/authType";
import { showMessage } from "../helpers/helpers";

const login = (uid, displayName) =>{
  return {
    type: authType.login,
    payload: {
      uid,
      displayName
    }
  }
}

const updateUserName = (uid, displayName) =>{
  return {
    type: authType.update,
    payload: {
      uid,
      displayName
    }
  }
}

const googleLoginWithPopUp = () =>{
  return (dispatch) =>{
    signInWithPopup(auth, googleAuthProvider)
      .then(({user})=> dispatch(login(user.uid, user.displayName)))     
      .catch((error) => console.log(`An error has occurred ${error}`));
  }
}

const googleLoginWithRedirect = () => signInWithRedirect(auth, googleAuthProvider);

const loginWithEmail = (email, password) =>{
  return (dispatch) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
      dispatch(login(user.uid, user.displayName));
      
    })
    .catch((error) => {
      if(error.code === 'auth/invalid-credential'){
        showMessage('#invalidCredentials');
      }
    });
  }
}

const logout = () =>{
  return async (dispatch) =>{
    await signOut(auth).then(() =>{
      dispatch({type: authType.logout});
    })
  }
}

const register = (userName, email, password) =>{
  return (dispatch) =>{
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({user}) =>{
        await updateProfile(user, {displayName: userName});
        dispatch(login(user.uid, user.displayName ));
      })
      .catch((error)=>{
        if(error.code === 'auth/email-already-in-use'){
          console.log(error.code)
          showMessage('#duplicatedEmail');
        }
      })
  }
}

export {login, loginWithEmail, googleLoginWithPopUp, googleLoginWithRedirect, logout, register, updateUserName}