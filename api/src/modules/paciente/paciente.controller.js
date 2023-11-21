import Paciente from "./paciente.model.js";
import * as fs from 'fs';

export const getAllPacientes = async (req, res) => {
  const { search } = req.params;
    try {
        let models;
        if( search ){
            const reg = `.*${search}.*`;
            const regExp = new RegExp(reg,'i');
            models = await Paciente.find({$or: [{nombre: regExp}, {apellido: regExp}, {dni: regExp }]}).populate('categoria');
        } else { 
            models = await Paciente.find().populate('categoria');
        }
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }

};

export const getPacienteById = async (req, res) => {
  const { id } = req.params
  try {
      const foundModel = await Paciente.findById(id).populate('categoria');

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const getPacienteByDni = async (req, res) => {
  const { dni } = req.params
  try {
      const foundModel = await Paciente.find({dni: dni}).populate('categoria');

      if(!foundModel || foundModel.lengh === 0 ) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const createPaciente = async (req, res) => {

  const image = req.file ? req.file.filename : null;

  let modelToCreate = {...req.body};
  modelToCreate.image = image;
  if(modelToCreate.fechaNacimiento){
    modelToCreate.fechaNacimiento = new Date(req.body.fechaNacimiento);
  } else {
    modelToCreate.fechaNacimiento = null;
  }

  try {
    const newModel = new Paciente(modelToCreate);

    const modelCreated = await newModel.save();
    res.status(200).json(modelCreated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updatePaciente = async (req, res) => {
  const { id } = req.params;

  let modelToUpdate = {...req.body};
  const image = req.file ? req.file.filename : null;
  modelToUpdate.fechaNacimiento = new Date(req.body.fechaNacimiento);

  try {
    if(image){
      modelToUpdate.image = image;
      const oldModel = await Paciente.findById(req.params.id);
      if(oldModel.image && oldModel.image !== ''){
        const fileToDelete = `./src/public/uploads/${oldModel.image}`;
        fs.unlink(fileToDelete, (error) => {
          if (error) {
            console.error('Error al eliminar el archivo:', error);
            return;
          }
        
          console.log('Archivo eliminado exitosamente');
        });
      }
    }

    const updatedModel = await Paciente.findByIdAndUpdate(req.params.id, modelToUpdate, { new: true });
    if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})

    res.status(200).json(updatedModel);
    
} catch (error) {

    res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

}
};

export const deletePaciente = async (req, res) => {
  const { id } = req.params
    try {
        const deletedModel = await Paciente.findByIdAndDelete(id);

        if(!deletedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
            
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({mensaje: 'No se pudieron eliminar los datos. Error: ', error  })
    }
};

