import mongoose from 'mongoose';

const pacienteSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
    },
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    apellido: {
        type: String,
        required: true,
        trim: true,
    },
    dni: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    cuit: {
        type: String,
        trim: true,
    },
    telefono: {
        type: Number,
        required: true,
    },
    telefono2: {
        type: Number,
    },
    direccion: {
        type: String,
    },
    image: {
        type: String,
    },
    fechaNacimiento: {
        type: Date,
    },
    sexo: {
        type: String,
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoriaPaciente'
    },
    banco: { type: String },
    cuenta: { type: String },
    obraSocial: { type: String },
    numeroObraSocial: { type: String },
    condicionIva: {type: String },
    activo: { type: Number, default: 1 },
}, {
    timestamp: true,
});

export default mongoose.model('Paciente', pacienteSchema)