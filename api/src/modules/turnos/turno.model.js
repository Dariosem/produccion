import mongoose from 'mongoose';

const turnoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    color:{
        type: String,
    },
    backgroundColor:{
        type: String,
    },
    textColor:{
        type: String,
    },
    editable:{
        type: Boolean,
    },
    classNames:{
        type: [String],
    },
    startEditable:{
        type: Boolean,
    },
    durationEditable:{
        type: Boolean,
    },
    estado:{
        type: String,
    },
    fechaCambioEstado: {
        type: Date,
        default: null,
    },
    paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paciente',
    },
    profesional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profesional',
    },
    plasma:{
        type: Boolean,
    },
    sobreturno: {
        type: Boolean,
    }
}, {
    timestamp: true,
});

export default mongoose.model('Turno', turnoSchema)