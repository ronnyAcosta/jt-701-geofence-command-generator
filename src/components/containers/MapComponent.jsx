import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from '../../map-providers';

import Spinner from '../ui/Spinner';

import { addGeofence, editGeofence, deleteGeofence } from '../../actions/geofencesActions';

const MapComponent = ({geofences}) => {
  const dispatch = useDispatch();
  const centerPoint = useSelector(state => state.centerPoint);
  
  const [featureGroupNode, setFeatureGroupNode] = useState(null);
  const featureGroupRef = useCallback((node) => {
    if (node) setFeatureGroupNode(node);
  }, []);

  const handleCreate = (e) => dispatch(addGeofence(e)); 

  const handleEdit = (e) => dispatch(editGeofence(e));       

  const handleDelete = (e) => dispatch(deleteGeofence(e));

  useEffect(() => {
    const featureGroup = featureGroupNode;
    if (!featureGroup) return;
   
    geofences.forEach((geofence) => {
      if (geofence.dbLoaded !== true) return;

      let alreadyAdded = false;
      featureGroup.eachLayer((layer) => {
        if (layer.docId === geofence.docId) alreadyAdded = true;
      });
      if (alreadyAdded) return;

      const latlngs = geofence.coordinates.map((c) => [c.lat, c.lng]);
      const polygon = L.polygon(latlngs);
      polygon.docId = geofence.docId;
      polygon.addTo(featureGroup);
    });
  }, [geofences, featureGroupNode]);

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
        <FeatureGroup ref={featureGroupRef}>
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
