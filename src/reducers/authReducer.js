import { authType } from "../types/authType";
const initState = {
  uid: "",
  displayName: ""
}

export const authReducer = (auth = initState, action) =>{
  switch(action.type){
    
    case authType.login:
      return action.payload;

    case authType.logout:
      return initState;

    case authType.update:
      return action.payload;
      
    default:
      return auth;
  } 
}