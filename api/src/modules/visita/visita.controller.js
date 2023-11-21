import Visita from "./visita.model.js";
import * as fs from 'fs';

export const getAllVisitas = async (req, res) => {
  const { search } = req.params;
    try {
        let models;
        if( search ){
            const reg = `.*${search}.*`;
            const regExp = new RegExp(reg,'i');
            models = await Visita.find({$or: [{comentarios: regExp}]}).populate(['paciente', 'profesional']).populate(['articulos.articulo','practicas.articulo']).sort('-fecha');
        } else { 
            models = await Visita.find().populate(['paciente', 'profesional']).populate(['articulos.articulo','practicas.articulo']).sort('-fecha');
        }
        console.log('MODELS::>', models);
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }

};

export const getVisitaById = async (req, res) => {
  const { id } = req.params
  console.log('get visita recibe parametro::>>', id);
  try {
      const foundModel = await Visita.findById(id).populate(['paciente', 'profesional']).populate(['articulos.articulo','practicas.articulo']);

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const getVisitaByPaciente = async (req, res) => {
  const { id } = req.params;

  try {
      const foundModel = await Visita.find({paciente: id}).populate(['paciente', 'profesional']).populate(['articulos.articulo','practicas.articulo']).sort('-fecha');

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const createVisita = async (req, res) => {

  const image = req.file ? req.file.filename : null;

  let modelToCreate = {...req.body};
  modelToCreate.fecha = new Date(req.body.fecha);
/*
  const arrayImagenes = modelToCreate.imagenes;

  let newImagenesArray = []

  arrayImagenes.forEach(async img => {
    // Imagen base64 recibida en la API
    const base64Image = img.imagen
  
    // Decodificación de la imagen base64
    const decodedImage = Buffer.from(base64Image, 'base64');
    const contentType = await imageType(decodedImage)
    console.log('BUFFER DECODED',  contentType);
    newImagenesArray.push({...img, imagen: {data: decodedImage, contentType: contentType.mime}});
    
  });

  modelToCreate.imagenes = newImagenesArray;
*/
  try {
    const newModel = new Visita(modelToCreate);

    const modelCreated = await newModel.save();
    res.status(200).json(modelCreated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateVisita = async (req, res) => {

  console.log('LLEGA A UPDATE',req.body);
  let modelToUpdate = {...req.body};
  modelToUpdate.fecha = new Date(req.body.fecha);
  modelToUpdate.imagenes = req.body.imagenes || [];

  const image = req.file ? req.file.filename : null;

  try {

    const updatedModel = await Visita.findByIdAndUpdate(req.params.id, modelToUpdate, { new: true });
    if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})

    res.status(200).json(updatedModel);
    
} catch (error) {

    res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

}
};

export const deleteVisita = async (req, res) => {
  const { id } = req.params
    try {
        const deletedModel = await Visita.findByIdAndDelete(id);

        if(!deletedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
            
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({mensaje: 'No se pudieron eliminar los datos. Error: ', error  })
    }
};

export const fileUpload = (req, res) => {
  console.log('RECIBE FILE=>', req.file);
  if(req.file)  return res.status(200).json({filename: req.file.filename});
  res.status(500).json({mensaje: 'No se pudo cargar la imagen.' })
}

export const fileDelete = (req, res) => {
  console.log('RECIBE FILE=>', req.body);
  req.body.forEach(file => {
    const fileToDelete = `./src/public/uploads/${file}`;
    fs.unlink(fileToDelete, (error) => {
      if (error) {
        console.error('Error al eliminar el archivo:', error);
        return res.status(500).json({mensaje: `No se pudo eliminar el archivo de la imagen ${file}.`})
      }
      console.log('Archivo de imagen eliminado exitosamente');
      return res.status(200).json({message: 'Archivo de imagen eliminado exitosamente'});
    });
  });
  //if(req.body)  
}



