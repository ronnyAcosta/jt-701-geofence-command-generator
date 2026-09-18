import { useSelector } from 'react-redux';


import NavBar from '../components/layout/NavBar';

import CommandsCointainer from '../components/containers/CommandsCointainer';

import MapComponent from '../components/containers/MapComponent';
import CopiedToast from '../components/ui/CopiedToast';
import { CopyProvider } from '../context/CopyContext';
import {MAX_GEOFENCES} from '../actions/geofencesActions';

const AppMainPage = () => {
  
  const geofences = useSelector((state) => state.geofences);

  return(
    <>
      <NavBar />
      <main>
        <MapComponent geofences={geofences} />       
        <CopyProvider>
          <div className='commandsList'>
            <h4>Commands</h4>
            <CommandsCointainer geofences={geofences} COMMANDS_QTY={MAX_GEOFENCES} />
            <CopiedToast />
          </div>
        </CopyProvider>
      </main>   
    </>
  );
}
export default AppMainPage;
