import mongoose, { Mongoose } from 'mongoose';

const almacenSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
    },
    descripcion: {
        type: String,
    },
});

export default mongoose.model('Almacen', almacenSchema);