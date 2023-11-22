import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminDashboard from "../../../components/admin/admin.dashboard";
import { getModelById, updateModel } from "../../../services";
import {  InputComponent } from '../../../components'
import { ToastContainer, toast } from "react-toastify";

const AlmacenEdit = () => {
  const { id } = useParams();
  
  const initialGroup = { _id: id, nombre: "", descripcion: "" };

  const [grupo, setGrupo] = useState(initialGroup);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const respModel = await getModelById('almacenes', id);
      setGrupo(respModel.data);
      console.log('RESPUESTA DE Almacen=>=', respModel);

    } catch (error) {
      console.log('Error en busqueda de Almacen', error);
      setErrorMsg('No se pudieron encontrar los Almacenes')
    }
  }

  useEffect(() => {
      getData();
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
    setGrupo(oldStatus => {
      return { ...oldStatus, [e.target.name]: e.target.value }
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();        
    try {
      const resp = await updateModel('almacenes', grupo);
      if(resp.status === 200){
        setGrupo(initialGroup);
        navigate(-1)
      }
    } catch (error) {
      console.log('Error al actualizar el Almacén =>', error);
      setErrorMsg('Error, no se pudo actualizar el Almacén')
    }
  }
    

  const cancelEditHandler = () => {
    navigate(-1);
  }

  return <AdminDashboard title={'Editar Almacén'} preImageRoute='../../'>
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9 mx-auto">
            <div className="card card-primary card-outline">
             
              <div className="card-body">
                <div className="tab-content">
                  <div className=" active tab-pane" id="settings">
                    <form className="form-horizontal" onSubmit={onSubmitHandler}>
                      
                      <InputComponent type="text" label={'Nombre'} value={grupo.nombre} group={true} onChange={inputChangeHandler} isRequired={true}/>
                      <InputComponent type="text" label={'Descripcion'} value={grupo.descripcion} group={true} onChange={inputChangeHandler} isRequired={true}/>
        
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
export default AlmacenEdit