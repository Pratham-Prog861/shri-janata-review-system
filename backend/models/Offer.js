import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    discountPercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    isActive: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });

export default mongoose.model('Offer', offerSchema);
