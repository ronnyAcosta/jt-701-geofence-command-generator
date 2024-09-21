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

const remove = (data) =>{
  console.log(data)
  return {
    type: actionType.delete,
    payload: data,
  };
}

const load = (data) =>{
  return {
    type: actionType.load,
    payload: data
  }
}

const addGeofence = (e) => {
  console.log(e.layer._leaflet_id)
  return async (dispatch) => {
    const id = auth.currentUser.uid
    const data = {
      date: new Date(),
      _id: e.layer._leaflet_id,
      coordinates: e.layer._latlngs[0].map((latlng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      })),
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
  return (dispatch) =>{
    const {
      layers: { _layers },
    } = e;
    console.log(_layers)
    const data = Object.values(_layers).map(({ _leaflet_id, _latlngs }) => {
      return {
        _id: _leaflet_id,
        coordinates: _latlngs[0]
      } 
    });
    
    dispatch(remove(data));
  }
};

const clearGeofences = () =>{
  return(dispatch) =>{
    dispatch({type: actionType.clear,})
  }
}

const loadGeofences = () =>{
  return async(dispatch) =>{
    const id = auth.currentUser.uid;
    console.log(id)
    const data = [];
    const response = await getDocs(query(collection(db, `users/${id}/geofences/`), orderBy('date')))

    response.forEach(async (doc) => {
      data.push(doc.data());
    });

    for(let geofence of data){
      geofence.dbLoaded = true;
    }
    
    console.log(data);
    dispatch(load(data))
  }
}

export { addGeofence, editGeofence, deleteGeofence, loadGeofences, clearGeofences };
