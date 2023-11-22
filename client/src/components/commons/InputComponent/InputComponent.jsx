const InputComponent = ({type = 'text', label, name=null, value = null, onChange, onBlur=null, group = true, isRequired = false, inputCustomClass = "col-sm-10", labelCustomClass="col-sm-2", disabled = false, readOnly=false, step=1, placeholder=true}) => {
  const completeLabel = isRequired ? `${label} <span className='text-red'>*</span>` : label;
  const inputName = name ? name : label.toLowerCase()
  
  return (<>
    {group === true
      ? <div className="form-group row">
          <label htmlFor={inputName} className={`${labelCustomClass} mb-0 text-sm-right`}>{label+':'} <span className='text-red'>{isRequired && '*'}</span></label>
          <div className={inputCustomClass}>
            <input type={type} className="form-control form-control-sm" id={inputName} placeholder={placeholder ? label + '...' : ''} value={value} name={inputName} onChange={onChange} required={isRequired} disabled={disabled} readOnly={readOnly} step={step} autoComplete="off"/>
          </div>
        </div>
      : <>
        <label htmlFor={inputName} className={`${labelCustomClass} mb-0 text-sm-right`}>{label+':'} <span className='text-red'>{isRequired && '*'}</span></label>
          <div className={inputCustomClass}>
            <input type={type} className="form-control form-control-sm" id={inputName} placeholder={placeholder ? label + '...' : ''} value={value} name={inputName} onChange={onChange} onBlur={onBlur} required={isRequired} disabled={disabled} readOnly={readOnly} step={step} autoComplete="off"/>
          </div>
        </>
    }
  </>)
}

export default InputComponent;

