
import React, { Fragment, useState } from 'react';
import './style/index.css';

const FilterComponent = ({label, name, options = null, list=[], getValuesFiltered}) => {

    console.log('LISTA', list);
    console.log('OPTIONS', options);
    const [filteredValues, setFilteredValues] = useState('todos');

    const onFilterChangeHandler = e => {
        console.log('VALOR ELEGIDO',e.target.value);
        console.log('NOMBRE ELEGIDO',e.target.name);

        const selectedName = e.target.name;
        const value = e.target.value;

        setFilteredValues(value);
        if(e.target.value === 'todos'){
          getValuesFiltered(list);
        } else {
            if(list.length > 0 && typeof list[0][selectedName] === 'object'){
                const newList = list.filter(item => { 
                    console.log('TYPE',item[selectedName]['nombre']);
                    return item[selectedName]['_id'] === value || item[selectedName]['id'] === value
                });
                getValuesFiltered(newList);

            } else {
                getValuesFiltered(list.filter(item => item[selectedName] === value))
            }
        }
      }
      
    return <>
        <div className="form-inline">
            <label htmlFor="filter">{label}</label>
            <select onChange={onFilterChangeHandler} className="form-control form-control-sm ml-2" name={name} id={name} value={filteredValues}>
                <option key={Math.random()*10000} value={'todos'}>Todos</option>
                {options && options.map(item => { 
                    const key = item._id || item.id;
                    const label = item.apellido ||  item.nombre || item.descripcion;
                    return (<option key={key} value={key}>{label}</option>)
                })}
            </select>
        </div>
    </>;
};

export default FilterComponent
