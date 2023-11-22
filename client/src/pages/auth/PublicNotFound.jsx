import { Link } from 'react-router-dom'

const PublicNotFound = () => {
  return (
        <section className="content">
          <div className="error-page">
            <h2 className="headline text-warning"> 404</h2>
            <div className="error-content">
              <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! La página no se encontró.</h3>
              <p>
                No pudimos encontrar la página que estás buscando.
              </p>
              <p>
                <i className='fa fa-arrow-left text-black-50'/> &nbsp;<Link to="/login">volver al Inicio de sesión</Link>.
              </p>
            </div>
          </div>
        </section>
  )
}

export default PublicNotFound