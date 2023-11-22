import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminDashboard from "../../../components/admin/admin.dashboard";
import { useAuthContext } from "../../../contexts/auth.context";
import { getModel, getModelById, updateModel } from "../../../services";
import { CheckComponent, InputComponent, SelectComponent } from '../../../components'
import { ToastContainer, toast } from "react-toastify";
import { config } from "../../../utils/config";
import { getFormData } from "../../../utils/formdata.contructor";

const UpdateUsuario = () => {
  const { user } = useAuthContext();
  console.log('PARAMETROS', useParams());
  const { id } = useParams();
  
  const initialUser = {
    _id:"",
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    role: {},
    password: "",
    activo: 1,
  };

  const initialAvatar = "../../img/avatardefault2.png";

  const [userSelected, setUserSelected] = useState(initialUser);
  const [passConfirm, setPassConfirm] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [roles, setRoles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [roleSelected, setRoleSelected] = useState({});
  const [uploadImg, setUploadImg] = useState(false);
  const [avatarImg, setAvatarImg] = useState(initialAvatar);
  const [imageSelected, setImageSelected] = useState(null);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const respRoles = await getModel('roles');
      setAllRoles(respRoles.data);
      setRoles(respRoles.data.map(rol => { return {id: rol._id, nombre: rol.rolename}}));
      const respUser = await getModelById('users', id);

      setUserSelected(respUser.data);

      setRoleSelected(respUser.data.role._id)

      if(respUser.data.image && respUser.data.image !== '' && respUser.data.image !== 'null'){
        setAvatarImg(`${config.imageUrl}/${respUser.data.image}`)
      }

    } catch (error) {
      console.log('Error en busqueda de roles', error);
      setErrorMsg('No se pudieron encontrar los roles')
    }
  }

  useEffect(() => {
    if(user.role.rolename !== 'Administrador'){
      return <div className="text-center">No tiene autorización para realizar esta tarea</div>
    }

    if(user.role.rolename === 'Administrador'){
      getData();
    } 

  },[]);

  useEffect(() => {
    if(errorMsg !== ''){
      toast.error(errorMsg, {
        position: "top-center"
      });
      setErrorMsg('')
    }
  }, [errorMsg])
  

  const inputChangeHandler = (e) => {
    setUserSelected(oldUser => {
      return { ...oldUser, [e.target.name]: e.target.value }
    })
  }
  
  const handleRoleRelectionChange = (e) => {
    console.log('Selection', e.target.value);
    const role = allRoles.find(item=> item._id === e.target.value)
    setRoleSelected(e.target.value);
    setUserSelected(oldStatus => {
      return {...oldStatus, role: role};
    })
  }


  const checkChangeHandler = (e) => {
    let value;
    e.target.checked ? value = 1 : value = 0
    setUserSelected(oldUser => {
      return { ...oldUser, activo: value }
    })
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const newUser = {...userSelected};
    newUser.role = userSelected.role._id;
    if(imageSelected){
      delete newUser.image;
    }
    delete newUser.password;
    console.log('USUARIO A UPDATE', newUser);
    const fd = getFormData(newUser);
    if(imageSelected){
      fd.append('image', imageSelected);
    }

    try {
      const resp = await updateModel('users', fd, userSelected._id);
      if(resp.status === 200){
        setUserSelected(initialUser);
        navigate('/usuarios')
      }
    } catch (error) {
      
    }
  }
    

  const cancelEditHandler = () => {
    navigate('/usuarios')
  }

  const onFileChangeHandler = e => {
    setImageSelected(e.target.files[0]);

    if(e.target.files[0]){

      setAvatarImg(URL.createObjectURL(e.target.files[0]));
      setUploadImg(!uploadImg)
    }
  }

  return <AdminDashboard title={'Editar Usuario'} preImageRoute='../../'>
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card card-primary card-outline">
              <div className="card-body box-profile">
                <div className="text-center">
                  <img className="profile-user-img img-fluid img-circle" style={{width:'80px', height:'80px'}} src={avatarImg} alt="User profile" />
                </div>
                <h3 className="profile-username text-center">{`${userSelected?.nombre} ${userSelected?.apellido}`}</h3>
                <p className="text-muted text-center">{`${userSelected?.role.rolename}`}</p>
                
                <Link  className="btn btn-primary btn-block" onClick={() => setUploadImg(!uploadImg)}><b>Cambiar Imagen</b></Link>
                {uploadImg && <input type="file" accept='image/png, image/jpeg, image/jpeg, image/gif' name='Image' className='form-control form-sm' onChange={onFileChangeHandler} />}
              </div>
            </div>

          </div>
          <div className="col-md-9">
            <div className="card card-primary card-outline">
             
              <div className="card-body">
                <div className="tab-content">
                  <div className=" active tab-pane" id="settings">
                    <form className="form-horizontal" onSubmit={onSubmitHandler}>
                      <div className="form-group row">
                        <InputComponent  type="text" label={'Dni'} value={userSelected.dni} group={false} inputCustomClass="col-sm-4" disabled={true}/>
                        {/*<InputComponent  type="text" label={'role'} value={userSelected.role.rolename} group={false} onChange={inputChangeHandler} isRequired={true} inputCustomClass="col-sm-4" labelCustomClass="col-sm-2 text-right"/>*/}
                        <SelectComponent label={'Rol'} opciones={roles} onChange={handleRoleRelectionChange} value={roleSelected} inputCustomClass="col-sm-3" labelCustomClass="col-sm-3 text-right" isRequired={true} />
                      </div>
                      <InputComponent type="text" label={'Nombre'} value={userSelected.nombre} group={true} onChange={inputChangeHandler} isRequired={true}/>
                      <InputComponent type="text" label={'Apellido'} value={userSelected.apellido} group={true} onChange={inputChangeHandler} isRequired={true}/>
                      <InputComponent type="email" label={'Email'} value={userSelected.email} group={true} onChange={inputChangeHandler} isRequired={true}/>
                      

                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <CheckComponent label={'Activo'} isChecked={userSelected.activo} onChange={checkChangeHandler} />
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <button className="btn btn-danger" onClick={() => window.alert('Generar el reset de password')}>Resetear Password</button>
                          
                        </div>
                      </div>

                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <button type="submit" className="btn btn-primary">Guardar</button>
                          <button type="button" className="btn btn-secondary ml-3" onClick={cancelEditHandler}>Cancelar</button>
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
    </section>
    <ToastContainer />
  </AdminDashboard>
}
export default UpdateUsuario