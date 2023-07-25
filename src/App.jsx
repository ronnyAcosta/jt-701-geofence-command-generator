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
  const [polygons, setPolygons] = useState([]);

  const editedRef = useRef(false);
  const deletedRef = useRef(false);
  
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
    let command = `(P29,1,${index},1,${coordinates.length}`;
    coordinates.map(c => {
      command += `,${ddddToDdmm(c.lng)},${ddddToDdmm(c.lat)}`;
  });
    command += ')';
    console.log(command);
    return command;
}

  const _created = (e) => {  
    const newPolygon = { _id: e.layer._leaflet_id};
    newPolygon.coordinates = e.layer._latlngs[0].map((latlng) => ({
      lat: latlng.lat,
      lng: latlng.lng,
    }));

    setPolygons((polygons) => [...polygons, newPolygon]);  
    console.log(e);
    
  }

  const _edited = (e) => {
    if (!editedRef.current) {
      editedRef.current = true;
      
      console.log(e);
      const { layers: {_layers}} = e;
  
      const editedIds = Object.values(_layers).map(({ _leaflet_id}) => _leaflet_id );
      console.log(editedIds);
      
      setPolygons((polygons) => {
        polygons.map( (p) =>{
          editedIds.map(id =>{
            if(p._id === id){
              p.coordinates = _layers[id]._latlngs[0];
            }
          }) 
        }) 
        return [...polygons];
      })
    }   
  };
 
  const _deleted = (e) => {
    if (!deletedRef.current) {
      console.log(e);
      deletedRef.current = true;
      
      const { layers: {_layers}} = e;
      const deletedIds = Object.values(_layers).map(({ _leaflet_id}) => _leaflet_id )
      
      setPolygons((polygons) => {
        polygons.map( (p) =>{
          deletedIds.map(id =>{
            if(p._id === id){
              polygons.splice(polygons.indexOf(p),1);
            }
          }) 
        }) 
        return [...polygons];
      });     
    }
  };
  
  useEffect(() => {
    editedRef.current = false;
    deletedRef.current = false;
    console.log(polygons);
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
          {polygons.map((polygon, index) => (
            <li key={index}>
              Geofence {index + 1}: {getCommand(polygon.coordinates, index+1)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default App;
