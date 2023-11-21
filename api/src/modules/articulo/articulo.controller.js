import Articulo from "./articulo.model.js";
import Stock from '../stock/stock.model.js';
import Almacen from '../almacen/almacen.model.js';

export const getAllModels = async (req, res) => {
  const { search } = req.params;
    try {
        let models;
        if( search ){
            const reg = `.*${search}.*`;
            const regExp = new RegExp(reg,'i');
            models = await Articulo.find({$or: [{codigoProveedor: regExp}, {codigoPropio: regExp}, {descripcion: regExp }]}).populate(['grupo']);
        } else { 
            models = await Articulo.find().populate(['grupo']);
        }
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
    
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos.', error  })
  }
};
export const getAllInventoryModels = async (req, res) => {
  const { search } = req.params;
  try {
    const models = await Articulo.find({inventariable: true}).populate(['grupo']);
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});

    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos.', error  })
  }
};

export const getModelById = async (req, res) => {
  const { id } = req.params
  try {
      const foundModel = await Articulo.findById(id).populate(['grupo']);

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const createModel = async (req, res) => {

  try {
    const newModel = new Articulo(req.body);

    const modelCreated = await newModel.save();
    
    if(modelCreated && modelCreated.inventariable){
      const almacen = await Almacen.find({nombre: 'Principal'});
      console.log('Almacen==>', almacen);
      await Stock.create({articulo: modelCreated._id, almacen: almacen[0]._id,cantidad: 0});
    }

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

    const updatedModel = await Articulo.findByIdAndUpdate(req.params.id, modelToUpdate, { new: true, populate:'grupo'});
    if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})

    res.status(200).json(updatedModel);
    
} catch (error) {

    res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

}
};

export const deleteModel = async (req, res) => {
  const { id } = req.params
    try {
        const deletedModel = await Articulo.findByIdAndDelete(id);

        if(!deletedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
            
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({mensaje: 'No se pudieron eliminar los datos. Error: ', error  })
    }
};

export const updatePrice = async (req, res) => {
  const { tipo, id, porcentaje } = req.body;
  let condition = {};
  const indice = 1 + parseFloat(porcentaje)/100;

  switch (tipo) {
    case 'grupo':
      condition = { grupo: id }
      break;
    case 'particular':
      condition = { _id: id }
      break;
    default:
      break;
  }
  try {
    const result = await Articulo.updateMany(condition,{$mul: {precio: indice }})
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({mensaje: 'No se pudieron actualizar los precios. Error: ', error  })
  }
}

