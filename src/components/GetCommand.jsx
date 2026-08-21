import React from 'react'
import { IonIcon } from '@ionic/react';
import { copyOutline } from 'ionicons/icons';

import { coordinatesFormatConverter } from '../helpers/helpers';
import { useCopyNotification } from '../context/CopyContext';


const GetCommand = ({geofence, index}) => {
  const { notifyCopied } = useCopyNotification();

  const handleCopy = (e) => {
    const content = e.target.parentNode.innerText;
    navigator.clipboard.writeText(content)
      .then(() => notifyCopied())
      .catch(() => console.log("Error at reading content"));
  };

  if(geofence.coordinates.length > 10){
    return(
      <span className='error'>
        Coordinates limit exceeded. Edit the geofence.
      </span>
    )   
  }
  
  let command = `(P29,1,${index},1,${geofence.coordinates.length}`;
  geofence.coordinates.map(coordinate => {
    command += `,${coordinatesFormatConverter(coordinate.lng)},${coordinatesFormatConverter(coordinate.lat)}`;
    return 0;
});
  command += ')';
  return (
    <span className='command'>
      {command}
      {geofence.coordinates.length <= 10 ? <IonIcon className='copy' slot="end" icon={copyOutline} onClick={handleCopy}></IonIcon> : ""}
    </span>
  );
}

export default GetCommand;