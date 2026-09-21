import { actionType } from "../types/actionType";

import { auth, db } from "../firebase/config-firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, } from "firebase/firestore";
import { toast } from "sonner";
import { getSlots } from "../helpers/getSlots";
const MAX_GEOFENCES = 10;

const add = (data) =>{
  return {
    type: actionType.add,
    payload: data
  };
}

const edit = (data) => {
  return {
    type: actionType.edit,
    payload: data,
  };
};

const remove = (data) =>{
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
  return async (dispatch, getState) => {
    const geofences = getState().geofences;

    const activeGeofences = geofences.filter((geofence) => geofence != null).length;

    if (activeGeofences >= MAX_GEOFENCES) {
      e.layer.remove();
      return;
    }

    let slot = geofences.findIndex((geofence) => geofence == null);
    if (slot === -1) slot = geofences.length;

    const id = auth.currentUser.uid;
    const data = {
      date: new Date(),
      _id: e.layer._leaflet_id,
      slot,
      coordinates: e.layer._latlngs[0].map((latlng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      })),
      dbLoaded: false,
    }
    try{
      const docRef = await addDoc(collection(db, `users/${id}/geofences/`), data);
      const docId = docRef.id;
      
      await updateDoc(docRef, { docId: docId });
  
      data.docId = docId;
      e.layer.docId = docId;

      toast.success(`Successfully added geofence ${getSlots([data])}.`);

      dispatch(add(data));
    } catch(_e){
      toast.error("Error adding geofence");
    }
  };
};

const editGeofence = (e) => {
  return async (dispatch, getState) => {
    const id = auth.currentUser.uid;
    const { layers: { _layers } } = e;

    const data = Object.values(_layers).map((layer) => {
      return({
      docId: layer.docId,
      _id: layer._leaflet_id,
      coordinates: layer._latlngs[0].map((coordinate) => ({
        lat: coordinate.lat,
        lng: coordinate.lng,
      })),
    })});

    const editedGeofences = getState().geofences.filter((geofence) =>
      geofence && data.some((g) => g.docId === geofence.docId)
    );
    try{   
      await Promise.all(
        editedGeofences.map( async (geofence) => {
          const edited = data.find((g) => g.docId === geofence.docId);
          return await updateDoc(doc(db, `users/${id}/geofences/${geofence.docId}`), {
            coordinates: edited.coordinates
          })
        })
      );
      // console.log(editedGeofences);
      toast.success(`Successfully edited ${editedGeofences.length === 1 ? "geofence" : "geofences"} ${getSlots(editedGeofences)}.`);
      dispatch(edit(data))
    } catch(_e){
      toast.error("Error editing geofence");
    }

  }
}

const deleteGeofence = (e) => {
  return async (dispatch, getState) =>{
    const id = auth.currentUser.uid;
    const { layers: { _layers } } = e;

    const data = Object.values(_layers).map((layer) => ({
      docId: layer.docId,
      _id: layer._leaflet_id,
      coordinates: layer._latlngs[0],
    }));

    const deletedGeofences = getState().geofences.filter((geofence) =>
      geofence && data.some((g) => g.docId === geofence.docId)
    );

    try{
      await Promise.all(
        deletedGeofences.map((geofence) =>
          deleteDoc(doc(db, `users/${id}/geofences/${geofence.docId}`))
        )
      );

      toast.success(`Successfully deleted ${deletedGeofences.length === 1 ? "geofence" : "geofences"} ${getSlots(deletedGeofences)}.`);
      dispatch(remove(data));

    }catch(_e){
      toast.error("Error deleting geofence");
    }
  }
};

const clearGeofences = () =>{
  return(dispatch) =>{
    dispatch({type: actionType.clear,});
  }
}

const loadGeofences = () =>{
  return async(dispatch) =>{
    const id = auth.currentUser.uid;

    const docs = [];
    const response = await getDocs(query(collection(db, `users/${id}/geofences/`), orderBy('date')));

    response.forEach((doc) => {
      docs.push(doc.data());
    });

    const lastSlot = docs.reduce((max, geofence) => Math.max(max, geofence.slot ?? 0), -1);
    const data = new Array(lastSlot + 1).fill(null);

    for (const geofence of docs) {
      geofence.dbLoaded = true;
      data[geofence.slot ?? data.length] = geofence;
    }

    dispatch(load(data));
  }
}

export { addGeofence, editGeofence, deleteGeofence, loadGeofences, clearGeofences, MAX_GEOFENCES };
