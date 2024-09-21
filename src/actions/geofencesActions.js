import init from "../helpers/init";
import { actionType } from "../types/actionType";

import { auth, db } from "../firebase/config-firebase";
import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, } from "firebase/firestore";


const add = (data) =>{
  return {
    type: actionType.add,
    payload: data
  };
}

const edit = (e) => {
  const {
    layers: { _layers },
  } = e;

  console.log(_layers)
  const ids = Object.values(_layers).map(({ _leaflet_id }) => _leaflet_id);

  return {
    type: actionType.edit,
    payload: ids.map((id) => {
      return {
        _id: id,
        coordinates: _layers[id]._latlngs[0],
      };
    }),
  };
};

const remove = (e) =>{
  const {
    layers: { _layers },
  } = e;
  console.log(_layers)
  return {
    type: actionType.delete,
    payload: Object.values(_layers).map(({ _leaflet_id }) => _leaflet_id),
  };
}

const load = (data) =>{
  return {
    type: actionType.load,
    payload: data
  }
}

const addGeofence = (e) => {
  //console.log(actionType.add)
  return async (dispatch) => {
    const id = auth.currentUser.uid
    const data = {
      date: new Date(),
      _id: e.layer._leaflet_id,
      coordinates: e.layer._latlngs[0].map((latlng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      })),
      leafletId: e.layer._leaflet_id,
      dbLoaded: false,
    }
    const docRef = await addDoc(collection(db, `users/${id}/geofences/`), data);
    const docId = docRef.id;
    console.log(docId)
    await updateDoc(docRef, {
      docId: docId
    })
    data.docId = docId;
    dispatch(add(data));
    //console.log(getState().geofences)
  };
};



const editGeofence = (e) =>{
  return (dispatch, getState) =>{
    dispatch(edit(e))
  }
}

const deleteGeofence = (e) => {
  return (dispatch, getState) =>{
    dispatch(remove(e));
  }
};

const clearGeofences = () =>{
  return(dispatch) =>{
    dispatch({type: actionType.clear,})
  }
}

const loadGeofences = () =>{
  return async(dispatch) =>{
    console.log('Load')
    const id = auth.currentUser.uid;
    console.log(id)
    const data = [];
    const response = await getDocs(query(collection(db, `users/${id}/geofences/`), orderBy('date')))
    
    const newId = {
      id: 38
    };

    response.forEach(async (doc) => {
      data.push(doc.data());
    });

    
    for(let geofence of data){
      if(newId.id === 39){
        newId.id = newId.id + 1;
      }
      const docRef = doc(db, `users/${id}/geofences/${geofence.docId}`);
      
      await updateDoc(docRef, { _id: newId.id }).catch((error)=> console.log(error));

      geofence._id = newId.id
      geofence.dbLoaded = true;
      newId.id++;
    }
    
    console.log(data);
    dispatch(load(data))
  }
}

export { addGeofence, editGeofence, deleteGeofence, loadGeofences, clearGeofences };
