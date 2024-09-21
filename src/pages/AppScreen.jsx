import React, { useState, useEffect} from 'react';

import {  MapContainer, TileLayer, FeatureGroup} from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from '../map-providers';
import { useDispatch, useSelector } from 'react-redux';
import Geofences from '../components/Geofences';
import CommandsCointainer from '../components/CommandsCointainer';
import { addGeofence, editGeofence, deleteGeofence } from '../actions/geofencesActions';
import NavBar from '../components/NavBar';

const AppScreen = () => {
  const dispatch = useDispatch()
  const [center] = useState ({ lat: 18.4821, lng: -69.9099 });
  const ZOOM_LEVEL = 13;
  
  const geofences = useSelector((state) => state.geofences);
  
  const COMMANDS_QTY = 10;

  const handleCreate = (e) => { 
    dispatch(addGeofence(e));     
  }

  const handleEdit = (e) => { 
    dispatch(editGeofence(e))        
  };
 
  const handleDelete = (e) => {
    dispatch(deleteGeofence(e)) 
  };
  
  /* useEffect(() => {
    localStorage.setItem("geofences", JSON.stringify(geofences))
    console.log(geofences)
  }, [geofences]); */

  return(
    <>
      <NavBar />

      <main>
        <MapContainer center={center} zoom={ZOOM_LEVEL} >
          <FeatureGroup>
            <EditControl 
              position="topright" 
              onCreated={handleCreate}
              onEdited={handleEdit}
              onDeleted={handleDelete}
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false
              }}
            />  
            <Geofences geofences={geofences} />
          </FeatureGroup>
          <TileLayer 
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
        </MapContainer>
        
        <div className='commandsList'>
          <h4 className=''>Commands</h4>
          <CommandsCointainer geofences={geofences} COMMANDS_QTY={COMMANDS_QTY} />
          
          <div id="copied">Copied to clipboard</div>        
        </div>
      </main>   
    </>
  );
}
export default AppScreen;
