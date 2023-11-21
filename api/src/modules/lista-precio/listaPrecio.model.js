import mongoose, { Mongoose } from 'mongoose';

const listaPrecioSchema = new mongoose.Schema({
    codigoPropio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Articulo',
        unique: true,
    },
    nombreLista: {
        type: String,
        required: true
    },
    precios: {
        type: [
            {codigoPropio: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Articulo',
                unique: true,
            },
            precio: {
                type: Number
            }
        }],
        default: 0
    }
},{
    
    timestamps: true
});

export default mongoose.model('ListaPrecio', listaPrecioSchema);