import React, { useState, useRef } from 'react'
import AdminDashboard from '../../../components/admin/admin.dashboard';
import { Link } from 'react-router-dom';
import { updateModel } from '../../../services';
import { useAuthContext } from '../../../contexts/auth.context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFormData } from '../../../utils/formdata.contructor';
import { config } from '../../../utils/config';

const Perfil = () => {
  const entradaDni = useRef(null);
  const { user } = useAuthContext();
  const [userSelected, setUserSelected] = useState(user);
  const [disabledForm, setDisabledForm] = useState(true);
  const [changePassword, setChangePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('')

  let userRole = user.role.rolename === 'Admin' ? 'Administrador' : user.role.rolename;

  const inputChangeHandler = (e) => {
    setUserSelected(oldUser => {
      return { ...oldUser, [e.target.name]: e.target.value }
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(userSelected.password && userSelected.password !== confirmPassword){
      toast.error('Las contraseñas no son iguales',{
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } else {
      userSelected.role = userSelected.role._id;
      delete userSelected.createdAt;
      delete userSelected.updatedAt;
      const fd = getFormData(userSelected);
      const resp = await updateModel('users', userSelected);
      
      console.log('USUARIO A MODIFICAR==>', fd);
      setUserSelected(resp.data);
      window.localStorage.setItem('user', JSON.stringify(resp.data));
      //setUser(resp.data);
      setDisabledForm(true);
      toast.success('Cambios guardados correctamente.',{
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }

  const disableFormHandler = () => {
    const value = disabledForm ? false : true;
    setDisabledForm(value);
    if(!value){
      entradaDni.current.focus();
    }
  }

  const checkPassChangeHandler = (e) => {
    setChangePassword(e.target.checked);
    if(!e.target.checked){
      if(userSelected.password){
        setUserSelected(oldStatus => {
          let newUser = {...oldStatus};
          delete newUser.password;
          return newUser;
        })
      }
    }
  }

  const onInputConfirmPassHandler = (e) => {
    setConfirmPassword(e.target.value)
  }

  const onFileChangeHandler = e => {
    setUserSelected(oldUser => {
      return { ...oldUser, image: e.target.files[0] }
    })
  }

  let imagenURL;
  if(userSelected.imagen){
    imagenURL = typeof userSelected.imagen === 'object' ? `${URL.createObjectURL(userSelected.imagen)}` : `${config.imageUrl}/${userSelected.imagen}`;
  } else {
    imagenURL =  "../../img/avatardefault2.png";
  }

  return <AdminDashboard title={'Perfil'} preImageRoute='../'>
       <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                  <img className="profile-user-img img-fluid img-circle" src={imagenURL} alt="User profile" />
                  {!disabledForm && <input type='file' accept='image/png, image/jpeg, image/jpeg, image/gif' name='Image' className='form-control form-sm' onChange={onFileChangeHandler} />}
                </div>
                <h3 className="profile-username text-center">{`${userSelected?.nombre} ${userSelected?.apellido}`}</h3>
                <p className="text-muted text-center">{`${userRole}`}</p>
                <ul className="list-group list-group-unbordered mb-3">
                  <li className="list-group-item">
                    <b>Indicador 1</b> <a className="float-right">xx</a>
                  </li>
                  <li className="list-group-item">
                    <b>Indicador 2</b> <a className="float-right">xx</a>
                  </li>

                </ul>
                <Link to={'/perfil'} className="btn btn-primary btn-block"><b>Ver algo</b></Link>
              </div>
            </div>

          </div>
          <div className="col-md-9">
            <div className="card card-primary card-outline">
              <div className="card-header p-2 text-right mr-3">
                <button className={disabledForm ? "btn btn-primary" : 'btn btn-secondary'} onClick={disableFormHandler}  data-toggle="tab">{disabledForm ? 'Editar' : 'Cancelar'}</button>
              </div>
              <div className="card-body">
                <div className="tab-content">
                  <div className=" active tab-pane" id="settings">
                    <form className="form-horizontal" onSubmit={onSubmitHandler} id='perfil_form'>
                      <div className="form-group row">
                        <label htmlFor="inputDni" className="col-sm-2 col-form-label">Dni</label>
                        <div className="col-sm-4">
                          <input disabled={disabledForm} type="text" ref={entradaDni} className="form-control" id="inputDni" value={userSelected?.dni} name='dni' onChange={inputChangeHandler} />
                        </div>
                        <label htmlFor="inputRol" className="col-sm-2 col-form-label text-right">Rol</label>
                        <div className="col-sm-4">
                          <input disabled type="text" className="form-control" id="inputRol" placeholder="Rol..." value={userSelected?.role.rolename} name='role' onChange={inputChangeHandler} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputNombre" className="col-sm-2 col-form-label">Nombre</label>
                        <div className="col-sm-10">
                          <input disabled={disabledForm} type="text" className="form-control" id="inputNombre" placeholder="nombre" value={userSelected?.nombre} name='nombre' onChange={inputChangeHandler} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputApellido" className="col-sm-2 col-form-label">Apellido</label>
                        <div className="col-sm-10">
                          <input disabled={disabledForm} type="text" className="form-control" id="inputApellido" placeholder="apellido" value={userSelected?.apellido} name='apellido' onChange={inputChangeHandler} />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                          <input disabled={disabledForm} type="email" className="form-control" id="inputEmail" placeholder="email" value={userSelected?.email} name='email' onChange={inputChangeHandler} />
                        </div>
                      </div>
                      
                     {!disabledForm && <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <div className="custom-control custom-checkbox">
                            <input className="custom-control-input custom-control-input-danger" type="checkbox" id="pass-change" name='pass-change' onChange={checkPassChangeHandler} />
                            <label htmlFor="pass-change" className="custom-control-label">Cambiar Contraseña</label>
                          </div>
                          
                        </div>
                      </div>}
                      {(!disabledForm && changePassword) && <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Nueva Contraseña</label>
                        <div className="col-sm-10">
                          <input type="password" className="form-control" id="password" name='password' onChange={inputChangeHandler} />
                        </div>
                        <label htmlFor="inputConfirmPassword" className="col-sm-2 col-form-label">Confirmar Contraseña</label>
                        <div className="col-sm-10">
                          <input type="password" className="form-control" id="inputConfirmPassword" name='inputConfirmPassword' onChange={onInputConfirmPassHandler} />
                        </div>
                      </div>}

                      <div className="form-group row" style={disabledForm ? {display: 'none'} : {display: 'block'}}>
                        <div className="text-right m-2">
                          <button type="submit" className="btn btn-danger">Submit</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  </AdminDashboard>

}

export default Perfil
