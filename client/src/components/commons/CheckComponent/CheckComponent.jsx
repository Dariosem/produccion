const CheckComponent = ({label, name='', isChecked, onChange}) => {
  const currentName = name === '' ? label.toLowerCase() : name;
  return (
    <div className="custom-control custom-checkbox">
      <input className="custom-control-input custom-control-input-primary" type="checkbox" id={currentName}  checked={isChecked} name={currentName} onChange={onChange} />
      <label htmlFor={currentName} className="custom-control-label">{label}</label>
    </div>
  )
}
export default CheckComponent