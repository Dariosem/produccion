
import React, { useEffect, useState } from 'react';
import './style/index.css';

const DateRangeFilter = ({ list=[], getValuesFiltered}) => {

    const [filteredFromValues, setFilteredFromValues] = useState(null);
    const [filteredList, setFilteredList] = useState(list)

    useEffect(() => {
        setFilteredList(list)    
    }, [list]);

    const onFromFilterChangeHandler = e => {
        console.log('VALOR ELEGIDO',e.target.value);
        console.log('NOMBRE ELEGIDO',e.target.name);

        const value = e.target.value;

        const newList = filteredList?.filter(item => {
            const itemDate = new Date(item.fecha);
            const selectedDate = new Date(value);
            return itemDate >= selectedDate
        });

        getValuesFiltered(newList)
        setFilteredFromValues(newList);

        getValuesFiltered()
        

        
      }
      
    return <div className='d-flex'>
        <div className="form-inline">
            <label htmlFor="filter">Desde</label>
            <input type="date" name="desde" id="desde" value={filteredFromValues}  onChange={onFromFilterChangeHandler} className="form-control form-control-sm ml-2"/>
        </div>
        
    </div>;
};

export default DateRangeFilter
