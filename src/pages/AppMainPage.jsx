import { useSelector } from 'react-redux';

import NavBar from '../components/layout/NavBar';

import CommandsCointainer from '../components/containers/CommandsCointainer';

import MapComponent from '../components/containers/MapComponent';
import {MAX_GEOFENCES} from '../actions/geofencesActions';

const AppMainPage = () => {
  
  const geofences = useSelector((state) => state.geofences);

  return(
    <>
      <NavBar />
      <main>
        <MapComponent geofences={geofences} />       
          <div className='commandsList'>
            <h4>Commands</h4>
            <CommandsCointainer geofences={geofences} COMMANDS_QTY={MAX_GEOFENCES} />
          </div>
      </main>   
    </>
  );
}
export default AppMainPage;
