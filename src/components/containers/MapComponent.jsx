import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MapContainer, TileLayer, FeatureGroup, useMap } from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from '../../map-providers';

import Spinner from '../ui/Spinner';
import { DRAW_STYLE } from '../../utils/drawStyles';

import { addGeofence, editGeofence, deleteGeofence } from '../../actions/geofencesActions';

import '../../utils/leafletDrawPatch';

const MapComponent = ({geofences}) => {
  const dispatch = useDispatch();
  const centerPoint = useSelector(state => state.centerPoint);
  
  const [featureGroupNode, setFeatureGroupNode] = useState(null);
  const featureGroupRef = useCallback((node) => {
    if (node) setFeatureGroupNode(node);
  }, []);

  const handleCreate = useCallback((e) => dispatch(addGeofence(e)), [dispatch]);

  const handleEdit = useCallback((e) => dispatch(editGeofence(e)), [dispatch]);

  const handleDelete = useCallback((e) => dispatch(deleteGeofence(e)), [dispatch]);

  const DrawEvents = ({ onEdited, onDeleted }) => {
    const map = useMap();

    useEffect(() => {
      map.on("draw:edited", onEdited);
      map.on("draw:deleted", onDeleted);

      return () => {
        map.off("draw:edited", onEdited);
        map.off("draw:deleted", onDeleted);
      };
    }, [map, onEdited, onDeleted]);

    return null;
  };

  useEffect(() => {
    const featureGroup = featureGroupNode;
    if (!featureGroup) return;
    
    geofences.forEach((geofence) => {
      if (!geofence || geofence.dbLoaded !== true) return;

      let alreadyAdded = false;
      featureGroup.eachLayer((layer) => {
        if (layer.docId === geofence.docId) alreadyAdded = true;
      });
      if (alreadyAdded) return;

      const latlngs = geofence.coordinates.map((c) => [c.lat, c.lng]);
      
      const polygon = L.polygon(latlngs, DRAW_STYLE);
      polygon.docId = geofence.docId;
      polygon.addTo(featureGroup);
    });

    // console.log(featureGroup);
    featureGroup.eachLayer((layer) => {
      if (!layer.docId) return;

      const index = geofences.findIndex((geofence) => geofence?.docId === layer.docId);
      if (index === -1) return;

      const label = String(index + 1);
      const tooltip = layer.getTooltip();
      if (tooltip) {
        layer.setTooltipContent(label);
        tooltip.setLatLng(layer.getBounds().getCenter());
      } else {
        layer.bindTooltip(label, { permanent: true, direction: 'center', className: 'geofence-label' });
      }
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
            draw={{
              polygon: { shapeOptions: DRAW_STYLE },
              rectangle: false,
              circle: false,
              circlemarker: false,
              marker: false,
              polyline: false
            }}
          />  
        </FeatureGroup>
        <DrawEvents onEdited={handleEdit} onDeleted={handleDelete} />
        <TileLayer 
          url={osm.maptiler.url}
          attribution={osm.maptiler.attribution}
        />
      </MapContainer>
    </>
  );
}

export default MapComponent
