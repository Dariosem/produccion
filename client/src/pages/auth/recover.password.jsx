import React from 'react'
import { NavLink } from 'react-router-dom'

const RecoverPassword = () => {
  return (
<div className="hold-transition login-page">
  <div className="login-box">
    <div className="card card-outline card-primary">
      <div className="card-header text-center">
        <NavLink to="/"><b className="h5 text-dark">Consultorio</b><br/><b className="h3 text-dark">Maria Marta Perez Vazquez</b></NavLink >
      </div>
      <div className="card-body">
        <p className="login-box-msg">Ingresar una nueva contraseña.</p>
        <form action="login.html" method="post">
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Contraseña" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Confirmar contraseña" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-primary btn-block">Cambiar Contraseña</button>
            </div>
            {/* /.col */}
          </div>
        </form>
        <p className="mt-3 mb-1">
          <NavLink to="/">Iniciar Sesión</NavLink>
          </p>
      {/* /.login-card-body */}
    </div>
  </div>
</div>
</div>

  )
}

export default RecoverPassword