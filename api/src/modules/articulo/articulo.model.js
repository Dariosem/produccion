import mongoose from 'mongoose';

const articuloSchema = new mongoose.Schema({
    codigoProveedor: {
        type: String,
        trim: true,
    },
    codigoPropio: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true,
    },
    precio: { type: Number, default: 0},
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupoarticulo'
    },
    inventariable: {
        type: Boolean,
        required: true,
        default: true,
    },
    costoUltimaCompra: {
        type: Number,
        default: 0
    },
    activo: {
        type: Boolean,
        required: true,
        default: true,
    },
    tipo: {
        type: String,
    }
}, {
    timestamps: true
});


export default mongoose.model('Articulo', articuloSchema);