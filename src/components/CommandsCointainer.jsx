import React from 'react'
import Command from './Command'
import Error from './Error'

const CommandsCointainer = ({geofences, COMMANDS_QTY}) => {
  return (
    <div className='commandsBox'>
      {geofences.map((geofence, index) => {
              
        if(geofences.indexOf(geofence) < COMMANDS_QTY){
          return(
            <Command 
              key = {index}
              index = {index}
              geofence = {geofence}
            />)
        } else {
          return(
            <Error 
            key = {index}
            index = {index}
            />)
          }
      })}
    </div>         
  )
}

export default CommandsCointainer