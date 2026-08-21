import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase/config-firebase";
import { authType } from "../types/authType";

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
  return async (dispatch) =>{
    const { user } = await signInWithPopup(auth, googleAuthProvider)
    try {
      dispatch(login(user.uid, user.displayName));

    } catch (error) {
      console.log(error);
    }
  }
}

const googleLoginWithRedirect = () => signInWithRedirect(auth, googleAuthProvider);

const loginWithEmail = (email, password) =>{
  return async (dispatch) =>{
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    dispatch(login(user.uid, user.displayName));
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
  return async (dispatch) =>{
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: userName });
    dispatch(login(user.uid, user.displayName));
  }
}

export {login, loginWithEmail, googleLoginWithPopUp, googleLoginWithRedirect, logout, register, updateUserName}