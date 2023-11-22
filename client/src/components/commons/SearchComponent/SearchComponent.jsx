
import { useEffect, useState } from 'react';
import Modal from './../Modal/Modal';
import InputComponent from '../InputComponent/InputComponent';
import { getAll } from '../../../services/data.service';

import './style/index.css';
import DataTable from 'react-data-table-component';

const SearchComponent = ({model='', onSearchSelection, getInitialOptions = false, customBtnClass='btn btn-sm btn-outline-secondary p-0 d-inline', additionalBtnClass=''}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [optionList, setOptionList] = useState([]);
    const [optionSelected, setOptionSelected] = useState(null);
    const [inputText, setInputText] = useState('');
    const [isClearSelection, setIsClearSelection] = useState(false)

    const completeBtnClass = customBtnClass + ' ' + additionalBtnClass;

    useEffect(() => {
        if(getInitialOptions){
            getData('Venta')
        }
    }, [])
    
    const onSearchBtnClickHandler = () => setIsOpen(true);

    const onCloseHandler = () => {
        setIsOpen(false)
        clearAllSearchComponent();
    };

    const onOkHandler = () => {
        onSearchSelection(optionSelected)
        setIsOpen(false);
        clearAllSearchComponent();
    };

    const columns = [
        {
            name: model==='articulos' ? 'CÓDIGO': null,
            selector: row => model==='articulos' ? row.codigoPropio : null,
            sortable: true,
            wrap: true,
            maxWidth: "200px",
            omit: model!=='articulos'
          },
          {
            name: model==='articulos' ? 'DESCRIPCIÓN' : 'NOMBRE',
            selector: row => model === 'pacientes' || model === 'users' || model === 'profesionales' ? `${row.apellido}, ${row.nombre}` : row.nombre || row.descripcion || row.rolename,
            sortable: true,
            wrap: true
          },
          {
            name: model==='articulos' ? 'TIPO' : null,
            selector: row => model === 'articulos' && row.tipo,
            sortable: true,
            wrap: true,
            maxWidth: '150px',
            omit: model!=='articulos'
          },
    ]

    const getData = async (text) => {
        if(model !== ''){
            const resp = await getAll(model, text);
            setOptionList(resp.data);

        }
    }

    const onInputSearchChangeHandler = e => {
        const text = e.target.value
        setInputText(text);
        getData(text)
    }

    const onSelectedRowsChangeHandler = e => {
        console.log('selec en searchcompnonet',e);
        if(e.selectedCount === 1){
            setOptionSelected(e.selectedRows[0]);
        }
    }

    const onRowDoubleClickedHandler = (row) => {
        onSearchSelection(row);
        setIsOpen(false)
        clearAllSearchComponent();

    }

    const onClearSelectionHandler = () => {
        setIsClearSelection(!isClearSelection);
    }

    const clearAllSearchComponent = () => {
        setInputText('');
        setOptionList([]);
        //setOptionSelected(null);
        onClearSelectionHandler();
    }

    return <>
        <button className={completeBtnClass}>
            <i className="fa fa-search p-2" onClick={onSearchBtnClickHandler}></i>
        </button>
        <Modal title='Buscar' isOpen={isOpen} onClose={onCloseHandler} onOk={onOkHandler} scrollable={true}>
            <InputComponent type='text' label={'Buscar'} name={'search'} value={inputText} onChange={onInputSearchChangeHandler} group={false}/>
            <DataTable
                columns={columns}
                data={optionList}
                dense = {true}
                selectableRows
                onSelectedRowsChange={onSelectedRowsChangeHandler}
                noDataComponent='No hay registros que cumplan la condición'
                onRowDoubleClicked={onRowDoubleClickedHandler}
                clearSelectedRows={onClearSelectionHandler}
                />
        </Modal>
    </>
};

export default SearchComponent
