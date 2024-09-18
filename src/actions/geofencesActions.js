import init from "../helpers/init";
import { actionType } from "../types/actionType";

const addPayload = (e) =>{
  return {
    type: actionType.add,
    payload: {
      _id: e.layer._leaflet_id,
      coordinates: e.layer._latlngs[0].map((latlng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      })),
      oldId: e.layer._leaflet_id,
      cacheLoaded: false,
    },
  };
}

const editPayload = (e) => {
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

const deletePayload = (e) =>{
  const {
    layers: { _layers },
  } = e;
  return {
    type: actionType.delete,
    payload: Object.values(_layers).map(({ _leaflet_id }) => _leaflet_id),
  };
}

const reloadPayload = () =>{
  return {
    type: actionType.reload,
    payload: init()
  }
}

const addGeofence = (e) => {
  //console.log(actionType.add)
  return (dispatch, getState) => {
    dispatch(addPayload(e));
    console.log(getState().geofences)
  };
};



const editGeofence = (e) =>{
  return (dispatch, getState) =>{
    dispatch(editPayload(e))
  }
}

const deleteGeofence = (e) => {
  return (dispatch, getState) =>{
    dispatch(deletePayload(e));
  }
};

const clearGeofences = () =>{
  return(dispatch) =>{
    dispatch({type: actionType.clear,})
  }
}

const reloadGeofences = () =>{
  return(dispatch) =>{
    dispatch(reloadPayload())
  }
}

export { addGeofence, editGeofence, deleteGeofence, reloadGeofences, clearGeofences };
