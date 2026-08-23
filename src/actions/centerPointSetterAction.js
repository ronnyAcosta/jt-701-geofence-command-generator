import { centerPointSetterType } from "../types/centerPointSetterType";

// import { auth, db } from "../firebase/config-firebase";
// import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, } from "firebase/firestore";



const set = (data) =>{
  return {
    type: centerPointSetterType.set,
    payload: data
  };
}

const edit = (data) => {
  return {
    type: centerPointSetterType.edit,
    payload: data,
  };
};

const remove = () =>{
  return {
    type: centerPointSetterType.delete,
  };
}

// const load = (data) =>{
//   return {
//     type: centerPointSetterType.load,
//     payload: data
//   }
// }

const setCenterPoint = (centerPoint) => {
  return async (dispatch) => {
    // const id = auth.currentUser.uid;
    
    // const docRef = await addDoc(collection(db, `users/${id}/geofences/`), data);
    // const docId = docRef.id;
    
    // await updateDoc(docRef, { docId: docId });

    // data.docId = docId;

    dispatch(set(centerPoint));
    return
  };
};



const editCenterPoint = (centerPoint) =>{
  return async (dispatch) =>{
    // const id = auth.currentUser.uid;


    
    // await updateDoc(doc(db, `users/${id}/geofences/${geofence.docId}`), {
    //   coordinates: data[i].coordinates
    // }).catch((error) => console.log(error))
    
    
   

    dispatch(edit(centerPoint))
  }
}

const deleteCenterPoint = (e) => {
  return async (dispatch) =>{
    // const id = auth.currentUser.uid;
    

    dispatch(remove());
  }
};

const clearGeofences = () =>{
  return(dispatch) =>{
    dispatch({type: centerPointSetterType.clear,});
  }
}

const loadCenterPoint = () =>{
  return async(dispatch) =>{
    // const id = auth.currentUser.uid;
   
    // const centerPoint = await getDocs(query(collection(db, `users/${id}/geofences/`), orderBy('date')));


    
    // dispatch(load(centerPoint));
  }
}

export { setCenterPoint, editCenterPoint, deleteCenterPoint, loadCenterPoint, clearGeofences };
