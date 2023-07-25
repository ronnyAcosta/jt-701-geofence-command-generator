import React, { useState, useEffect, useRef } from 'react';
import {  MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from './map-providers';

const App = () => {
  const [center, setCenter] = useState ({ lat: 18.4821, lng: -69.9099 });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();
  const [geofences, setGeofences] = useState([]);

  const editedRef = useRef(false);
  const deletedRef = useRef(false);
  
  const COMMANDS_QTY = 10;
  const ddddToDdmm = (coordinate) =>{
    coordinate = String(coordinate).split(".");
    let dec = (Number(`0.${coordinate[1]}`)*60).toFixed(4);
    if(dec < 10){
        coordinate[1] = String(`0${dec}`);
    }
    else{
        coordinate[1] = String(dec);
    }
    return `${coordinate[0]}${coordinate[1]}`
}

  const getCommand = (coordinates, index) =>{
    if(coordinates.length > 10){
      return "Límite de coordenadas superado. Edite la geocerca"
      
    }
    
    let command = `(P29,1,${index},1,${coordinates.length}`;
    coordinates.map(c => {
      command += `,${ddddToDdmm(c.lng)},${ddddToDdmm(c.lat)}`;
  });
    command += ')';
    console.log(command);
    return command;
}

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
      <div className='row'>
        <div className="col text-center">
          <h2>React-leaflet - Drawn shapes on map</h2>

          <div className="col">
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
          </div>
        </div>
      </div>

      <div>
        <h3>Geofences Commands:</h3>
        <ul>
          {geofences.map((geofence, index) => {
            if(geofences.indexOf(geofence) < COMMANDS_QTY){
              return(
              <li key={index}>
                Geofence {index + 1}: {getCommand(geofence.coordinates, index+1)}
              </li>
              )
            }else{
              return(
              <li key={index}>
                Geofence {index + 1}: Límite de comandos superado. Elimine las geocercas innecesarias
              </li>
              )  
            }
          })}
        </ul>
      </div>
    </>
  );
}
export default App;
