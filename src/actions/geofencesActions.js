import { actions } from "../types/actions";

const addGeofence = (e) => { 
  //console.log(actions.add)
  return {
    type: actions.add,
    payload: { 
      _id: e.layer._leaflet_id,
      coordinates: e.layer._latlngs[0].map((latlng) => ({
        lat: latlng.lat,
        lng: latlng.lng,
      })),
      cacheLoaded: false
    }
  }    
}

const editGeofence = (e) =>{
  const { layers: {_layers}} = e;
    
  const ids = Object.values(_layers).map(({ _leaflet_id}) => _leaflet_id )
    
  return {
    type: actions.edit,
    payload: ids.map( (id) =>{
      return {
        _id: id,
        coordinates: _layers[id]._latlngs[0]
      }
    })
  }     
}

const deleteGeofence = (e) =>{
  const { layers: {_layers}} = e;
  
  return {
    type: actions.delete,
    payload: Object.values(_layers).map(({ _leaflet_id}) => _leaflet_id )
  }
}

export {addGeofence, editGeofence, deleteGeofence}