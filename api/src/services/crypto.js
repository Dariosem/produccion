//import argon2 from 'argon2';
import bcrypt from "bcrypt";

export const passEncrypt = async (password) => {
    const saltRounds = 10;
    try {
        //const hash = await argon2.hash(password);
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
      } catch (err) {
        console.log('Error en la creación del hash ==> ', err);
        return null
      }
}

export const passCompare = async (password,storedPassword) => {
    try {
        //const compare =  await argon2.verify(storedPassword, password)
        const compare = bcrypt.compareSync(password, storedPassword);
        return  compare
    } catch (error) {
        console.log('Error en la comparacion de contraseña ==> ', error);
        return false
    }
}
