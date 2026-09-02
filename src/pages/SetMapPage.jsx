import NavBar from '../components/layout/NavBar';

import CenterPointSetterMap from '../components/containers/CenterPointSetterMap';

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
