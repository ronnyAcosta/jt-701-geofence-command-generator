import React, { useState, useEffect} from 'react';

import {  MapContainer, TileLayer, FeatureGroup} from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from '../map-providers';
import { useDispatch, useSelector } from 'react-redux';
import Geofences from '../components/Geofences';
import CommandsCointainer from '../components/CommandsCointainer';


const AppScreen = () => {
  const dispatch = useDispatch()
  const [center] = useState ({ lat: 18.4821, lng: -69.9099 });
  const ZOOM_LEVEL = 13;
  
  const geofences = useSelector((state) => state.geofences);
  
  const COMMANDS_QTY = 10;

  const handleCreate = (e) => { 
    const action = {
      type: "add",
      payload: { 
        _id: e.layer._leaflet_id,
        coordinates: e.layer._latlngs[0].map((latlng) => ({
          lat: latlng.lat,
          lng: latlng.lng,
        })),
        cacheLoaded: false
      }
    }
    dispatch(action);     
  }

  const handleEdit = (e) => {
    const { layers: {_layers}} = e;
    
    const ids = Object.values(_layers).map(({ _leaflet_id}) => _leaflet_id )
    
    const action = {
      type: "edit",
      payload: ids.map( (id) =>{
        return {
          _id: id,
          coordinates: _layers[id]._latlngs[0]
        }
      })
    }     
    dispatch(action)
          
  };
 
  const handleDelete = (e) => {
    
    const { layers: {_layers}} = e;
    const action = {
      type: "delete",
      payload: Object.values(_layers).map(({ _leaflet_id}) => _leaflet_id )
    } 
    dispatch(action)
    
  };
  
  useEffect(() => {
    localStorage.setItem("geofences", JSON.stringify(geofences))
    console.log(geofences)
  }, [geofences]);

  return(
    <>
      <header><h1>JT701 - Geofence Commands Generator</h1></header>

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
          <h3>Commands</h3>
          <CommandsCointainer geofences={geofences} COMMANDS_QTY={COMMANDS_QTY} />
          
          <div id="copied">Copied to clipboard</div>        
        </div>
      </main>   
    </>
  );
}
export default AppScreen;
