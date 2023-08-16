import React from 'react';
import { IonIcon } from '@ionic/react';
import { copyOutline } from 'ionicons/icons';
import PropTypes from 'prop-types'

const Command = (props) =>{
  const ddddToDdmm = (coordinate) =>{
    coordinate = String(coordinate).split(".");
    let dec = (Number(`0.${coordinate[1]}`)*60).toFixed(4);
    if(dec < 10){
      coordinate[1] = String(`0${dec}`);
    }
    else{
      coordinate[1] = String(dec);
    }
    return `${coordinate[0]}${coordinate[1]}` 
  }

  const getCommand = (coordinates, index) =>{
    if(coordinates.length > 10){
      return(
        <span className='error'>
          Coordinate limit exceeded. Edit the geofence.
        </span>
      )
      
    }
    
    let command = `(P29,1,${index},1,${coordinates.length}`;
    coordinates.map(c => {
      command += `,${ddddToDdmm(c.lng)},${ddddToDdmm(c.lat)}`;
  });
    command += ')';
    console.log(command);
    return (
      <span className='command'>
        {command}
        {props.geofence.coordinates.length <= 10 ? <IonIcon className='copy' slot="end" icon={copyOutline} onClick={copyContent}></IonIcon> : ""}
      </span>
    );
  }
  const copyContent = (e) => {
    const content = e.target.parentNode.innerText;
    navigator.clipboard.writeText(content)
    .then(() =>{
      document.getElementById("copied").classList.add('visible');
    })
    .then( () =>{
      setTimeout(() =>{
        document.getElementById("copied").classList.remove('visible');
      }, 1000)
    }).catch("Error al leer contenido");
  }
  return(
    <div className='commandContainer' key={props.index}>
      Geofence {props.index + 1}: 
      {getCommand(props.geofence.coordinates, props.index+1)}
    </div>
  )
}

Command.propTypes = {
  index: PropTypes.number,
  geofence: PropTypes.object
}

export default Command;

