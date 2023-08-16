import React from 'react';
import PropTypes from 'prop-types'
const Error = (props) => {
  return(
    <div className='commandContainer' key={props.index}>
      Geofence {props.index + 1}: <span className='error' >Commands limit exceeded. Remove unnecessary geofences.</span>
    </div>
  )
}
Error.propTypes = {
  index: PropTypes.number
}

export default Error;