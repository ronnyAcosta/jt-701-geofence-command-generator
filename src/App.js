import React, { useState, useEffect, useRef, useReducer } from 'react';
import {  MapContainer, TileLayer, FeatureGroup} from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import Command from './components/Command';
import Error from './components/Error';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from './map-providers';
import { GeofencesReducer } from './reducers/GeofencesReducer';


const App = () => {

  
  const [center] = useState ({ lat: 18.4821, lng: -69.9099 });
  const ZOOM_LEVEL = 13;
  const mapRef = useRef();
  const [geofences, dispatch] = useReducer(GeofencesReducer, []);

  const editedRef = useRef(false);
  const deletedRef = useRef(false);
  
  const COMMANDS_QTY = 10;

  const _created = (e) => {  
    const action = {
      type: "add",
      payload: { 
        _id: e.layer._leaflet_id,
        coordinates: e.layer._latlngs[0].map((latlng) => ({
          lat: latlng.lat,
          lng: latlng.lng,
        }))
      }
    }
    dispatch(action);     
  }

  const _edited = (e) => {
    if (!editedRef.current) {
      editedRef.current = true;
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

    }   
    
  };
 
  const _deleted = (e) => {
    if (!deletedRef.current) {
      deletedRef.current = true;
      
      const { layers: {_layers}} = e;
      const action = {
        type: "delete",
        payload: Object.values(_layers).map(({ _leaflet_id}) => _leaflet_id )
      } 
      dispatch(action)
    }
  };
  
  useEffect(() => {
    editedRef.current = false;
    deletedRef.current = false;
  });

  return(
    <>
      <header><h1>JT701 - Geofence Commands Generator</h1></header>

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
        
        <div className='commandsList'>
          <h3>Commands</h3>
          <div className='commandsBox'>
            {geofences.map((geofence, index) => {
              if(geofences.indexOf(geofence) < COMMANDS_QTY){
                return(
                  <Command 
                    key = {index}
                    index = {index}
                    geofence = {geofence}
                  />
                )
              }else {
                return(
                  <Error 
                    key = {index}
                    index = {index}
                  />
                )
              }
            })}
          </div>
          <div id="copied">Copied to clipboard</div>        
        </div>
      </main>   
    </>
  );
}
export default App;
