import Command from './Command'
import Error from '../ui/Error'

const CommandsCointainer = ({geofences, COMMANDS_QTY}) => {
  return (
    <div className='commandsBox'>
      {geofences.map((geofence, index) => {
              
        if(geofences.indexOf(geofence) < COMMANDS_QTY){
          return(
            <Command 
              key = {geofence._id}
              index = {index}
              geofence = {geofence}
            />)
        } else {
          return(
            <Error 
            key = {geofence._id}
            index = {index}
            />)
          }
      })}
    </div>         
  )
}

export default CommandsCointainer;