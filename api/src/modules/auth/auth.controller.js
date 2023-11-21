import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
//import { pool } from '../../services/db.js';
import { passCompare, passEncrypt } from '../../services/crypto.js';
import User from '../user/user.model.js';

dotenv.config();

export const login = async (req, res) => {
    const {dni, password} = req.body;
    
    try {
        
        const userFound = await User.findOne({dni}).populate('role');
        if(!userFound) return res.status(401).json({error: 'El usuario ingresado no existe'})
        
        if(userFound.activo == 0) return res.status(404).json({error: 'El usuario se encuentra bloqueado. Por favor contacte al administrador del sistema'})
        
        const result = await passCompare(password, userFound.password);
        //var result = await bcrypt.compare(password, usuario.password);
            
        if(!result) return res.status(401).json({error: 'La contraseña no es correcta'});

        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            id: userFound._id,
            dni: userFound.dni,
            nombre: userFound.nombre,
            apellido: userFound.apellido,
            email: userFound.email,
            role: userFound.role,
            image: userFound.image,
        }, process.env.SECRET_KEY);

       var userToSend = {
            id: userFound._id,
            dni: userFound.dni,
            nombre: userFound.nombre,
            apellido: userFound.apellido,
            email: userFound.email,
            role: userFound.role,
            image: userFound.image,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
       }
        
        //const userData = {...usuario, roles: userRoles }
       res.cookie('token', token);
        return res.status(200).json({token, user:userToSend});
        
    } catch (error) {
        return res.status(500).json({error: 'Login error => ' + error});
    }

}

export const logout = (req, res) => {
    const { token } = req.params;
  if(!token){
    return res.status(401).json({error: 'Anauthorized - No Token'});
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY);
    res.cookie('token', '', {
        expires: new Date(0)
    });
    return res.status(200).json({message: 'logout succesfully'});

  } catch (error) {
        console.error('Logout error => ', error);
        return res.status(50).json({error: 'Logout error => ' + error});
  }
}

export const forgotPassword = (req, res) => {
    // mandar un email con un link a resetPasword para que se ingrese la nueva contraseña
    res.send('Olvido de password')
}

export const resetPassword = (req, res) => {
    // encriptar y guardar la nueva password
    res.send('Resetear la password')
}

export const getHash = async (req, res) => {
    const hash = await passEncrypt(req.params.pass);
    console.log('Encripted Pass ==>', hash);
    res.send(hash);
}