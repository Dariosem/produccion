import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    articulo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articulo'
    },
    almacen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Almacen'
    },
    cantidad: {
        type: mongoose.Schema.Types.Number
    },
});


export default mongoose.model('Stock', stockSchema);