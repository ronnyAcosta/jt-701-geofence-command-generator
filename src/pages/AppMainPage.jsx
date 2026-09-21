import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import NavBar from '../components/layout/NavBar';

import CommandsCointainer from '../components/containers/CommandsCointainer';

import MapComponent from '../components/containers/MapComponent';
import {loadGeofences, MAX_GEOFENCES} from '../actions/geofencesActions';

const AppMainPage = () => {
  const dispatch = useDispatch();
  const geofences = useSelector((state) => state.geofences);

  useEffect(()=>{
    dispatch(loadGeofences())
  }, [dispatch]);

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
