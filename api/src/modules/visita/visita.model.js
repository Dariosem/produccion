import mongoose from 'mongoose';

const visitaSchema = new mongoose.Schema({
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
    },
    fecha: {
        type: Date,
        default: new Date(),
    },
    profesional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profesional',
    },
    comentarios: {
        type: String,
    },
    articulos: {
        type: [{articulo: {type: mongoose.Schema.Types.ObjectId, ref: 'Articulo'}, cantidad: {type: Number}, precio: {type: Number}, indicaciones: {type: String}}],
    },
    practicas: {
        type: [{articulo: {type: mongoose.Schema.Types.ObjectId, ref: 'Articulo',}, cantidad: {type: Number}, precio: {type: Number}, indicaciones: {type: String}}],
    },
    imagenes: {
        type: [{imagen: String, titulo: String, comentarios: String}]
        //type: [{imagen: {data: Buffer, contentType: String}, titulo: String, comentarios: String}]
    },
    estado: {
        type: String,
        default: 'borrador'
    },
    fechaCambioEstado: {
        type: Date
    }
    
}, {
    timestamp: true,
});

export default mongoose.model('Visita', visitaSchema)