import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false });

const menuSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    items: [menuItemSchema]
}, { timestamps: true });

export default mongoose.model('Menu', menuSchema);
