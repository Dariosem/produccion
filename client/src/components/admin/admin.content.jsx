import { Link } from "react-router-dom"

const AdminContent = ({title, children}) => {
  return (
<div className="content-wrapper">
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">{title}</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><Link to="/agenda">Agenda</Link></li>
            <li className="breadcrumb-item active">{title}</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  {children}
</div>

  )
}

export default AdminContent