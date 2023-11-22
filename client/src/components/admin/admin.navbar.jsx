import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../contexts/auth.context'
//import './custom.admin.css';

const AdminNavbar = () => {
  const { user } = useAuthContext();
  return (
   <nav className="main-header navbar navbar-expand navbar-white navbar-light ds-nav-fixed">
  
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <NavLink to="" className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars" /></NavLink>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
    <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
    </li>

    <li className="nav-item dropdown">
      <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Configuración</a>
      <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow" style={{minWidth:'13rem'}}>
        {/* Level two dropdown*/}

          <li className="dropdown-submenu dropdown-hover">{/* Almacenes */}
            <a id="dropdownSubAlmacen" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Almacenes</a>
            <ul aria-labelledby="dropdownSubAlmacen" className="dropdown-menu border-0 shadow">
              <li>
                <NavLink tabIndex={-1} to='/almacenes' className="dropdown-item">Listar Almacenes</NavLink>
              </li>
              <li>
                <NavLink to='/almacenes/create' className="dropdown-item">Crear Almacén</NavLink>
              </li>
            </ul>
          </li>

          <li className="dropdown-submenu dropdown-hover">{/* Artículos */}
            <a id="dropdownSubArticulo" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Artículos</a>
            <ul aria-labelledby="dropdownSubArticulo" className="dropdown-menu border-0 shadow">
              <li>
                <NavLink tabIndex={-1} to='/articulos' className="dropdown-item">Listar Artículos</NavLink>
              </li>
    
                <li>
                  <NavLink to='/articulos/create' className="dropdown-item">Crear Artículo</NavLink>
                </li>
   
            </ul>
          </li>
     
          <li className="dropdown-submenu dropdown-hover">{/* Grupos de Artículos */}
            <a id="dropdownSubArticulo" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Grupos Artículo</a>
            <ul aria-labelledby="dropdownSubArticulo" className="dropdown-menu border-0 shadow">
              <li>
                <NavLink tabIndex={-1} to='/grupo-articulos' className="dropdown-item">Listar Grupos</NavLink>
              </li>
              <li>
                <NavLink to='/grupo-articulos/create' className="dropdown-item">Crear Grupo</NavLink>
              </li>
            </ul>
          </li>
          
          <li className="dropdown-submenu dropdown-hover">{/* Usuarios */}
            <a id="dropdownSubMenu2" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Usuarios</a>
            <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
              <li>
                <NavLink tabIndex={-1} to='/usuarios' className="dropdown-item">Listar Usuarios</NavLink>
              </li>
              <li>
                <NavLink to='/usuarios/create' className="dropdown-item">Crear Usuario</NavLink>
              </li>
            </ul>
          </li>
      </ul>
    </li>
  </ul>

  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto">
    <li className="nav-item">
      <NavLink className="nav-link" data-widget="fullscreen" to="" role="button">
        <i className="fas fa-expand-arrows-alt" />
      </NavLink>
    </li>
  </ul>
</nav>

  )
}

export default AdminNavbar