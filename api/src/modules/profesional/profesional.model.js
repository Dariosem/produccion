import mongoose from 'mongoose';

const profesionalSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
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
    telefono: {
        type: Number,
        required: true,
    },
    especialidad: {
        type: String,
    },
    image: {
        type: String,
    },
    color: {
        type: String,
    },
    coordinador: {
        type: Boolean,
        default: false
    }
}, {
    timestamp: true,
    collection: 'Profesionales'
});

export default mongoose.model('Profesional', profesionalSchema)