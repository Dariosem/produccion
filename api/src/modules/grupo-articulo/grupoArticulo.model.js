import mongoose, { Mongoose } from 'mongoose';

const grupoArticuloSchema = new mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
    },
    descripcion: {
        type: String,
    },
});

export default mongoose.model('Grupoarticulo', grupoArticuloSchema);