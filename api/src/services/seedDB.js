import Role from "../modules/role/role.model.js";
import User from "../modules/user/user.model.js";
import Grupoarticulo from "../modules/grupo-articulo/grupoArticulo.model.js";

import { passEncrypt } from "./crypto.js";

export default async function seedDB(){

    const users = await User.find();
    if(!users || users.length < 1) {
        //await Almacen.create({nombre: 'Principal', descripcion: 'Almacén por defecto'});
        await Grupoarticulo.create({nombre: 'Artículo', descripcion: 'Artículo individual a ser construida'});
        await Grupoarticulo.create({nombre: 'Materia Prima', descripcion: 'Materia prima utilizada para la construcción de artículos'});
        await Grupoarticulo.create({nombre: 'Conjunto', descripcion: 'Conjunto ensamblado compuesto por artículos individuales'});

        
        await Role.create({rolename: 'Administrador'});
        await Role.create({rolename: 'Supervisor'});
        await Role.create({rolename: 'Operario'});

        const newRoleArray = await Role.find();
        const roleId = newRoleArray[0]._id;
    
        const encryptedPass = await passEncrypt('1234');
    
        const user1 = new User({
        email: 'dasemenzato@hotmail.com',
        nombre:'Dario',
        apellido: 'Semenzato',
        dni: '20917491',
        password: encryptedPass,
        role: roleId,
        image: '',
        active: 1
        });
        await user1.save();
    
    }
}