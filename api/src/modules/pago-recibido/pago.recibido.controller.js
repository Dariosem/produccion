import Remito from "../remito/remito.model.js";
import PagoRecibido from "./pago.recibido.model.js";

export const getAllModels = async (req, res) => {
  const { search } = req.params;
  console.log('SEARCH=>=', search);
  const populateOptions = [
    {
      path:'usuarioCobro',
      select: '-password',
      populate:'role'
    },
    {
      path:'remitos', 
      populate: [
        {path:'paciente', populate: 'categoria'},
        {path:'articulos', populate: 'articulo'},
        {path:'practicas', populate: 'articulo'}
      ]
    }
  ];

  try {
    let models;
    if( search ){
        const reg = `.*${search}.*`;
        const regExp = new RegExp(reg,'i');
        console.log('exp Reg-->', regExp);
        // REVISAR ESTE FILTRO QUE NO ANDAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        models = await PagoRecibido.find({'remitos.paciente.nombre': regExp}).populate(populateOptions).sort({fecha: -1});
        
    } else { 
        models = await PagoRecibido.find().populate(populateOptions).sort({fecha: -1});
                    
    }
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos.', error  })
  }

};

export const getModelById = async (req, res) => {
  const { id } = req.params
  try {
      const foundModel = await PagoRecibido.findById(id);

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const createModel = async (req, res) => {

  console.log('LLEGA A PAGO RECIBIDO::>', req.body);
  try {
    const newModel = new PagoRecibido(req.body);

    const modelCreated = await newModel.save();

    let montoPagoRemanente = modelCreated.monto
    //recuperar los remitos involucrados
    //Recuperar el montoTotal y montoDeuda del remito
    //ordenar los remitos de mas antiguo al mas nuevo
    const remitosPaid = await Remito.find({_id: { $in: modelCreated.remitos}}, 'fecha montoDeuda montoTotal').sort({ fecha: 1 });
    console.log('REMITO ENCONTRADO', remitosPaid);

    //recorrer los remitos usando el monto del pago para cancelar desde el mas viejo al mas nuevo
    remitosPaid.forEach(async remito => {
      let newMontoDeudaRemito = 0;
      let newEstadoRemito = 'pendiente';
      if(remito.montoDeuda <= montoPagoRemanente){
        newEstadoRemito = 'pagado';
        montoPagoRemanente -= remito.montoDeuda;
      } else {
        newMontoDeudaRemito = remito.montoDeuda - montoPagoRemanente
        montoPagoRemanente = 0;
      }
      //En el remito Actualizar el montoDeuda y si el pago cubre el total cambiar el estado
      await Remito.findByIdAndUpdate(remito._id,{ estado: newEstadoRemito, montoDeuda: newMontoDeudaRemito });

    });

    

    res.status(200).json({pago: modelCreated, montoRemanente: montoPagoRemanente});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateModel = async (req, res) => {
  const { id } = req.params;
  let modelToUpdate = {...req.body};

  try {

    const updatedModel = await PagoRecibido.findByIdAndUpdate(req.params.id, modelToUpdate, { new: true });
    if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})

    res.status(200).json(updatedModel);
    
} catch (error) {

    res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

}
};

export const deleteModel = async (req, res) => {
  const { id } = req.params
    try {
        const deletedModel = await PagoRecibido.findByIdAndDelete(id);

        if(!deletedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
            
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({mensaje: 'No se pudieron eliminar los datos. Error: ', error  })
    }
};

