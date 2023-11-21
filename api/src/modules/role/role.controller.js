
import Role from './role.model.js'

export const getAllRoles = async (req, res) => {
    const { search } = req.params;
    try {
        let models;
        if( search ){
            const reg = `.*${search}.*`;
            const regExp = new RegExp(reg,'i');
            models = await Role.find({$or: [{rolename: regExp}]});
        } else { 
            models = await Role.find();
        }
        if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
        
        res.status(200).json(models);

    } catch (error) {
        res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
    }

};

export const getRoleById = async (req, res) => {
    const { id } = req.params
    try {
        const foundModel = await Role.findById(id);

        if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
            
        res.status(200).json(foundModel)
        
    } catch (error) {
        res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
    }
};

export const createRole = async (req, res) => {
    
    const { rolename, description } = req.body;

    const newModel = new Role({ rolename, description });

    try {
        const savedModel = await newModel.save();
        res.status(200).json(savedModel);    
    } catch (error) {
        res.status(500).json({mensaje: 'No se pudieron cargar los datos. Error: ', error  })
    }
    
};

export const updateRole = async (req, res) => {

    try {

        const updatedModel = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
        res.status(200).json(updatedModel);
        
    } catch (error) {

        res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

    }
};

export const deleteRole = async (req, res) => {
    const { id } = req.params
    try {
        const deletedModel = await Role.findByIdAndDelete(id);

        if(!deletedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
            
        return res.status(200).json(deletedModel)
        
    } catch (error) {
        return res.status(500).json({mensaje: 'No se pudieron eliminar los datos. Error: ', error  })
    }
};
