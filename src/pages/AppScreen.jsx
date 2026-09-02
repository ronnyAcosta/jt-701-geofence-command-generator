import { useSelector } from 'react-redux';


import NavBar from '../components/layout/NavBar';

import CommandsCointainer from '../components/containers/CommandsCointainer';

import MapComponent from '../components/containers/MapComponent';
import CopiedToast from '../components/ui/CopiedToast';
import { CopyProvider } from '../context/CopyContext';

const AppScreen = () => {
  
  const geofences = useSelector((state) => state.geofences);
  
  const COMMANDS_QTY = 10;

  return(
    <>
      <NavBar />
      <main>
        <MapComponent geofences={geofences} />       
        <CopyProvider>
          <div className='commandsList'>
            <h4 className=''>Commands</h4>
            <CommandsCointainer geofences={geofences} COMMANDS_QTY={COMMANDS_QTY} />
            <CopiedToast />
          </div>
        </CopyProvider>
      </main>   
    </>
  );
}
export default AppScreen;
