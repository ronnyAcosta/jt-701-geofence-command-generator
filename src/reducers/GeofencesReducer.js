import { actions } from "../types/actions"

export const geofencesReducer = (geofences = [], action) => {
  switch (action.type){
    case actions.add:
      return [...geofences, action.payload]

          
    case actions.edit:
      geofences.map((geofence) => {
        return action.payload.map((edit) =>{
          if(geofence._id === edit._id){
            geofence.coordinates = edit.coordinates
          }
          return 0
           })
         }) 
      return [...geofences]

    case actions.delete:
      return geofences.filter(actual => !action.payload.includes(actual._id))

    default:
      return geofences
  }
  
}

