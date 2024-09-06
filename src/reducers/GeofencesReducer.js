export const geofencesReducer = (geofences = [], action) => {
  switch (action.type){
    case "add":
      return [...geofences, action.payload]

          
    case "edit":
      geofences.map((geofence) => {
        return action.payload.map((edit) =>{
          if(geofence._id === edit._id){
            geofence.coordinates = edit.coordinates
          }
          return 0
           })
         }) 
      return [...geofences]

    case "delete":
      return geofences.filter(actual => !action.payload.includes(actual._id))

    default:
      return geofences
  }
  
}

