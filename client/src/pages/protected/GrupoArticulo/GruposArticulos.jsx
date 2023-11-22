import React, { useCallback, useEffect, useState } from 'react'
import AdminDashboard from '../../../components/admin/admin.dashboard'
import { useNavigate } from 'react-router-dom';
import { deleteModel, getAll } from '../../../services';
import DataTable from 'react-data-table-component';
import { useAuthContext } from '../../../contexts/auth.context';
import { customTableStyles } from '../../../utils/tables.styles';
import { ToastContainer, toast } from "react-toastify";

const GruposArticulos = () => {
  const { user } = useAuthContext();
  const [grupos, setGrupos] = useState([]);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate()

  const getData = useCallback(async () => {
    getAll('grupo-articulos').then(resp => {
      setGrupos(resp.data)
    })
  })

  useEffect(() => {
    if(errorMsg !== ''){
      toast.error(errorMsg, {
        position: "top-center"
      });
      setErrorMsg('')
    }
  }, [errorMsg])

  useEffect(() => {
    if(successMsg !== ''){
      toast.success(successMsg, {
        position: "top-center"
      });
      setSuccessMsg('')
    }
  }, [successMsg])
  

  const onDeleteRowHandler = async e => {

    if(user.role.rolename === 'Administrador' || user.role.rolename === 'Profesional'){
      if(window.confirm('Seguro que quiere borrar el grupo?. Los datos no se podrán recuperar')){
        const resp = await deleteModel('grupo-articulos', e.target.dataset.id);
        if(resp.status === 204){
          setSuccessMsg('Grupo eliminado de la base de datos');
          getData();
        }
      }
    } else {
      setErrorMsg('No esta autorizado para eliminar grupos');
    }
  }

  const onEditRowHandler = e => {
    const value = typeof e == 'string' ? e : e.target.dataset.id;
    navigate(`/grupo-articulos/update/${value}`)
  }

  const columns = [
    
    {
      name: 'GRUPO',
      selector: row => row.nombre,
      sortable: true,
      wrap: true,
      maxWidth: "250px"
    },
    {
      name: 'DESCRIPCIÓN',
      selector: row => row.descripcion,
      sortable: true,
      wrap: true
    },
    {
      name: 'ACCIONES',
      button: true,
      maxWidth: "100px",
      cell: (row) => <span>
                    <button className='btn btn-sm btn-warning p-0'>
                      <i className="far fa-edit m-1" data-id={row._id} onClick={onEditRowHandler}></i>
                    </button>
                    <button className='btn btn-sm btn-danger ml-1 p-0'>
                      <i className="fa fa-trash m-1" data-id={row._id} onClick={onDeleteRowHandler}></i>
                    </button>
                  </span>,
    }
  ]

  useEffect(() => {
    getData()
  }, [])

  const crearBtnHandler = () => {
    navigate('/grupo-articulos/create')
  }
  
  return (
    <AdminDashboard title={'Grupos de Artículos'}>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">

              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h3 className="card-title">Lista de Grupos</h3>
                  <button className='btn btn-primary' onClick={crearBtnHandler}>Nuevo Grupo</button>
                </div>
                <div className="card-body">
                  {grupos.length > 0 ? 
                    <DataTable dense
                      columns={columns}
                      data={grupos}
                      pagination={grupos.length > 0 ? true : false}
                      striped
                      highlightOnHover
                      pointerOnHover
                      noDataComponent={false}
                      customStyles={customTableStyles}
                      onRowDoubleClicked={(row) => onEditRowHandler(row._id)}
                    />
                    : <h5 className='text-center'>No hay Datos cargados</h5>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </AdminDashboard>
  )
}

export default GruposArticulos