import React, { useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';

import {  MapContainer, TileLayer, FeatureGroup} from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from '../map-providers';

import Geofences from '../components/Geofences';

import { addGeofence, editGeofence, deleteGeofence } from '../actions/geofencesActions';

const MapComponent = ({geofences}) => {
  const dispatch = useDispatch();
  const [center] = useState ({ lat: 18.4821, lng: -69.9099 });
  const ZOOM_LEVEL = 13;

  const handleCreate = (e) => dispatch(addGeofence(e)); 

  const handleEdit = (e) => dispatch(editGeofence(e));       

  const handleDelete = (e) => dispatch(deleteGeofence(e));

  return(
    <>
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
    </>
  );
}

export default MapComponent