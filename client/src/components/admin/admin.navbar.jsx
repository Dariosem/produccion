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
    {user.role.rolename === 'Administrador' && <li className="nav-item d-none d-sm-inline-block">
    <NavLink to="/dashboard" className="nav-link" disabled={user.role.rolename === 'secretaria'}>Dashboard</NavLink>
    </li>}

    <li className="nav-item dropdown">
      <a id="dropdownAgenda" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Agenda</a>
      <ul aria-labelledby="dropdownAgenda" className="dropdown-menu border-0 shadow" style={{minWidth:'13rem'}}>
        {/* Level two dropdown*/}
        <li>
          <NavLink tabIndex={-1} to='/agenda' className="dropdown-item">Calendario de turnos</NavLink>
        </li>
        <li>
          <NavLink to='/gestion-turnos' className="dropdown-item">Gestión de turnos</NavLink>
        </li>
        {user.role.rolename !== 'Secretaria' && 
          <li>
            <NavLink to='/atencion-turnos' className="dropdown-item">Atención de turnos</NavLink>
          </li>
        }
       
        
        {/* End Level two */}
      </ul>
    </li>{/* Agenda */}
    
    <li className="nav-item dropdown">{/* Administración */}
      <a id="dropdownAdministracion" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Administración</a>
      <ul aria-labelledby="dropdownAdministracion" className="dropdown-menu border-0 shadow" style={{minWidth:'13rem'}}>
        {/* Level two dropdown*/}
        <li>
          <NavLink tabIndex={-1} to='/remitos' className="dropdown-item">Remitos</NavLink>
        </li>      
        <li>
          <NavLink tabIndex={-1} to='/facturas' className="dropdown-item">Facturas</NavLink>
        </li> 
        <li className="dropdown-divider" />
        <li>
          <NavLink tabIndex={-1} to='/pagos-recibidos' className="dropdown-item">Pagos Recibidos</NavLink>
        </li> 


      </ul>
    </li>

    <li className="nav-item dropdown">{/* Inventario */}
      <a id="dropdownInventario" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Inventario</a>
      <ul aria-labelledby="dropdownInventario" className="dropdown-menu border-0 shadow" style={{minWidth:'13rem'}}>
        {/* Level two dropdown*/}
        <li>
          <NavLink tabIndex={-1} to='/stocks' className="dropdown-item">Detalle de Inventario</NavLink>
        </li>      
        <li>
          <NavLink tabIndex={-1} to='/recepcion-materiales' className="dropdown-item">Recepción de Materiales</NavLink>
        </li>      
        {user.role.rolename === 'Administrador' && <>
            <li className="dropdown-divider" />
            <li>
              <NavLink tabIndex={-1} to='/precios' className="dropdown-item">Actualización de Precios</NavLink>
            </li>
          </> 
        }     

      </ul>
    </li>
    {/*<li className="nav-item d-none d-sm-inline-block">
      <NavLink to="" className="nav-link">Contact</NavLink>
    </li>*/}
    <li className="nav-item dropdown">
      <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">Configuración</a>
      <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow" style={{minWidth:'13rem'}}>
        {/* Level two dropdown*/}
        {user.role.rolename === 'Administrador' && <>
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
        </>}
          <li className="dropdown-submenu dropdown-hover">{/* Artículos */}
            <a id="dropdownSubArticulo" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Artículos</a>
            <ul aria-labelledby="dropdownSubArticulo" className="dropdown-menu border-0 shadow">
              <li>
                <NavLink tabIndex={-1} to='/articulos' className="dropdown-item">Listar Artículos</NavLink>
              </li>
              {user.role.rolename === 'Administracion' && <>
                <li>
                  <NavLink to='/articulos/create' className="dropdown-item">Crear Artículo</NavLink>
                </li>
              </>}
            </ul>
          </li>
          {user.role.rolename === 'Administracion' && <>
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
          </>}
        
          
        <li className="dropdown-submenu dropdown-hover">{/* Pacientes */}
          <a id="dropdownSubMenu2" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Pacientes</a>
          <ul aria-labelledby="dropdownSubMenu2" className="dropdown-menu border-0 shadow">
            <li>
              <NavLink tabIndex={-1} to='/pacientes' className="dropdown-item">Listar Pacientes</NavLink>
            </li>
            <li>
              <NavLink to='/pacientes/create' className="dropdown-item">Crear Paciente</NavLink>
            </li>
          </ul>
        </li>
        
        {user.role.rolename === 'Administrador' && <>
          <li className="dropdown-submenu dropdown-hover">{/* Categoria de pacientes */}
            <a id="dropdownCategoriaPaciente" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Categorías Pacientes</a>
            <ul aria-labelledby="dropdownCategoriaPaciente" className="dropdown-menu border-0 shadow">
              <li>
                <NavLink tabIndex={-1} to='/categoria-pacientes' className="dropdown-item">Listar Categorías</NavLink>
              </li>
              <li>
                <NavLink to='/categoria-pacientes/create' className="dropdown-item">Crear Categoría</NavLink>
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
        </>}

        
        <li className="dropdown-submenu dropdown-hover">{/* Profesionales */}
          <a id="dropdownSubMenuProfesional" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-item dropdown-toggle">Profesionales</a>
          <ul aria-labelledby="dropdownSubMenuProfesional" className="dropdown-menu border-0 shadow">
            <li>
              <NavLink tabIndex={-1} to='/profesionales' className="dropdown-item">Listar Profesionales</NavLink>
            </li>
            {user.role.rolename === 'Administracion' && <>
              <li>
                <NavLink to='/profesionales/create' className="dropdown-item">Crear Profesional</NavLink>
              </li>
            </>}
          </ul>
        </li>
        {/* <li className="dropdown-divider" /> */}
        
        {/* End Level two */}
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