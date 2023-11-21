import GrupoArticulo from "./grupoArticulo.model.js";

export const getAllModels = async (req, res) => {
  const { search } = req.params;
  console.log('SEARCH=>=', search);
    try {
        let models;
        if( search ){
            const reg = `.*${search}.*`;
            const regExp = new RegExp(reg,'i');
            models = await GrupoArticulo.find({$or: [ {nombre: regExp}]});
        } else { 
            models = await GrupoArticulo.find();
        }
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos.', error  })
  }
  /*
  try {
    const models = await Articulo.find();
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
  */

};

export const getModelById = async (req, res) => {
  const { id } = req.params
  try {
      const foundModel = await GrupoArticulo.findById(id);

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const createModel = async (req, res) => {

  try {
    const newModel = new GrupoArticulo(req.body);

    const modelCreated = await newModel.save();
    res.status(200).json(modelCreated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateModel = async (req, res) => {
  const { id } = req.params;
  let modelToUpdate = {...req.body};

  try {

    const updatedModel = await GrupoArticulo.findByIdAndUpdate(req.params.id, modelToUpdate, { new: true });
    if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})

    res.status(200).json(updatedModel);
    
} catch (error) {

    res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

}
};

export const deleteModel = async (req, res) => {
  const { id } = req.params
    try {
        const deletedModel = await GrupoArticulo.findByIdAndDelete(id);

        if(!deletedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
            
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({mensaje: 'No se pudieron eliminar los datos. Error: ', error  })
    }
};

