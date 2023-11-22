const SelectComponent = ({children=null, opciones, label, name=null, onChange, value, group = true, isRequired = false, selectCustomClass = "col-sm-10", labelCustomClass="col-sm-2", placeHolder=true, isDisabled=false}) => {
  const completeLabel = isRequired ? `${label} <span className='text-red'>*</span>` : label;
  const selectName = name ? name : label.toLowerCase()
  return (<>
    {group === true 
      ? <div className="form-group row">
      <label htmlFor={label.toLowerCase()} className={`${labelCustomClass} text-sm-right`}>{label+':'} <span className='text-red'>{isRequired && '*'}</span></label>
      <div className={selectCustomClass}>
        <select className="form-control form-control-sm form-inline" name={selectName} id={label.toLowerCase()} aria-label={`selección de ${label.toLowerCase()}`} onChange={onChange} value={value} disabled={isDisabled}>
          {placeHolder && <option value={0} className="text-muted">Seleccionar ...</option>}
          {opciones && opciones.map(item => <option key={item.id + '-'+ Math.round(Math.random()*1000)} value={item.id}>{`${item.nombre}`}</option>)}
        </select>
        {children}
      </div>
    </div>
    : <>
      <label htmlFor={label.toLowerCase()} className={`${labelCustomClass} text-sm-right`}>{label+':'} <span className='text-red'>{isRequired && '*'}</span></label>
      <div className={selectCustomClass}>
        <select className="form-control form-control-sm" name={selectName} id={label.toLowerCase()} aria-label={`selección de ${label.toLowerCase()}`} onChange={onChange} value={value}>
          {placeHolder && <option value={0} className="text-muted">Seleccionar ...</option>}
          {opciones && opciones.map(item => <option key={item.id + '-'+ Math.round(Math.random()*1000)} value={item.id}>{`${item.nombre}`}</option>)}
        </select>
        {children}
      </div>
      </>
    }
  </>
    
  )
}
export default SelectComponent