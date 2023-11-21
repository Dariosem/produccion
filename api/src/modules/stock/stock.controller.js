import Stock from "./stock.model.js";
import Articulo from './../articulo/articulo.model.js';

export const getAllModels = async (req, res) => {
  try {
    const models = await Stock.find().populate([{path: 'articulo', populate: {path:'grupo',model: 'Grupoarticulo'}},{path:'almacen', model:'Almacen'}]);
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
    const models2 = await Stock.find();
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const getModelById = async (req, res) => {
  const { id } = req.params
  try {
      const foundModel = await Stock.findById(id).populate({path: 'articulo', populate: {path:'grupo',model: 'Grupoarticulo'}}).populate('almacen');

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const getModelByRef = async (req, res) => {
  const { tipo, id } = req.params
  const tipos = ['articulo', 'almacen']
  console.log('ARTICULO EN GET:::>', id);

  if(!tipos.includes(tipo)) return res.status(404).json({mensaje: 'El tipo de dato solicitado no existe'})

  var foundModel;
  try {
    if(tipo === 'articulo')  foundModel = await Stock.find({articulo: id}).populate({path: 'articulo', populate: {path:'grupo',model: 'Grupoarticulo'}}).populate('almacen');
    if(tipo === 'almacen')  foundModel = await Stock.find({almacen: id}).populate({path: 'articulo', populate: {path:'grupo',model: 'Grupoarticulo'}}).populate('almacen');
    
    if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const createModel = async (req, res) => {

  try {
    const newModel = new Stock(req.body);
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

    const updatedModel = await Stock.findByIdAndUpdate(req.params.id, modelToUpdate, { new: true });
    if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})

    res.status(200).json(updatedModel);
    
  } catch (error) {

      res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

  }
};

export const updateModelByArticulo = async (req, res) => {
  const { id } = req.params;
  let modelToUpdate = {...req.body};
  
  try {

    const updatedModel = await Stock.findOneAndUpdate({articulo: id}, modelToUpdate, { new: true });
    //const updatedModel = await Stock.find({articulo: id});
    if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})

    res.status(200).json(updatedModel);
    
  } catch (error) {

      res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

  }
};

export const deleteModel = async (req, res) => {
  const { id } = req.params
    try {
        const deletedModel = await Stock.findByIdAndDelete(id);

        if(!deletedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
            
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({mensaje: 'No se pudieron eliminar los datos. Error: ', error  })
    }
};

export const materialReceipt = async (req, res) => {
  
  try {
    console.log('YA ESTABAAAAAAAAA');
    //buscar en stocks el item qeu tenga el articulo y este en el almacen indicado
    const itemStockArray = await Stock.find({articulo: req.body.articulo, almacen: req.body.almacen});
    var itemStock = null;
    if(itemStockArray.length > 0){
      itemStock = itemStockArray[0];
  
      //Agregarle la cantidad cargada
      const newQty = itemStock.cantidad + parseInt(req.body.cantidad);
      const updatedStock = await Stock.findByIdAndUpdate(itemStock._id, {cantidad: newQty}, {new: true});
      if(!updatedStock) return res.status(404).json({mensaje: 'No se pudo registrar la nueva cantidad en la base de datos'})

    } else {
    console.log('NUEVOOOOOOOO');

      // Si no encuentra el item de stock con esos datos entonces crear un item nuevo
      const newItemStock = {
        articulo: req.body.articulo,
        almacen: req.body.almacen,
        cantidad: parseInt(req.body.cantidad),
      };

      itemStock = await Stock.create(newItemStock);
      if(!itemStock) return res.status(404).json({mensaje: 'No se pudo registrar el nuevo precio de compra en la base de datos'})

    }

    //Buscar en articulos el articulo correspondiente. y agregar el costo de la ultima compra y la fecha de la ultima compra
    const updatedArticulo = await Articulo.findOneAndUpdate({_id: itemStock.articulo}, {costoUltimaCompra: req.body.costoUltimaCompra});
    if(!updatedArticulo) return res.status(404).json({mensaje: 'No se pudo registrar el nuevo precio de compra en la base de datos'})

    //Generar un log del movimiento de ingreso con la fecha y el usuario que lo generó



    //const updatedModel = await Stock.findOneAndUpdate({articulo: id}, modelToUpdate, { new: true });
    res.status(200).json(itemStock);
    
  } catch (error) {

      res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

  }
};

