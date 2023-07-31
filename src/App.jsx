import React, { useState, useEffect, useRef } from 'react';
import {  MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import Command from './components/Command';
import Error from './components/Error';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from './map-providers';

const App = () => {
  const [center, setCenter] = useState ({ lat: 18.4821, lng: -69.9099 });
  const ZOOM_LEVEL = 13;
  const mapRef = useRef();
  const [geofences, setGeofences] = useState([]);

  const editedRef = useRef(false);
  const deletedRef = useRef(false);
  
  const COMMANDS_QTY = 10;
  
  const _created = (e) => {  
    const newGeofence = { _id: e.layer._leaflet_id};
    newGeofence.coordinates = e.layer._latlngs[0].map((latlng) => ({
      lat: latlng.lat,
      lng: latlng.lng,
    }));

    setGeofences((geofences) => [...geofences, newGeofence]);  
    console.log(e);
    
  }

  const _edited = (e) => {
    if (!editedRef.current) {
      editedRef.current = true;
      
      console.log(e);
      const { layers: {_layers}} = e;
  
      const editedIds = Object.values(_layers).map(({ _leaflet_id}) => _leaflet_id );
      console.log(editedIds);
      
      setGeofences((geofences) => {
        geofences.map( (g) =>{
          editedIds.map(id =>{
            if(g._id === id){
              g.coordinates = _layers[id]._latlngs[0];
            }
          }) 
        }) 
        return [...geofences];
      })
    }   
  };
 
  const _deleted = (e) => {
    if (!deletedRef.current) {
      console.log(e);
      deletedRef.current = true;
      
      const { layers: {_layers}} = e;
      const deletedIds = Object.values(_layers).map(({ _leaflet_id}) => _leaflet_id )
      
      setGeofences((geofences) => {
        geofences.map( (g) =>{
          deletedIds.map(id =>{
            if(g._id === id){
              geofences.splice(geofences.indexOf(g),1);
            }
          }) 
        }) 
        return [...geofences];
      });     
    }
  };
  
  useEffect(() => {
    editedRef.current = false;
    deletedRef.current = false;
    console.log(geofences);
  });

  return(
    <>
      <h2>JT701 - Geofences Commands Generator</h2>

      <main>
        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} >
          <FeatureGroup>
            <EditControl 
              position="topright" 
              onCreated={_created}
              onEdited={_edited}
              onDeleted={_deleted}
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false
              }}
            />
          </FeatureGroup>
          <TileLayer 
            url={osm.maptiler.url}
            attribution={osm.maptiler.attribution}
          />
        </MapContainer>
        
        <div className='commandsContainer'>
          <h3>Commands:</h3>
          <div className='commands'>
            {geofences.map((geofence, index) => {
              if(geofences.indexOf(geofence) < COMMANDS_QTY){
                return(
                  <Command 
                    index = {index}
                    geofence = {geofence}
                  />
                )
              }else{
                return(
                  <Error 
                    index = {index}
                  />
                )
              }
            })}
          </div>        
        </div>
      </main>   
    </>
  );
}
export default App;
