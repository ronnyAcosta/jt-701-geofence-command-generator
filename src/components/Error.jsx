import React from 'react';

const Error = (props) => {
  return(
    <div key={props.index}>
      Geofence {props.index + 1}: <span className='error' >Límite de comandos superado. Elimine las geocercas innecesarias</span>
    </div>
  )
}

export default Error;