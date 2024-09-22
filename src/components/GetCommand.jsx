import React from 'react'
import { IonIcon } from '@ionic/react';
import { copyOutline } from 'ionicons/icons';

import { coordinatesFormatConverter, copyContent } from '../helpers/helpers';


const GetCommand = ({geofence, index}) => {
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
      {geofence.coordinates.length <= 10 ? <IonIcon className='copy' slot="end" icon={copyOutline} onClick={copyContent}></IonIcon> : ""}
    </span>
  );
}

export default GetCommand;