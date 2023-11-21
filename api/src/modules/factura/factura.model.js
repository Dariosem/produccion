import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
    CantReg: {type: Number},  // Cantidad de comprobantes a registrar
    PtoVta: {type: Number},  // Punto de venta
    CbteTipo: {type: Number},  // Tipo de comprobante (ver tipos disponibles) 
    Concepto: {type: Number},  // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
    DocTipo: {type: Number}, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
    DocNro: {type: Number},  // Número de documento del comprador (0 consumidor final)
    //'CbteDesde' 	: 1,  // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
    //'CbteHasta' 	: 1,  // Número de comprobante o numero del último comprobante en caso de ser mas de uno
    CbteFch: {type: Number}, // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
    ImpTotal: {type: Number}, // Importe total del comprobante
    ImpTotConc: {type: Number},   // Importe neto no gravado
    ImpNeto: {type: Number}, // Importe neto gravado
    ImpOpEx: {type: Number},   // Importe exento de IVA
    ImpIVA: {type: Number},  //Importe total de IVA
    ImpTrib: {type: Number},   //Importe total de tributos
    MonId: {type: String}, //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos) 
    MonCotiz: {type: Number},     // Cotización de la moneda usada (1 para pesos argentinos)  
    Iva:  // (Opcional) Alícuotas asociadas al comprobante
            {
            Id: {type: Number}, // Id del tipo de IVA (5 para 21%)(ver tipos disponibles) 
            BaseImp: {type: Number}, // Base imponible
            Importe: {type: Number} // Importe   
            }
        ,
    //hasta aca va en solicitud AFIP

    voucherNumber: { type: Number }, 
    remito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Remito',
    },
    usuarioFactura: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cae: { type: Number},
    fechaVtoCae: { type: String},
    qr: { type: String},
    
}, {
    timestamp: true,
});

export default mongoose.model('Factura', facturaSchema)