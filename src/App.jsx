import React, { useState, useEffect, useRef } from 'react';
import L from "leaflet";
import {  MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
//import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from './map-providers';

const App = () => {
  const [center, setCenter] = useState ({ lat: 18.4821, lng: -69.9099 });
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();
  const [polygons, setPolygons] = useState([]); // State to store polygon information
  


  const _created = (e) => {
    /*let newArr = e.layer._latlngs[0].map((latlng) =>{
      return `${latlng.lat},${latlng.lng}`;
    })*/
    const newPolygon = { _id: e.layer._leaflet_id}
    newPolygon.coordinates = e.layer._latlngs[0].map((latlng) => ({
      lat: latlng.lat,
      lng: latlng.lng,
    }));
    setPolygons((polygons) => [...polygons, newPolygon]);
    console.log(e);
  }

  const _edited = (e) => {
    console.log(e);
    const { layers: {_layers}} = e

    const editedIds = Object.values(_layers).map(({ _leaflet_id}) => _leaflet_id )
    console.log(editedIds)
    
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
    
  };
 

  const _deleted = (e) => {
    console.log(e);
    const { layers: {_layers}} = e

    const deletedIds = Object.values(_layers).map(({ _leaflet_id}) => _leaflet_id )
    console.log(deletedIds)
    
    setPolygons((polygons) => {
      polygons.map( (p) =>{
        deletedIds.map(id =>{
          if(p._id === id){
            polygons.splice(polygons.indexOf(p),1);
          }
        }) 
      }) 
      return [...polygons];
    })
  };
  
  useEffect(() => {
    console.log(polygons); // Check if polygons state is being updated
  }, [polygons]);

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
        <h3>Polygons Information:</h3>
        <ul>
          {polygons.map((polygon, index) => (
            <li key={index}>
              Polygon {index + 1}: {JSON.stringify(polygon)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default App
