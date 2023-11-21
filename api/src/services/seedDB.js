import Role from "../modules/role/role.model.js";
import User from "../modules/user/user.model.js";
import Almacen from "../modules/almacen/almacen.model.js";
import CategoriaPaciente from "../modules/categoria-paciente/categoriaPaciente.model.js";
import Grupoarticulo from "../modules/grupo-articulo/grupoArticulo.model.js";

import { passEncrypt } from "./crypto.js";

export default async function seedDB(){

    const users = await User.find();
    if(!users || users.length < 1) {
        await Almacen.create({nombre: 'Principal', descripcion: 'Almacén por defecto'});
        await Grupoarticulo.create({nombre: 'General', descripcion: 'Articulos que no pertenecen a un grupo específico'});

        await CategoriaPaciente.create({nombre: "Plata", descripcion:"Paciente nuevo. Tarifa completa", indicePrecio: 1});
        await CategoriaPaciente.create({nombre: "Platinum", descripcion:"Paciente normal. Descuento 10%", indicePrecio: 0.9});
        await CategoriaPaciente.create({nombre: "Diamante", descripcion:"Paciente High Plus. Descuento 15%", indicePrecio: 0.85});

        await Role.create({rolename: 'Administrador'});
        await Role.create({rolename: 'Profesional'});
        await Role.create({rolename: 'Secretaria'});

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