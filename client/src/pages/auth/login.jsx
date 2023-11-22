import React, { useEffect, useState } from 'react'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/auth.context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    const { login, loginError, setLoginError, isAuthenticated, user } = useAuthContext();
    const navigate = useNavigate();
    
    useEffect(() => {
      if(loginError !== ''){
        toast.error(loginError,{
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            })
        setLoginError('');
      }
    }, [loginError])

    useEffect(() => {
        redirectTo();
    }, [isAuthenticated])

    const redirectTo = () => {
        if(isAuthenticated){
            let url;
            switch (user.role.rolename) {
                case 'Operario':
                    url = '/dashboard'
                    break;
                case 'Supervisor':
                    url = '/dashboard'
                    break;
                case 'Administrador':
                    url = '/dashboard'
                    break;
            
                default:
                    break;
            }
            navigate(url, {replace: true});
        }
    }

    const [credentials, setCredentials] = useState({ dni:'', password: ''});

    const inputChangeHandler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
       if (name === 'dni') { 
           setCredentials(status => {
               return {...status, dni: value }
           })
        } else {
           setCredentials(status => {
               return {...status, password: value }
           })
       }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        login(credentials);
    }

  return (
    <div className="hold-transition login-page">
        <div className="login-box">
            {/* /.login-logo */}
            <div className="card card-outline card-primary">
            <div className="card-header text-center">
                <NavLink to="/"><b className="h5 text-dark">APOLO OIL SERVICES SAS</b><br/></NavLink >
            </div>
            <div className="card-body">
                <p className="login-box-msg">Iniciar Sesión</p>
                <form onSubmit={onSubmitHandler}>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" name='dni' onChange={inputChangeHandler}  placeholder="DNI" />
                    <div className="input-group-append">
                    <div className="input-group-text">
                        <span className="fas fa-address-card" />
                    </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input type="password" className="form-control" name='password' onChange={inputChangeHandler} placeholder="Contraseña" />
                    <div className="input-group-append">
                    <div className="input-group-text">
                        <span className="fas fa-lock" />
                    </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                    {/* <div className="icheck-primary">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">
                        Recordarme
                        </label>
                    </div> */}
                    </div>
                    {/* /.col */}
                    <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">Iniciar</button>
                    </div>
                    {/* /.col */}
                </div>
                </form>
                {/*
                <div className="social-auth-links text-center mt-2 mb-3">
                <NavLink to="/" className="btn btn-block btn-primary">
                    <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                </NavLink >
                <NavLink to="/" className="btn btn-block btn-danger">
                    <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                </NavLink >
                </div> */}
                {/* /.social-auth-links */}
                <hr />
                <p className="mb-1">
                <NavLink to="/forgot-password">Olvidé la Contraseña</NavLink>
                </p>
                {/*
                <p className="mb-0">
                <NavLink to="/" className="text-center">Register a new membership</NavLink >
                </p>
                */}
            </div>
            {/* /.card-body */}
            </div>
            {/* /.card */}
        </div>
        {/* /.login-box */}
        <ToastContainer />
    </div>

  )
}

export default Login