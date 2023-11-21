import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    rolename: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    }
}, {
    timestamp: true,
});

export default mongoose.model('Role', roleSchema)