import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminDashboard from "../../../components/admin/admin.dashboard";
import { useAuthContext } from "../../../contexts/auth.context";
import { createModel, getAll, getModel, getModelById, updateModel } from "../../../services";
import { InputComponent, SelectComponent } from '../../../components'
import SearchComponent from './../../../components/commons/SearchComponent/SearchComponent'

import Swal from "sweetalert2";

const ArticuloCreate = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
    
  const initialModel = {
    codigoProveedor: '',
    codigoPropio: '',
    descripcion:'',
    precio: 0,
    grupo: '',
    inventariable: false,
    costoUltimaCompra: 0,
    activo: true,
    stock: [],
    tipo: ''
  };

  const [opcionesGrupoArticulo, setOpcionesGrupoArticulo] = useState([]);
  const [grupos, setGrupos] = useState('');

  const [model, setModel] = useState(initialModel);

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const Toast = Swal.mixin({
      timer: 2000,
      toast: true,
      showClass: {
          popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
          popup: 'animate__animated animate__fadeOut'
      },
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
  })

  useEffect(() => {
      if (errorMsg !== '') {
          Toast.fire({
              title: "Error!",
              text: errorMsg,
              icon: 'error',
              showConfirmButton: false,
          })
      }
      setErrorMsg('');
  }, [errorMsg])  //Seteo del mensaje de exito

  useEffect(() => {
      if (successMsg !== '') {
          Toast.fire({
              title: successMsg,
              icon: 'success',
              showConfirmButton: false,
          })
      }
      setSuccessMsg('');
  }, [successMsg])  //Seteo del mensaje de error

  const getData = async () => {
    try {
      const { data } = await getAll('grupo-articulos');
      setGrupos(data);
      const opciones = data.map(item => {
        return {id: item._id, nombre: item.nombre}
      })
      setOpcionesGrupoArticulo(opciones);
      if(id){
        const resp = await getModelById('articulos', id);
        console.log('Articulo', resp);
        setModel(resp.data);
  
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getData();
  }, []); 

  const inputChangeHandler = (e) => {
    setModel(oldStatus => {
      return { ...oldStatus, [e.target.name]: e.target.value }
    })
  }
  
  const checkChangeHandler = (e) => {
    console.log('Name: ', e.target.name);
    console.log('Checked: ', e.target.checked);
    setModel(oldStatus => {
      return { ...oldStatus, [e.target.name]: e.target.checked }
    })
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let resp;
    try {
      if(id){
        resp = await updateModel('articulos', model);
      } else {
        resp = await createModel('articulos', model);
      }
      if(resp.status === 200){
        setModel(initialModel);
        navigate(-1)
      } else {
        console.log('RESPUESTA DE ARTICULOS CON PROBLEMAS', resp);
      }
    } catch (error) {
      console.log('Error al crear el artículo::>', error);
      setErrorMsg('Error, no se pudo crear el Artículo')
    }
    
  }

  const cancelEditHandler = () => {
    navigate(-1)
  }

  const onSelectChangeHandler = e => {
console.log(e.target.value);
    const valor = typeof e === 'string' ? e : e.target.value
    const selectedGrupo = grupos.find(item => item._id === valor );
    const grupoId = selectedGrupo?._id || 0; 
    setModel(oldStatus => {
      return {...oldStatus, grupo: grupoId }
    })
}
const radioChangeHandler = e => {
  if(e.target.value === 'Práctica'){
    setModel(oldStatus => {
      return {...oldStatus, tipo: e.target.value, inventariable: false}
    })
  }
  if(e.target.value === 'Venta'){
    setModel(oldStatus => {
      return {...oldStatus, tipo: e.target.value, inventariable: true}
    })
  }

  setModel(oldStatus => {
    return {...oldStatus, tipo: e.target.value}
  })
}
 const onSearchSelectionHandler = selection => {
  console.log('SELECTION', selection);
  onSelectChangeHandler(selection._id)

 }

  return <AdminDashboard title={id ? 'Editar Artículo' :'Crear Artículo'} preImageRoute='../../'>
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9 mx-auto">
            <div className="card card-primary card-outline">
             
              <div className="card-body">
                <div className="tab-content">
                  <div className=" active tab-pane" id="settings">
                    <form className="form-horizontal" onSubmit={onSubmitHandler}>
                      <div className="form-group row">
                        <InputComponent  type="text" label={'Cod. Propio'} name={'codigoPropio'} value={model.codigoPropio} group={false} onChange={inputChangeHandler} isRequired={true} inputCustomClass="col-sm-4"/>
                        <InputComponent  type="text" label={'Cod. Proveedor'} name={'codigoProveedor'} value={model.codigoProveedor} group={false} onChange={inputChangeHandler} inputCustomClass="col-sm-4" labelCustomClass="col-sm-2 text-sm-right"/>
                      </div>  
                      <InputComponent  type="text" label={'Descripción'} name={'descripcion'} value={model.descripcion} group={true} onChange={inputChangeHandler}/>
                      

                      <div className="form-group row">
                        <SelectComponent opciones={opcionesGrupoArticulo} label={'Grupo'} name={'grupo'} value={model.grupo?._id || 'todos'} onChange={onSelectChangeHandler} group={false} selectCustomClass="col-sm-4" isRequired={true}>
                          <SearchComponent model="grupo-articulos" onSearchSelection={onSearchSelectionHandler} getInitialOptions={true} customBtnClass="btn btn-sm btn-outline-secondary p-0 d-inline mt-2 h-50 mt-0"/>        
                        </SelectComponent>
                        <div className="form-check col mt-2 ml-5" >
                          <input type="checkbox" name="inventariable" id="inventariable"  checked={model.inventariable} onChange={checkChangeHandler} className=" form-check-input"/>
                          <label className="form-check-label" htmlFor="inventariable">Genera Stock</label>
                         </div>
                        <div className="form-check col mt-2" >
                          <input type="checkbox" name="activo" id="activo"  checked={model.activo} onChange={checkChangeHandler} className=" form-check-input"/>
                          <label className="form-check-label" htmlFor="activo">Activo</label>
                          {/*<InputComponent  type="checkbox" label={'Genera Stock'} name={'inventariable'} checked={model.inventariable} group={false} onChange={inputChangeHandler} inputCustomClass=" form-check-input"/>*/}
                        </div>
                        <div className="form-check col mt-2" >
                          <label className="form-laber">Tipo</label>
                          <label className="form-check-label d-block" htmlFor="tipo-venta">
                            <input type="radio" name="tipo" id="tipo-venta" value='Venta' checked={model.tipo === 'Venta'} onChange={radioChangeHandler} className=" form-check-input"/>
                            Venta
                          </label>
                          <label className="form-check-label d-block" htmlFor="tipo-insumo">
                            <input type="radio" name="tipo" id="tipo-insumo" value='Insumo' checked={model.tipo === 'Insumo'} onChange={radioChangeHandler} className=" form-check-input"/>
                            Insumo
                          </label>
                          <label className="form-check-label d-block" htmlFor="tipo-practica">
                            <input type="radio" name="tipo" id="tipo-practica" value='Práctica' checked={model.tipo === 'Práctica'} onChange={radioChangeHandler} className=" form-check-input"/>
                            Práctica
                          </label>
                        </div>

                      </div>
                      <div className="form-group row">

                        <InputComponent type="number" label={'Precio'} value={model.precio} group={false} onChange={inputChangeHandler}  inputCustomClass="col-sm-2" labelCustomClass="col-sm-2" step={0.01}/>
                        <InputComponent type="number" label={'Costo última Compra'} name={'costoUltimaCompra'} value={model.costoUltimaCompra} group={false} onChange={inputChangeHandler}  inputCustomClass="col-sm-2" labelCustomClass="col-sm-2 text-sm-right" step={0.01}/>
                      </div>

                      <div className="form-group row">
                        <div className="offset-sm-2 col-sm-10">
                          <button type="submit" className="btn btn-primary btn-sm">Guardar</button>
                          <button type="button" className="btn btn-secondary btn-sm ml-3" onClick={cancelEditHandler}>Cancelar</button>
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
  </AdminDashboard>
}
export default ArticuloCreate