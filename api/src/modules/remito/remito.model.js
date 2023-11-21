import mongoose from 'mongoose';
import { number } from 'zod';

const remitoSchema = new mongoose.Schema({
    numero: {
        type: Number
    },
    visita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Visita',
    },
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
    articulos: {
        type: [{articulo: {type: mongoose.Schema.Types.ObjectId, ref: 'Articulo'}, cantidad: {type: Number}, precio: {type: Number}, indicaciones: {type: String}}],
    },
    practicas: {
        type: [{articulo: {type: mongoose.Schema.Types.ObjectId, ref: 'Articulo',}, cantidad: {type: Number}, precio: {type: Number}, indicaciones: {type: String}}],
    },
    estado: {
        type: String,
        default: 'pendiente'
    },
    fechaCambioEstado: {
        type: Date
    },
    usuarioCambioEstado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    montoTotal: {
        type: Number
    },
    montoDeuda: {
        type: Number
    },
    
    
}, {
    timestamp: true,
});

export default mongoose.model('Remito', remitoSchema)