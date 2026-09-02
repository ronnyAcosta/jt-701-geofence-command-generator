import PropTypes from 'prop-types'
import GetCommand from '../ui/GetCommand';


const Command = ({geofence, index}) =>{
  
  return(
    <div className='commandContainer' key={index}>
      Geofence {index + 1}: 
      <GetCommand geofence={geofence} index={index} />
    </div>
  )
}

Command.propTypes = {
  index: PropTypes.number,
  geofence: PropTypes.object
}

export default Command;

