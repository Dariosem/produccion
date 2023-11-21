import Factura from "./factura.model.js";
import Remito from './../remito/remito.model.js';
import Afip from '@afipsdk/afip.js';
import QRCode from 'qrcode';

const afip = new Afip({CUIT: 20209174910});
const afipURL = 'https://www.afip.gob.ar/fe/qr/?p=';

export const getAllModel = async (req, res) => {

  try {
    let models = await Factura.find()
                              .populate([
                                { path:'remito', 
                                  populate:[
                                    {
                                      path:'paciente', 
                                      populate:{
                                        path: 'categoria'
                                      }
                                    },
                                    {
                                      path:'articulos', 
                                      populate:{
                                        path: 'articulo',
                                        populate:{
                                          path: 'grupo'
                                        }
                                      }
                                    },
                                    {
                                      path:'practicas', 
                                      populate:{
                                        path: 'articulo',
                                        populate:{
                                          path: 'grupo'
                                        }
                                      }
                                    },
                                  ]
                                }
                              ]);
    
    if (!models) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'});
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }

};

export const getModelById = async (req, res) => {
  const { id } = req.params;
  try {
      const foundModel = await Factura.findById(id)
                                      .populate([
                                        { path:'remito', 
                                          populate:[
                                            {
                                              path:'paciente', 
                                              populate:{
                                                path: 'categoria'
                                              }
                                            },
                                            {
                                              path:'articulos', 
                                              populate:{
                                                path: 'articulo',
                                                populate:{
                                                  path: 'grupo'
                                                }
                                              }
                                            },
                                            {
                                              path:'practicas', 
                                              populate:{
                                                path: 'articulo',
                                                populate:{
                                                  path: 'grupo'
                                                }
                                              }
                                            },
                                          ]
                                        }
                                      ]);

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
      res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const getModelByPaciente = async (req, res) => {
  const { id } = req.params;

  try {
      const foundModel = await Factura.find({paciente: id}).populate(['paciente', 'profesional']).populate(['articulos.articulo','practicas.articulo']);

      if(!foundModel) return res.status(404).json({mensaje: 'No se encontraron registros en la base de datos'})
          
      res.status(200).json(foundModel)
      
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos. Error: ', error  })
  }
};

export const createModel = async (req, res) => {
  let newDoc = {...req.body};
  console.log('PUNTO DE VENTA', req.body);

  const date = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];

  try {
    let lastVoucher = await afip.ElectronicBilling.getLastVoucher(parseInt(newDoc.PtoVta), parseInt(newDoc.CbteTipo));
    console.log('numero comprobante', lastVoucher);
    if(!lastVoucher) return res.status(404).json({mensaje: 'No se encontró el nro del último comprabante'})
    //if(!lastVoucher) lastVoucher = 0;
    
    // Info del comprobante
    let data = {
      'CantReg' 	: newDoc.CantReg,
      'PtoVta' 	: parseInt(newDoc.PtoVta),
      'CbteTipo' 	: newDoc.CbteTipo,
      'Concepto' 	: newDoc.Concepto,
      'DocTipo' 	: newDoc.DocTipo,
      'DocNro' 	: newDoc.DocNro,
      'CbteDesde' 	: lastVoucher + 1,  // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
      'CbteHasta' 	: lastVoucher + 1,  // Número de comprobante o numero del último comprobante en caso de ser mas de uno
      'CbteFch' 	: parseInt(date.replace(/-/g, '')), // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
      'ImpTotal' 	: newDoc.ImpTotal,
      'ImpTotConc' 	: newDoc.ImpTotConc,
      'ImpNeto' 	: newDoc.ImpNeto,
      'ImpOpEx' 	: newDoc.ImpOpEx,
      'ImpIVA' 	: newDoc.ImpIVA,
      'ImpTrib' 	: newDoc.ImpTrib,
      'MonId' 	: newDoc.MonId,
      'MonCotiz' 	: newDoc.MonCotiz,
      'Iva' 		: [ // (Opcional) Alícuotas asociadas al comprobante
        {
          'Id' 		:newDoc.Iva.Id, // Id del tipo de IVA (5 para 21%)(ver tipos disponibles) 
          'BaseImp' 	:newDoc.Iva.BaseImp, // Base imponible
          'Importe' 	:newDoc.Iva.Importe // Importe   
        }
      ],
      'FchServDesde': parseInt(date.replace(/-/g, '')), 
      'FchServHasta': parseInt(date.replace(/-/g, '')), 
      'FchVtoPago': parseInt(date.replace(/-/g, ''))
    };

    const resp = await afip.ElectronicBilling.createVoucher(data);

    newDoc.cae = resp.CAE;
    newDoc.fechaVtoCae = resp.CAEFchVto;
    newDoc.CbteFch = parseInt(date.replace(/-/g, ''));
    newDoc.voucherNumber = lastVoucher + 1

    //Obtener datos de la empresa desde la tabla de parametros
    
    //CREAR DATOS PARA QR
    //Ejemplo:
    //{"ver":1,"fecha":"2020-10-13","cuit":30000000007,"ptoVta":10,"tipoCmp":1,"nroCmp":94,"importe":12100,"moneda":"DOL","ctz":65,"tipoDocRec":80,"nroDocRec":20000000001,"tipoCodAut":"E","codAut":70417054367476}
    const dataQr = {
      "ver":1,
      "fecha": date,
      "cuit": 2020917491,
      "ptoVta": newDoc.PtoVta,
      "tipoCmp":newDoc.CbteTipo,
      "nroCmp": lastVoucher + 1,
      "importe": newDoc.ImpTotal,
      "moneda": newDoc.MonId,
      "ctz": newDoc.MonCotiz,
      "tipoDocRec": newDoc.DocTipo,
      "nroDocRec": newDoc.DocNro,
      "tipoCodAut":"E",
      "codAut": parseInt(resp.CAE)
    }

    //Codificar este json en base64
    const dataEncoded = btoa(JSON.stringify(dataQr))
    //Armar el texto para el QR
    //Ejemplo:
    //https://www.afip.gob.ar/fe/qr/?p=eyJ2ZXIiOjEsImZlY2hhIjoiMjAyMC0....
    //Generar QR con: npm i qrcode
    const generateQR = await QRCode.toDataURL(afipURL + dataEncoded);

    newDoc.qr = generateQR;

    const newFactura = await Factura.create(newDoc);
    console.log('GUARDADO FACTURA=>', newFactura);

    //CAMBIA ESTADO DEN REMITO
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    await Remito.findByIdAndUpdate(newDoc.remito,{estado: 'facturado'});

    res.status(200).json(newFactura);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


export const getVoucherTypes = async (req, res) => {
  console.log('Entra bien', afip);
  try {
    const voucherTypes = await afip.ElectronicBilling.getVoucherTypes();
    if (!voucherTypes) return res.status(404).json({mensaje: 'No se encontraron los tipos de comprobantes'});
    res.status(200).json(voucherTypes);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos de los tipos de comprobantes.', error  })
  }

};

export const getDocumentTypes = async (req, res) => {
  try {
    const documentTypes = await afip.ElectronicBilling.getDocumentTypes();
    console.log('Entra bien', documentTypes);
    if (!documentTypes) return res.status(404).json({mensaje: 'No se encontraron los tipos de documentos'});
    res.status(200).json(documentTypes);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos de los tipos de documentos.', error  })
  }

};

export const getServerStatus = async (req, res) => {
  try {
    const documentTypes = await afip.ElectronicBilling.getServerStatus();
    console.log('Entra bien', documentTypes);
    if (!documentTypes) return res.status(404).json({mensaje: 'No se obtuvo el estado del servidor'});
    res.status(200).json(documentTypes);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener el estado del servidor.', error  })
  }

};

export const getLastVoucher = async (req, res) => {
  // Numero de punto de venta
  const puntoDeVenta = 1;

  // Tipo de comprobante
  const tipoDeComprobante = 6; // 6 = Factura B

  try {
    const lastVoucher = await afip.ElectronicBilling.getLastVoucher(puntoDeVenta, tipoDeComprobante);
    if (!lastVoucher) return res.status(404).json({mensaje: 'No se encontraron los tipos de documentos'});
    res.status(200).json(lastVoucher);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos de los tipos de documentos.', error  })
  }


};
export const getVoucherInfo = async (req, res) => {
  const { numero } = req.params;
  console.log('Entra en getInfo', numero);
  const puntoDeVenta = 1;
  const tipoDeComprobante = 6; // 6 = Factura B

  try {
    const voucherInfo = await afip.ElectronicBilling.getVoucherInfo(numero, puntoDeVenta, tipoDeComprobante);
    if (!voucherInfo) return res.status(404).json({mensaje: 'El comprobante no existe'});

    res.status(200).json(voucherInfo);
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos de los tipos de documentos.', error  })
  }

};
