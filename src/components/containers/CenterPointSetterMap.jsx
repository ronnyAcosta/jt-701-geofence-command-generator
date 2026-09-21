import { useCallback, useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { setCenterPoint, editCenterPoint, deleteCenterPoint, DEFAULT_CENTER_POINT } from '../../actions/centerPointSetterAction';
import { MapContainer, TileLayer, FeatureGroup, useMap } from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from '../../map-providers';
import { MARKER_STYLE } from '../../utils/drawStyles';

const ZoomCapture = ({ mapRef }) => {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);

  return null;
};

const isDefaultCenterPoint = ({ coordinates }) =>
  coordinates.lat === DEFAULT_CENTER_POINT.coordinates.lat &&
  coordinates.lng === DEFAULT_CENTER_POINT.coordinates.lng;

const CenterPointSetterMap = () => {
  const dispatch = useDispatch();
  const centerPoint = useSelector(state => state.centerPoint);

  const mapRef = useRef(null);
  const [featureGroupNode, setFeatureGroupNode] = useState(null);
  const featureGroupRef = useCallback((node) => {
    if (node) setFeatureGroupNode(node);
  }, []);

  const handleCreate = (e) => {
    const featureGroup = featureGroupNode;

    if (featureGroup) {
      featureGroup.eachLayer((layer) => {
        if (layer !== e.layer) {
          featureGroup.removeLayer(layer);
        }
      });
    }

    const { lat, lng } = e.layer.getLatLng();
    const zoom = mapRef.current ? mapRef.current.getZoom() : null;

    const centerPoint = {
      coordinates: { lat, lng },
      zoom
    }
    dispatch(setCenterPoint(centerPoint));
  };

  const handleEdit = (e) => {
    const { layers: { _layers } } = e;
    const ids = Object.values(_layers).map(({ _leaflet_id }) => _leaflet_id);
    const { lat, lng } = _layers[ids[0]].getLatLng();

    const zoom = mapRef.current ? mapRef.current.getZoom() : null;

    const centerPoint = {
      coordinates: { lat, lng },
      zoom
    }

    dispatch(editCenterPoint(centerPoint));
  };

  const handleDelete = () => {dispatch(deleteCenterPoint())};

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
    if (!featureGroupNode) return;

    // The group holds at most one layer: the center point marker
    const [marker] = featureGroupNode.getLayers();

    if (isDefaultCenterPoint(centerPoint)) {
      if (marker) featureGroupNode.removeLayer(marker);
      return;
    }

    const { lat, lng } = centerPoint.coordinates;

    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      
      L.circleMarker([lat, lng], MARKER_STYLE).addTo(featureGroupNode);
    }
  }, [centerPoint, featureGroupNode]);

  return (
    <>
      <MapContainer className='centerPointMapWrapper' center={centerPoint.coordinates} zoom={centerPoint.zoom}>
        <ZoomCapture mapRef={mapRef} />
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={handleCreate}
            draw={{
              circlemarker: MARKER_STYLE,
              rectangle: false,
              circle: false,
              marker: false,
              polyline: false,
              polygon: false
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

export default CenterPointSetterMap