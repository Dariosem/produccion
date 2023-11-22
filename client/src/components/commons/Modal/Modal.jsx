import './Modal.css';

const Modal = ({children, title = 'Título del modal', isOpen = false, onClose, onOk = null, fullWidth = false, scrollable = false}) => {
  return (
    <div className={`custom-modal fade ${isOpen && 'show'}`} id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" >
        <div className={`modal-dialog modal-dialog-centered ${fullWidth && 'modal-wide'} ${scrollable && ' modal-dialog-scrollable'}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">{title}</h5>
              <button type="button" className="btn btn-sm btn-danger" aria-label="Close" onClick={onClose} >X</button>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>{onOk ? 'Cancelar' : 'Cerrar'}</button>
              {onOk && <button type="button" className="btn btn-primary btn-sm" onClick={onOk}>Aceptar</button>}
            </div>
          </div>
        </div>
      </div>
  )
}
export default Modal