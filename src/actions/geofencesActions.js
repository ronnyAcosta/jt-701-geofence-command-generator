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
      cacheLoaded: false,
    },
  };
}

const editPayload = (e) => {
  const {
    layers: { _layers },
  } = e;

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

const addGeofence = (e) => {
  //console.log(actionType.add)
  return (dispatch) => {
    dispatch(addPayload(e));
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

export { addGeofence, editGeofence, deleteGeofence, clearGeofences };
