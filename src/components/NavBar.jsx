import {useEffect} from 'react'
import M from 'materialize-css'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authAction';
import { clearGeofences } from '../actions/geofencesActions';
import { clearCenterPoint } from '../actions/centerPointSetterAction';

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.auth);

  const handleLogout = () =>{
    dispatch(logout());
    dispatch(clearGeofences());
    dispatch(clearCenterPoint());
  }

  useEffect(() => {
    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {
      coverTrigger: false, 
      constrainWidth: false, 
    });
    M.updateTextFields();
  }, []);

  return (
    <>
      <nav >
        <div className="nav-wrapper">
          <Link to='/'>
            <span className=" left app-title">JT701 - Geofence Commands Generator</span>
          </Link>

          <Link data-target="dropdown1" className="dropdown-trigger right hide-on-large-only">
            <i className="material-icons">menu</i>
          </Link>

          <ul className="right hide-on-med-and-down">
            <li>
              <Link to='/set-map-location'>Set Map</Link>
            </li>

            <li>
            <Link to='/edit' >{user.displayName}</Link>
            </li>
            <li>
              <button className="btn red waves-effect waves-light" onClick={handleLogout}>Logout</button>
            </li>
          </ul>

          <ul className="dropdown-content" id="dropdown1">
            <li>
            <Link className='waves-effect waves-red test' to='/edit' >{user.displayName}</Link>
            </li>
            <li>
              <Link to='/set-map-location'>Set Map</Link>
            </li>
            <li>
              <Link className="red-text waves-effect waves-red" onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </nav>    
    </>
  )
}

export default NavBar;