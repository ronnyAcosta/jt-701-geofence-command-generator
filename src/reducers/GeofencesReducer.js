export const GeofencesReducer = (geofences = [], action) => {
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
  }
  
}

/*
{
              geofences.map((geofence)=>{
                const g = [];
                
                geofence.coordinates.map((coord)=>{
                  g.push([coord.lat, coord.lng]);
                  return 0;
                })
                console.log("g")
                console.log(g)
                return <Polygon positions={g} /> 
              }) 
            }
            <InitGeofences geofences={geofences} />

const InitGeofences = ({geofences}) =>{
    const positions = []
    if(load === true){
      geofences.map((geofence)=>{
        const g = [];
        
        geofence.coordinates.map((coord)=>{
          g.push([coord.lat, coord.lng]);
          return 0;
        })
        console.log("g")
        console.log(g)
        positions.push(g)
        return 0
      }) 
      return positions.map(position => <Polygon positions={position} />)
    }
  }

            */