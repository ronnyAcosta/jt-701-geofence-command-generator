const init = () =>{
  const geofences = JSON.parse(localStorage.getItem("geofences"))

  if(geofences){
    let newId = 38;
    
    const cacheGeofences = geofences.map((geofence)=>{
      geofence.cacheLoaded = true;
      if(newId === 39){
        newId++
      }
      geofence._id = newId
      newId++;
      return geofence;
    });
    return cacheGeofences;
  }
  else{
    return []
  }
}

export default init;