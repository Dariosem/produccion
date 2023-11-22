
import React, { Fragment, useState } from 'react';
import './style/index.css';
import { getAll } from '../../../services';

const InputSearchComponent = ({model, onSearchChange}) => {
    const [searching, setSearching] = useState(false)
    const [valueSelected, setValueSelected] = useState('');

    const onInputSearchChangeHandler = async e => {
        const value = e.target.value;
        setValueSelected(value);
        setSearching( value === '' ? false : true);
        const { data } = await getAll(model, value)
        console.log(data);
        onSearchChange(data);
        
    }
    const onCleanInput = async () => {
        const { data } = await getAll(model)
        console.log(data);
        onSearchChange(data);
        setSearching(false);
        setValueSelected('');
    }
    const iconContent = searching ? <i className='fa fa-times' onClick={onCleanInput}></i> : <i className='fa fa-search'></i>
    return <>
        <div className="input-group w-25">

            <input type="text" className="form-control" value={valueSelected} onChange={onInputSearchChangeHandler} placeholder="Buscar..." />
            <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">{iconContent}</span>
            </div>

        </div>

    </>
};

export default InputSearchComponent
