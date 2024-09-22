import React from 'react'
import { Polygon } from 'react-leaflet';

const Geofences = ({geofences}) => {
  return (
    <>
      {
      geofences.map((geofence)=>{
        if(geofence.dbLoaded === true){
          const g = [];
          geofence.coordinates.map((coord)=>{
            g.push([coord.lat, coord.lng]);
            return 0;
          })
          return <Polygon key={geofence._id} positions={g} />
        }
        return 0;
      }) 
    }
    </>
  )
}

export default Geofences;