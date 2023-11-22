import React from 'react'
import { Link, NavLink} from 'react-router-dom'
import { useAuthContext } from '../../contexts/auth.context'
import { config } from '../../utils/config';
// import './custom.admin.css';

const AdminSidebar = ({preImageRoute}) => {
  const {logout, user} = useAuthContext();
  const imageUrl = user.image && user.image !== 'null' ? `${config.imageUrl}/${user.image}` : `${preImageRoute}/img/avatardefault2.png`;
  
  return (
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  {/* {user.role.rolename === 'Administrador' ?   */}
    <NavLink to="/dashboard" className="brand-link ds-nav-sidebar-fixed">
        <img src={`${preImageRoute}img/logo_maria_250x250.jpeg`} alt="Logo consultorio" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">Producción AOS SAS</span>
      </NavLink>
      {/* : <span className="brand-link ds-nav-sidebar-fixed">
        <img src={`${preImageRoute}img/logo_maria_250x250.jpeg`} alt="Logo consultorio" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">Consultorio</span>
      </span>
    } */}
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src={imageUrl} className="img-circle elevation-2" alt="User " />
       
      </div>
      <div className="info" title='Ir al perfil'>
        <NavLink to={'/perfil'} className="d-block">{`${user.nombre} ${user.apellido}`}</NavLink>
        <div>{user.role.rolename}</div>
      </div>
    </div>
    {/* SidebarSearch Form */}
    {/*<div className="form-inline">
      <div className="input-group" data-widget="sidebar-search">
        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
        <div className="input-group-append">
          <button className="btn btn-sidebar">
            <i className="fas fa-search fa-fw" />
          </button>
        </div>
      </div>
  </div>*/}
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            
        <li className="nav-header">CONFIGURACIÓN</li>
        
         
          <li className="nav-item">
            <NavLink to="/articulos" className="nav-link">
            <i className="fas fa-prescription-bottle nav-icon"></i>
              <p>Artículos</p>
            </NavLink>
          </li>
          
              <li className="nav-item">
                <NavLink to="/grupo-articulos" className="nav-link">
                  <i className="fas fa-circle-notch nav-icon" />
                  <p>Grupos de Artículos</p>
                </NavLink>
              </li>
             
              <li className="nav-item">
                <NavLink to="/usuarios" className="nav-link">
                <i className="fas fa-users nav-icon"></i>
                  <p>Usuarios</p>
                </NavLink>
              </li>
     
        <div className='border-secondary border-bottom my-2 mx-3 '></div>
        <li className="nav-header">PERFIL</li>
        <li className="nav-item">
          <a onClick={()=>logout()} className="nav-link">
          <i className="fas fa-sign-out-alt nav-icon"></i>
            <p>
              Logout
            </p>
          </a>
        </li>
       
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

  )
}

export default AdminSidebar