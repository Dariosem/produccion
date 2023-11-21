import mongoose, { Mongoose } from 'mongoose';

const categoriaPacienteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
    },
    descripcion: {
        type: String,
    },
    indicePrecio: {
        type: Number,
        required: true,
    }
});

export default mongoose.model('CategoriaPaciente', categoriaPacienteSchema);