import React from 'react';
import { useSelector } from 'react-redux';


import NavBar from '../components/NavBar';

import CommandsCointainer from '../components/CommandsCointainer';

import MapComponent from '../components/MapComponent';

const AppScreen = () => {
  
  const geofences = useSelector((state) => state.geofences);
  
  const COMMANDS_QTY = 10;

  return(
    <>
      <NavBar />
      <main>
        <MapComponent geofences={geofences} />       
        <div className='commandsList'>
          <h4 className=''>Commands</h4>
          <CommandsCointainer geofences={geofences} COMMANDS_QTY={COMMANDS_QTY} />          
          <div id="copied">Copied to clipboard</div>        
        </div>
      </main>   
    </>
  );
}
export default AppScreen;
