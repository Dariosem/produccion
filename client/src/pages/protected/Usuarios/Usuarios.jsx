import React, { useCallback, useEffect, useState } from 'react'
import AdminDashboard from '../../../components/admin/admin.dashboard'
import { deleteModel, getAll } from '../../../services/data.service'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { customTableStyles } from '../../../utils/tables.styles';
import { config } from '../../../utils/config';

const Usuarios = () => {

  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate()

  const getData = useCallback(async () => {
    getAll('users').then(resp => {
      setUsuarios(resp.data)
    })
  })

  const onDeleteUserHandler = async e => {
    const resp = await deleteModel('users', e.target.dataset.id);
  }

  const onEditUserHandler = e => {
 
    const value = typeof e == 'string' ? e : e.target.dataset.id;
    navigate(`/usuarios/update/${value}`);
  }

  const columns = [
    {
      name: 'IMAGEN',
      button: false,
      maxWidth: "100px",
      cell: row => {
        const url = row.image && row.image !== 'null' ? `${config.imageUrl}/${row.image}` : '../../img/avatardefault2.png';
        return (

        <span>
          <img src={url} className='img-fluid img-circle' style={{width:'30px', height:'30px'}} width={35} alt="Avatar del paciente" />
        </span>
        )
      }
      
    },{
      name: 'NOMBRE',
      selector: row => row.nombre,
      sortable: true
    },
    {
      name: 'APELLIDO',
      selector: row => row.apellido,
      sortable: true
    },
    {
      name: 'DNI',
      selector: row => row.dni,
      sortable: true,
      maxWidth: "100px"
    },
    {
      name: 'EMAIL',
      selector: row => row.email,
      sortable: true,
      maxWidth: "250px"
    },
    {
      name: 'ROL',
      selector: row => row.role.rolename,
      sortable: true,
      maxWidth: "150px"
    },
    {
      name: 'ACCIONES',
  		button: true,

	  	cell: (row) => <span>
                    <button className='btn btn-sm btn-warning p-0'>
                      <i className="far fa-edit m-1" data-id={row._id} onClick={onEditUserHandler}></i>
                    </button>
                    <button className='btn btn-sm btn-danger ml-1 p-0'>
                      <i className="fa fa-trash m-1" data-id={row.id} onClick={onDeleteUserHandler}></i>
                    </button>
                  </span>,
    }
  ]

  useEffect(() => {
    getData()
  }, [])

  const crearUsuarioBtnHandler = () => {
    navigate('/usuarios/create')
  }
  
  return (
    <AdminDashboard title={'Usuarios'}>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">

              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <h3 className="card-title">Lista de Usuarios</h3>
                  <button className='btn btn-primary' onClick={crearUsuarioBtnHandler}>Nuevo Usuario</button>
                </div>
                <div className="card-body">
                  {usuarios.length > 0 ? 
                    <DataTable dense
                      columns={columns}
                      data={usuarios}
                      pagination={usuarios.length > 0 ? true : false}
                      striped
                      highlightOnHover
                      pointerOnHover
                      noDataComponent={false}
                      customStyles={customTableStyles}
                      onRowDoubleClicked={(row) => onEditUserHandler(row._id)}
                    />
                    : <h5 className='text-center'>No hay Usuarios cargados</h5>
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

export default Usuarios