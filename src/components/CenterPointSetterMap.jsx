import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';

import {  MapContainer, TileLayer, FeatureGroup} from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from '../map-providers';


// import { addGeofence, editGeofence, deleteGeofence } from '../actions/geofencesActions';

const CenterPointSetterMap = ({geofences}) => {
  // const dispatch = useDispatch();
  const [center] = useState ({ lat: 18.4821, lng: -69.9099 });
  const ZOOM_LEVEL = 13;

  // const handleCreate = (e) => dispatch(addGeofence(e)); 

  return(
    <>
      <MapContainer className='centerPointMapWrapper' center={center} zoom={ZOOM_LEVEL} >
        <FeatureGroup>
          <EditControl 
            position="topright" 
            // onCreated={handleCreate}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: true,
              marker: false,
              polyline: false,
              polygon: false
            }}
          />  
        </FeatureGroup>
        <TileLayer 
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
      </MapContainer>
    </>
  );
}

export default CenterPointSetterMap