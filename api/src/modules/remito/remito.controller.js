import Remito from "./remito.model.js";
import Stock from './../stock/stock.model.js';

export const getAllModel = async (req, res) => {

  try {
    let models = await Remito.find().populate(['paciente', 'profesional', 'articulos.articulo', 'practicas.articulo']);
    
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }

};

export const getModelById = async (req, res) => {
  const { id } = req.params;
  try {
      const foundModel = await Remito.findById(id).populate(['paciente', 'profesional', 'articulos.articulo', 'practicas.articulo']);

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const getModelByPaciente = async (req, res) => {
  const { id } = req.params;

  try {
      const foundModel = await Remito.find({paciente: id}).populate(['paciente', 'profesional']).populate(['articulos.articulo','practicas.articulo']);

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const getModelByPacienteDeuda = async (req, res) => {
  const { id } = req.params;

  try {
      const foundModel = await Remito.find({paciente: id, montoDeuda: { $gt: 0 } }).populate(['paciente', 'profesional']).populate(['articulos.articulo','practicas.articulo']);

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const createModel = async (req, res) => {

  let modelToCreate = {...req.body};
  modelToCreate.fecha = new Date();
  
  try {
    //buscar el último numero de remito y sumarle uno para darle el valor al remito nuevo
    const respNumero = await Remito.find().sort('-numero').limit(1);

    const ultimoNumero = respNumero.length === 0 ? 0 :  respNumero[0].numero

    modelToCreate.numero = ultimoNumero + 1

    var montoTotal = 0;
      if (modelToCreate.articulos) {
        modelToCreate.articulos.forEach(item => {
          return montoTotal += parseFloat(item.precio || 0)*parseFloat(item.cantidad)
        });
      }

      if (modelToCreate.practicas) {
        modelToCreate.practicas.forEach(item => {
          return montoTotal += parseFloat(item.precio || 0)*parseFloat(item.cantidad)
        });
      }
    

    modelToCreate.montoTotal = montoTotal;
    modelToCreate.montoDeuda = montoTotal;

    const newModel = new Remito(modelToCreate);

    const modelCreated = await newModel.save();

    //Buscar el stock relacionado a cada uno de los articulos y descontar las cantidades
    modelCreated.articulos.forEach(async item => {
      
      const stockArray = await Stock.find({articulo: item.articulo._id});
      const stockItem = stockArray[0];
      
      const newQty = stockItem.cantidad - item.cantidad;
      await Stock.findByIdAndUpdate(stockItem._id, {cantidad: newQty });
    })

    res.status(200).json(modelCreated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateModel = async (req, res) => {
  const { id } = req.params;

  let modelToUpdate = {...req.body};
  modelToUpdate.fecha = new Date(req.body.fecha);

  try {

    const updatedModel = await Remito.findByIdAndUpdate(req.params.id, modelToUpdate, { new: true });
    if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})

    res.status(200).json(updatedModel);
    
} catch (error) {

    res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

}
};

export const deleteModel = async (req, res) => {
  const { id } = req.params
    try {
        const deletedModel = await Remito.findByIdAndDelete(id);

        if(!deletedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
            
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({mensaje: 'No se pudieron eliminar los datos. Error: ', error  })
    }
};

