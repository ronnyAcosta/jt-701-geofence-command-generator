// import { useSelector } from 'react-redux';


import NavBar from '../components/NavBar';

import CenterPointSetterMap from '../components/CenterPointSetterMap';

const SetMapPage = () => {
  
  // const geofences = useSelector((state) => state.geofences);
  

  return(
    <>
      <NavBar />
      <main>
        <CenterPointSetterMap />       
      </main>   
    </>
  );
}
export default SetMapPage;
