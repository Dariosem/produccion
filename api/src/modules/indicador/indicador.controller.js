import Remito from "../remito/remito.model.js";
import Visita from "../visita/visita.model.js";
import Turno from "../turnos/turno.model.js";

export const getQtyHistoriaClinica = async (req, res) => {
  const { id } = req.params;
  try {
    const visitaQty = await Visita.countDocuments({paciente: id});
    const remitos = await Remito.find({paciente: id});
    const remitosConProductos = remitos.filter(item => item.articulos.length > 0);
    
    const productosQty = remitosConProductos.reduce((prev, curr) => {
      let cant = 0;
      curr.articulos.forEach(item => {
        cant += item.cantidad;
      });
      return prev + cant
    }, 0);
    const remitosConPracticas = remitos.filter(item => item.practicas.length > 0);
    const practicasQty = remitosConPracticas.reduce((prev, curr) => {
      let cant = 0;
      curr.practicas.forEach(item => {
        cant += item.cantidad;
      });
      return prev + cant
    }, 0);
    console.log('PRODUCTOS EN REMITO', practicasQty);
    const turnosQty = await Turno.countDocuments({paciente: id});
    //if (!qty) return res.status(404).json({mensaje: 'No se pudieron contar los registros en la base de datos'});
    res.status(200).json({visitas: visitaQty, productos: productosQty, practicas: practicasQty, turnos: turnosQty});
  } catch (error) {
    res.status(500).json({mensaje: 'No se pudieron obtener los datos.', error  })
  }
};
