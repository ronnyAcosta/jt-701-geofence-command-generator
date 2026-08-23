import { centerPointSetterType } from "../types/centerPointSetterType";

import { auth, db } from "../firebase/config-firebase";
import { addDoc, collection, doc, getDocs, query, updateDoc, } from "firebase/firestore";

const DEFAULT_CENTER_POINT = {
  coordinates: {
    lat: 26.752697611779812,
    lng: -18.96302324800705,
  },
  zoom: 2
}

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

const defaultPoint = () =>{
  return {
    type: centerPointSetterType.default,
  };
}

const load = (data) =>{
  return {
    type: centerPointSetterType.load,
    payload: data
  }
}

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
    

    dispatch(defaultPoint());
  }
};

const clearGeofences = () =>{
  return(dispatch) =>{
    dispatch({type: centerPointSetterType.clear,});
  }
}

const loadCenterPoint = () => {
  return async (dispatch) => {
    const id = auth.currentUser.uid;

    try {
      const centerPointSnapshot = await getDocs(
        query(collection(db, `users/${id}/centerPoint/`))
      );

      if (centerPointSnapshot.empty) {
        await addDoc(collection(db, `users/${id}/centerPoint/`), DEFAULT_CENTER_POINT);
        dispatch(defaultPoint());
      } else {
        const centerPointData = centerPointSnapshot.docs[0].data();
        dispatch(load(centerPointData));
      }
    } catch (error) {
      console.error('Error al cargar centerPoint:', error.code, error.message);
    }
  };
};

export { setCenterPoint, editCenterPoint, deleteCenterPoint, loadCenterPoint, clearGeofences, DEFAULT_CENTER_POINT };
