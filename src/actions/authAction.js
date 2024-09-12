import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
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

const loginWithEmail = (email, password) =>{
  return (dispatch) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      dispatch(login(user.uid, user.displayName))
    })
    .catch((error) => {
      if(error.code === 'auth/invalid-credential'){
        console.log(error.code)
      }
    });
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
      .catch((error)=>{
        if(error.code === 'auth/email-already-in-use'){
          console.log(error.code)
          document.querySelector('#duplicatedEmail').style.display = 'block'
        }
      })
      .then(()=>{
        setTimeout(()=>{
          document.querySelector('#duplicatedEmail').classList.add('visible');
        }, 10)
        
        setTimeout(()=>{
          document.querySelector('#duplicatedEmail').classList.remove('visible');
        }, 2000)

        setTimeout(()=>{
          document.querySelector('#duplicatedEmail').style.display = 'none'
        }, 2500)
      })
  }
}

export {login, loginWithEmail, logout, register}