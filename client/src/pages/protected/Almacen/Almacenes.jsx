import React, { useEffect, useState } from 'react'
import AdminDashboard from '../../../components/admin/admin.dashboard'
import { useNavigate } from 'react-router-dom';
import { deleteModel, getAll } from '../../../services';
import DataTable from 'react-data-table-component';
import { useAuthContext } from '../../../contexts/auth.context';
import { customTableStyles } from '../../../utils/tables.styles';
import Swal from 'sweetalert2';

const ALmacenes = () => {
  const { user } = useAuthContext();
  const [almacenes, setAlmacenes] = useState([]);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate()

  const getData = async () => {
    getAll('almacenes').then(resp => {
      
      setAlmacenes(resp.data)

    })
  }

  const Toast = Swal.mixin({
    timer: 2500,
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
  

  const onDeleteRowHandler = async e => {

    if(user.role.rolename === 'Administrador'){
      if(window.confirm('Seguro que quiere borrar el almacén?. Los datos no se podrán recuperar')){
        const resp = await deleteModel('almacenes', e.target.dataset.id);
        if(resp.status === 204){
          setSuccessMsg('Almacén eliminado de la base de datos');
          getData();
        }
      }
    } else {
      setErrorMsg('No esta autorizado para eliminar almacenes');
    }
  }

  const onEditRowHandler = e => {
    const value = typeof e == 'string' ? e : e.target.dataset.id;
    navigate(`/almacenes/update/${value}`)
  }

  const columns = [
    
    {
      name: 'ALMACÉN',
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
    navigate('/almacenes/create')
  }
  
  return (
    <AdminDashboard title={'Grupos de Artículos'}>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">

              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h3 className="card-title">Lista de Almacenes</h3>
                  <button className='btn btn-primary' onClick={crearBtnHandler}>Nuevo Almacén</button>
                </div>
                <div className="card-body">
                  {almacenes.length > 0 ? 
                    <DataTable dense
                      columns={columns}
                      data={almacenes}
                      pagination={almacenes.length > 0 ? true : false}
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
    </AdminDashboard>
  )
}

export default ALmacenes