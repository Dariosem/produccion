import mongoose from 'mongoose';

const medioPagoSchema = new mongoose.Schema({
    tipo: { type: String }, 
    monto: { type: Number },
    banco: { type: String },
    cuit: { type: String },
    numeroCuenta: { type: String },
    nombre: { type: String }
})

const pagoRecibidoSchema = new mongoose.Schema({
    fecha: {
        type: Date,
    },
    monto: {
        type: Number,
    },
    remitos: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Remito'
    },
    mediosPago: {
        type: [medioPagoSchema],
    },
    usuarioCobro: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    facturado: {
        type: Boolean
    }
});

export default mongoose.model('PagoRecibido', pagoRecibidoSchema);