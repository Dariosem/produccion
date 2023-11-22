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
  {user.role.rolename === 'Administrador' 
    ? <NavLink to="/dashboard" className="brand-link ds-nav-sidebar-fixed">
        <img src={`${preImageRoute}img/logo_maria_250x250.jpeg`} alt="Logo consultorio" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">Consultorio</span>
      </NavLink>
      : <span className="brand-link ds-nav-sidebar-fixed">
        <img src={`${preImageRoute}img/logo_maria_250x250.jpeg`} alt="Logo consultorio" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">Consultorio</span>
      </span>
    }
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
         <li className="nav-header">TURNOS</li>
        <li className="nav-item">
          <NavLink to="/agenda" className="nav-link">
          <i className="far fa-calendar-alt nav-icon"></i>
            <p>Agenda</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/gestion-turnos" className="nav-link">
          <i className="fas fa-tasks nav-icon"></i>
            <p>Gestión de Turnos</p>
          </NavLink>
        </li>
        {user.role.rolename !== 'Secretaria' && <>
          <li className="nav-item">
            <NavLink to="/atencion-turnos" className="nav-link">
            <i className="fas fa-stethoscope nav-icon"></i>
              <p>Atención de Turnos</p>
            </NavLink>
          </li>
        </>}

        <div className='border-secondary border-bottom my-2 mx-3 '></div>
        <li className="nav-header">ADMINISTRACIÓN</li>
        <li className="nav-item">
          <NavLink to="/remitos" className="nav-link">
          <i className="fas fa-file-invoice nav-icon"></i>
            <p>Remitos</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/facturas" className="nav-link">
          <i className="fas fa-file-invoice-dollar nav-icon"></i>
            <p>Facturas</p>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/pagos-recibidos" className="nav-link">
          <i className="far fa-money-bill-alt nav-icon"></i>
            <p>Pagos Recibidos</p>
          </NavLink>
        </li>

        <div className='border-secondary border-bottom my-2 mx-3 '></div>
        <li className="nav-header">INVENTARIO</li>
        
        <li className="nav-item">
          <NavLink to="/stocks" className="nav-link">
            <i className="fas fa-boxes nav-icon" />
            <p>Detalle de Inventario</p>
          </NavLink>
        </li>
      
        <li className="nav-item">
          <NavLink to="/recepcion-materiales" className="nav-link">
          <i className="fas fa-dolly-flatbed nav-icon"></i>
            <p>Recepción de Materiales</p>
          </NavLink>
        </li>
        { user.role.rolename === 'Administrador' && <>
          <li className="nav-item">
            <NavLink to="/precios" className="nav-link">
            <i className="fas fa-dollar-sign nav-icon"></i>
              <p>Actualización de Precios</p>
            </NavLink>
          </li>
        </>}
        <div className='border-secondary border-bottom my-2 mx-3 '></div>
        <li className="nav-header">CONFIGURACIÓN</li>
        <li className="nav-item">
          <NavLink to="/pacientes" className="nav-link">
          <i className="fas fa-user-injured nav-icon"></i>
            <p>Pacientes</p>
          </NavLink>
        </li>
        { user.role.rolename !== 'Secretaria' && <>
          <li className="nav-item">
            <NavLink to="/profesionales" className="nav-link">
            <i className="fas fa-user-md nav-icon"></i>
              <p>Profesionales</p>
            </NavLink>
          </li>
         
          <li className="nav-item">
            <NavLink to="/articulos" className="nav-link">
            <i className="fas fa-prescription-bottle nav-icon"></i>
              <p>Artículos</p>
            </NavLink>
          </li>
</>}
          { user.role.rolename === 'Administrador' && <>
              <li className="nav-item">
                <NavLink to="/almacenes" className="nav-link">
                  <i className="fas fa-circle-notch nav-icon" />
                  <p>Almacenes</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/grupo-articulos" className="nav-link">
                  <i className="fas fa-circle-notch nav-icon" />
                  <p>Grupos de Artículos</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/categoria-pacientes" className="nav-link">
                  <i className="fas fa-circle-notch nav-icon" />
                  <p>Categorias de Pacientes</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/usuarios" className="nav-link">
                <i className="fas fa-users nav-icon"></i>
                  <p>Usuarios</p>
                </NavLink>
              </li>
            </>
          }

        
        
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