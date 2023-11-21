
import Turno from './turno.model.js';

export const getAllTurnos = async (req, res) => {
    const { search } = req.params;
    console.log('params::>',search );
    try {
        let models;
        if( search ){
            const reg = `.*${search}.*`;
            const regExp = new RegExp(reg,'i');
            models = await Turno.find({estado: {$ne: 'cancelado'}}).or({title: regExp}).populate(['paciente', 'profesional']).sort('start');
        } else {
            models = await Turno.find({estado: {$ne: 'cancelado'}}).populate(['paciente', 'profesional']).sort('start');
        }
    
        if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
        res.status(200).json(models);
    } catch (error) {
        res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
    }

};

export const getAllFilteredTurnos = async (req, res) => {
    console.log("Filtro====>",req.body);
    const filtro ={ ...req.body};
    let filterRequest = {estado: {$ne: 'cancelado'}};
    let claves = Object.keys(filtro);
    for(let i=0; i< claves.length; i++){
        console.log('CLAVE=>', claves[i]);
        if(filtro[claves[i]] !== '' && claves[i] !== 'start' &&  claves[i] !== 'end' && claves[i] !== 'fechaCambioEstado'){
            filterRequest[claves[i]] = filtro[claves[i]];
        }
    }

    console.log("filterRequest====>",filterRequest);
    
    try {
        const models = await Turno.find(filterRequest).populate(['paciente', 'profesional']).sort('start');
    
        if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});

        let diaFiltro,mesFiltro,anioFiltro;
        let response = models;

        if(filtro.start && filtro.start !== '') {
            diaFiltro = new Date(filtro.start).getUTCDate();
            mesFiltro = new Date(filtro.start).getUTCMonth();
            anioFiltro = new Date(filtro.start).getUTCFullYear();
            response = response.filter(item => 
                item.start.getDate() === diaFiltro
                && item.start.getMonth() === mesFiltro
                && item.start.getFullYear() === anioFiltro
            )
        }

        if(filtro.end && filtro.end !== '') {
            diaFiltro = new Date(filtro.end).getUTCDate();
            mesFiltro = new Date(filtro.end).getUTCMonth();
            anioFiltro = new Date(filtro.end).getUTCFullYear();
            response = response.filter(item => 
                item.end.getDate() === diaFiltro
                && item.end.getMonth() === mesFiltro
                && item.end.getFullYear() === anioFiltro
            )
        }
        
        if(filtro.fechaCambioEstado && filtro.fechaCambioEstado !== '') {
            diaFiltro = new Date(filtro.fechaCambioEstado).getUTCDate();
            mesFiltro = new Date(filtro.fechaCambioEstado).getUTCMonth();
            anioFiltro = new Date(filtro.fechaCambioEstado).getUTCFullYear();
            response = response.filter(item => 
                item.fechaCambioEstado.getDate() === diaFiltro
                && item.fechaCambioEstado.getMonth() === mesFiltro
                && item.fechaCambioEstado.getFullYear() === anioFiltro
            )
        }
        
        console.log('RESPUESTA', response);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
    }

};

export const getTurnoById = async (req, res) => {
    const { id } = req.params
    try {
        const foundModel = await Turno.findById(id);

        if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
            
        res.status(200).json(foundModel)
        
    } catch (error) {
        res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
    }
};

export const createTurno = async (req, res) => {
    console.log('Recibe en turno==>', req.body);
    const newModel = new Turno(req.body);

    try {
        const savedModel = await newModel.save();
        res.status(200).json(savedModel);    
    } catch (error) {
        res.status(500).json({mensaje: 'No se pudieron cargar los datos. Error: ', error  })
    }
    
};

export const updateTurno = async (req, res) => {

    try {

        const updatedModel = await Turno.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
        res.status(200).json(updatedModel);
        
    } catch (error) {

        res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

    }
};

export const deleteTurno = async (req, res) => {
    const { id } = req.params
    try {
        const deletedModel = await Turno.findByIdAndDelete(id);

        if(!deletedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
            
        return res.sendStatus(204)
        
    } catch (error) {
        return res.status(500).json({mensaje: 'No se pudieron eliminar los datos. Error: ', error  })
    }
};
