import { authType } from "../types/authType";
const initState = {
  uid: "",
  displayName: ""
}

export const authReducer = (auth = initState, action) =>{
  switch(action.type){
    case authType.login:
      console.log('se ha iniciado sesión')
      return action.payload;

    case authType.logout:
      console.log('Se ha perdido sesión')
      return initState;

      default:
        return auth;
  } 
}