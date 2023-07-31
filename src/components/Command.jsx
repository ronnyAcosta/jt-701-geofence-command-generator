import React from 'react';

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
    return command;
  }

  return(
    <div key={props.index}>
      Geofence {props.index + 1}: <span className='command'>{getCommand(props.geofence.coordinates, props.index+1)}</span>
    </div>
  )
}

export default Command;