import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

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

export default DrawEvents;