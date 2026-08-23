import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup, useMap } from "react-leaflet";
import { EditControl } from 'react-leaflet-draw';
import { useDispatch, useSelector } from 'react-redux';
import { setCenterPoint, editCenterPoint, deleteCenterPoint } from '../actions/centerPointSetterAction';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import osm from '../map-providers';

const ZoomCapture = ({ mapRef }) => {
  const map = useMap();

  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);

  return null;
};

const CenterPointSetterMap = () => {
  const dispatch = useDispatch();
  const centerPoint = useSelector(state => state.centerPoint);

  const mapRef = useRef(null);
  const featureGroupRef = useRef(null);

  const handleCreate = (e) => {
    const featureGroup = featureGroupRef.current;

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

  return (
    <>
      <MapContainer className='centerPointMapWrapper' center={centerPoint.coordinates} zoom={centerPoint.zoom}>
        <ZoomCapture mapRef={mapRef} />
        <FeatureGroup ref={featureGroupRef}>
          <EditControl
            position="topright"
            onCreated={handleCreate}
            onEdited={handleEdit}
            onDeleted={handleDelete}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: true,
              marker: false,
              polyline: false,
              polygon: false
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

export default CenterPointSetterMap