import React from 'react';

const Error = (props) => {
  return(
    <div className='commandContainer' key={props.index}>
      Geofence {props.index + 1}: <span className='error' >Commands limit exceeded. Remove unnecessary geofences.</span>
    </div>
  )
}

export default Error;