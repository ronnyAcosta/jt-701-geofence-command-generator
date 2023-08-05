import React from 'react';

const Error = (props) => {
  return(
    <div className='test' key={props.index}>
      Geofence {props.index + 1}: <span className='command' >Command limit exceeded. Remove unnecessary geofences.</span>
    </div>
  )
}

export default Error;