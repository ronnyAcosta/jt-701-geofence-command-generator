import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config-firebase";
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

const logout = () =>{
  return (dispatch) =>{
    signOut(auth).then(() =>{
      dispatch({type: authType.logout})
    })
  }
}

const register = (userName, email, password) =>{
  return (dispatch) =>{
    console.log('action auth')
    createUserWithEmailAndPassword(auth, email, password)
          .then(async ({user}) =>{
            await updateProfile(user, {displayName: userName});
            
            dispatch(login(user.uid, user.displayName ))
          })
  }
}

export {login, logout, register}