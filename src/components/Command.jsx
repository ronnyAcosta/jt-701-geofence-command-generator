import React from 'react';
import { IonIcon } from '@ionic/react';
import { copyOutline } from 'ionicons/icons';

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
      return "Límite de coordenadas superado. Edite la geocerca"
      
    }
    
    let command = `(P29,1,${index},1,${coordinates.length}`;
    coordinates.map(c => {
      command += `,${ddddToDdmm(c.lng)},${ddddToDdmm(c.lat)}`;
  });
    command += ')';
    console.log(command);
    return (command);
  }
  const copyContent = (e) => {
    const content = e.target.parentNode.innerText;
    navigator.clipboard.writeText(content)
    .then(() =>{
      alert("Contenido copiado")
    }).catch("Error al leer contenido");
  }
  return(
    <div className='test' key={props.index}>
      Geofence {props.index + 1}: 
      <span className='command'>
        {getCommand(props.geofence.coordinates, props.index+1)}
        {props.geofence.coordinates.length <= 10 ? <IonIcon className='copy' slot="end" icon={copyOutline} onClick={copyContent}></IonIcon> : ""}
      </span>
    </div>
  )
}

export default Command;