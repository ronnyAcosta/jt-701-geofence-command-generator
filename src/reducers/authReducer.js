import { authType } from "../types/authType";
const initState = {
  uid: "",
  userName: ""
}

export const authReducer = (auth = initState, action) =>{
  switch(action.type){
    case authType.login:
      return action.payload;

    case authType.logout:
      return initState;

      default:
        return initState;
  } 
}