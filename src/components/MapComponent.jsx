import { useDispatch, useSelector } from 'react-redux';

import {  MapContainer, TileLayer, FeatureGroup} from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from '../map-providers';

import Geofences from '../components/Geofences';
import Spinner from '../components/Spinner';

import { addGeofence, editGeofence, deleteGeofence } from '../actions/geofencesActions';

const MapComponent = ({geofences}) => {
  const dispatch = useDispatch();
  const centerPoint = useSelector(state => state.centerPoint);

  const handleCreate = (e) => dispatch(addGeofence(e)); 

  const handleEdit = (e) => dispatch(editGeofence(e));       

  const handleDelete = (e) => dispatch(deleteGeofence(e));

  if (!centerPoint?.coordinates) {
  return (
    <div className="mapLoadingPlaceholder">
      <Spinner />
    </div>
  );
}

  return(
    <>
      <MapContainer center={centerPoint.coordinates} zoom={centerPoint.zoom} >
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