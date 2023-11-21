import User from "./user.model.js";
import { passEncrypt } from "../../services/crypto.js";
import * as fs from 'fs';

export const getAllUsers = async (req, res) => {
  try {
    const models = await User.find().populate('role');
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }

};

export const getUserById = async (req, res) => {
  const { id } = req.params
  try {
      const foundModel = await User.findById(id).populate('role');

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const createUser = async (req, res) => {

  const image = req.file ? req.file.filename : null;

  const encryptedPass = await passEncrypt(req.body.password);

  let modelToCreate = {...req.body};
  modelToCreate.password = encryptedPass;
  modelToCreate.image = image;

  try {
    const newUser = new User(modelToCreate);

    const userCreated = await newUser.save();
    res.status(200).json({
      id: userCreated._id,
      dni: userCreated.dni,
      nombre: userCreated.nombre,
      apellido: userCreated.apellido,
      email: userCreated.email,
      role: userCreated.role,
      image: userCreated.image,
      active: userCreated.active,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  let modelToUpdate = {...req.body};
  const image = req.file ? req.file.filename : null;

  if (req.body.password) {
    const encryptedPass = await passEncrypt(req.body.password);
    modelToUpdate.password = encryptedPass;
  } 
  
  
  try {
    if(image){
      modelToUpdate.image = image;
      const oldModel = await User.findById(req.params.id);
      if(oldModel.image && oldModel.image !== ''){
        console.log('IMAGNE ANTERIOR', oldModel.image);
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
    

    const updatedModel = await User.findByIdAndUpdate(req.params.id, modelToUpdate, { new: true, populate:'role' });
    if(!updatedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})

    res.status(200).json({
      id: updatedModel._id,
      dni: updatedModel.dni,
      nombre: updatedModel.nombre,
      apellido: updatedModel.apellido,
      email: updatedModel.email,
      role: updatedModel.role,
      image: updatedModel.image,
      active: updatedModel.active,
      createdAt: updatedModel.createdAt,
      updatedAt: updatedModel.updatedAt,
  });
    
} catch (error) {

    res.status(500).json({mensaje: 'No se pudieron modificar los datos.', error })

}
};

export const deleteUser = async (req, res) => {
  const { id } = req.params
    try {
        const deletedModel = await User.findByIdAndDelete(id);

        if(!deletedModel) return res.status(404).json({mensaje: 'No se encontró el registro en la base de datos'})
            
        return res.sendStatus(204);
        
    } catch (error) {
        return res.status(500).json({mensaje: 'No se pudieron eliminar los datos. Error: ', error  })
    }
};

