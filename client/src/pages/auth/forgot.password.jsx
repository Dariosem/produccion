import React from 'react'
import { NavLink } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div className="hold-transition login-page">
         <div className="login-box">
  <div className="card card-outline card-primary">
    <div className="card-header text-center">
      <NavLink to="/"><b className="h5 text-dark">Consultorio</b><br/><b className="h3 text-dark">Maria Marta Perez Vazquez</b></NavLink > 
    </div>
    <div className="card-body">
      <p className="login-box-msg"><b>Olvidaste la contraseña?</b> <br />Acá podés generar una nueva.</p>
      <form action="recover-password.html" method="post">
        <div className="input-group mb-3">
          <input type="email" className="form-control" placeholder="Email" />
          <div className="input-group-append">
            <div className="input-group-text">
              <span className="fas fa-envelope" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button type="submit" className="btn btn-primary btn-block">Generar nueva Contraseña</button>
          </div>
          {/* /.col */}
        </div>
      </form>
      <p className="mt-3 mb-1">
        <NavLink to="/">Iniciar Sesión</NavLink> 
      </p>
    </div>
    {/* /.login-card-body */}
  </div>
</div>
    </div>


  )
}

export default ForgotPassword