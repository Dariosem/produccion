import React, { useEffect, useState } from 'react'
import AdminDashboard from '../../../components/admin/admin.dashboard'
import { useNavigate } from 'react-router-dom';
import { deleteModel, getAll } from '../../../services';
import DataTable from 'react-data-table-component';
import { useAuthContext } from '../../../contexts/auth.context';
import { customTableStyles } from '../../../utils/tables.styles';
import { ToastContainer, toast } from "react-toastify";
import InputSearchComponent from '../../../components/commons/InputSearchComponent/InputSearchComponent';

const Articulos = () => {
  const { user } = useAuthContext();
  const [articulos, setArticulos] = useState([]);

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate()

  const getData = async () => {
    getAll('articulos').then(resp => {
      
      setArticulos(resp.data)

    })
  }

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

    if(user.role.rolename === 'Administrador'){
      if(window.confirm('Seguro que quiere borrar el Artículo?. Los datos no se podrán recuperar y puede generar problemas graves. En su lugar desactivarlo')){
        const resp = await deleteModel('articulos', e.target.dataset.id);
        if(resp.status === 204){
          setSuccessMsg('Artículo eliminado de la base de datos');
          getData();
        }
      }
    } else {
      setErrorMsg('No esta autorizado para eliminar articulos');
    }
  }

  const onEditRowHandler = e => {
    const value = typeof e == 'string' ? e : e.target.dataset.id;
    navigate(`/articulos/update/${value}`)
  }

  const columns = [
    
    {
      name: 'CÓDIGO',
      selector: row => row.codigoPropio,
      sortable: true,
      wrap: true,
      maxWidth: "100px"
    },
    /*{
      name: 'CÓD. PROVEEDOR',
      selector: row => row.codigoProveedor,
      sortable: true,
      wrap: true,
      maxWidth: "200px"
    },*/
    {
      name: 'DESCRIPCIÓN',
      selector: row => row.descripcion,
      sortable: true,
      wrap: true
    },
    {
      name: 'PRECIO',
      selector: row => `$${row.precio.toFixed(2)}`,
      sortable: true,
      wrap: true,
      maxWidth: '120px'
    },
    {
      name: 'TIPO',
      selector: row => row.tipo,
      sortable: true,
      wrap: true,
      maxWidth: '100px'
    },
    {
      name: 'GRUPO',
      selector: row => row.grupo.nombre,
      sortable: true,
      wrap: true,
      maxWidth: '150px'
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
    navigate('/articulos/create')
  }

  
  return (
    <AdminDashboard title={'Artículos'}>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">

              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  {/* <h3 className="card-title">Lista de articulos</h3> */}
                  <InputSearchComponent model={'articulos'} onSearchChange={items => setArticulos(items)} />
                  {user.role.rolename === 'Administrador' && 
                    <div className='ml-auto'><button className='btn btn-primary btn-sm' onClick={crearBtnHandler}>Nuevo Artículo</button></div>
                  }
                </div>
                <div className="card-body">
                  {articulos.length > 0 ? 
                    <DataTable dense
                      columns={columns}
                      data={articulos}
                      pagination={articulos.length > 0 ? true : false}
                      striped
                      highlightOnHover
                      pointerOnHover
                      noDataComponent={false}
                      customStyles={customTableStyles}
                      onRowDoubleClicked={(row) => onEditRowHandler(row._id)}
                      onColumnOrderChange={(cols)=>console.log(cols)}
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

export default Articulos