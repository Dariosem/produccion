import Profesional from "./profesional.model.js";
import Turno from '../turnos/turno.model.js';
import * as fs from 'fs';
import { getColorShineIndex } from "../../services/color.shine.js";

export const getAllProfesionales = async (req, res) => {
  const { search } = req.params;
    console.log('params::>',search );
    try {
        let models;
        if( search ){
            const reg = `.*${search}.*`;
            const regExp = new RegExp(reg,'i');
            models = await Profesional.find({$or: [{nombre: regExp}, {apellido: regExp}, {especialidad: regExp }, {dni: regExp }]});
        } else { 
            models = await Profesional.find();
        }
        console.log('MODELS::>', models);
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }

};

export const getProfesionalById = async (req, res) => {
  const { id } = req.params
  console.log('Update profesional recibe parametro::>>', id);
  try {
      const foundModel = await Profesional.findById(id);

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const createProfesional = async (req, res) => {

  const image = req.file ? req.file.filename : null;

  let modelToCreate = {...req.body};
  modelToCreate.image = image;
  try {
    const newModel = new Profesional(modelToCreate);

    const modelCreated = await newModel.save();
    res.status(200).json(modelCreated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateProfesional = async (req, res) => {
  const { id } = req.params;

  let modelToUpdate = {...req.body};
  const image = req.file ? req.file.filename : null;

  try {
    if(image){
      modelToUpdate.image = image;
      const oldModel = await Profesional.findById(req.params.id);
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

    const updatedModel = await Profesional.findByIdAndUpdate(req.params.id, modelToUpdate, { new: true });

    if(modelToUpdate.color){
      await Turno.updateMany(
        {profesional: req.params.id, sobreturno: false, plasma: false}, 
        {$set: {
          backgroundColor: modelToUpdate.color,
          color: modelToUpdate.color,
          textColor: getColorShineIndex(modelToUpdate.color) > 0.5 ? 'black' : 'white'
        }}
      )
      await Turno.updateMany(
        {profesional: req.params.id, sobreturno: true, plasma: false}, 
        {$set: {
          color: modelToUpdate.color,
        }}
      )
      await Turno.updateMany(
        {profesional: req.params.id, sobreturno: false, plasma: true}, 
        {$set: {
          backgroundColor: modelToUpdate.color,
          textColor: getColorShineIndex(modelToUpdate.color) > 0.5 ? 'black' : 'white'
        }}
      )
      // await Turno.updateMany(
      //   {profesional: req.params.id, sobreturno: true, plasma: true}, 
      //   {$set: {
      //     textColor: 'black',
      //   }}
      // )
    }


    if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})

    res.status(200).json(updatedModel);
    
} catch (error) {

    res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

}
};

export const deleteProfesional = async (req, res) => {
  const { id } = req.params
    try {
        const deletedModel = await Profesional.findByIdAndDelete(id);

        if(!deletedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
            
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({mensaje: 'No se pudieron eliminar los datos. Error: ', error  })
    }
};

