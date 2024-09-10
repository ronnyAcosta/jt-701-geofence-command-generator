import React, {useEffect} from 'react'
import M from 'materialize-css'
import { Link } from 'react-router-dom';

const NavBar = () => {
  
  useEffect(() => {
    // Inicializar el dropdown
    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {
      coverTrigger: false, // Para que el menú no cubra el botón
      constrainWidth: false, // Para que el menú no tenga el ancho del botón
    });
  }, []);
  return (
    <>
    
    <nav >
      <div className="nav-wrapper">
        <span className=" left app-title">JT701 - Geofence Commands Generator</span>
        
        <Link data-target="dropdown1" className="dropdown-trigger right hide-on-large-only">
          <i className="material-icons">menu</i>
        </Link>

        <ul className="right hide-on-med-and-down">
          <li>
            <button className="btn red waves-effect waves-light">Logout</button>
          </li>
        </ul>

        <ul className="dropdown-content" id="dropdown1">
          <li>
            <Link className="red-text waves-effect waves-red">Logout</Link>
          </li>
        </ul>
      </div>
    </nav>    
    </>
  )
}

export default NavBar