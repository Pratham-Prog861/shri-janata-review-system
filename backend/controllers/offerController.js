import Offer from '../models/Offer.js';

export const createOffer = async (req, res) => {
    try {
        const { discountPercentage, description } = req.body;

        await Offer.updateMany({}, { isActive: false });

        const offer = new Offer({ discountPercentage, description, isActive: true });
        await offer.save();

        res.status(201).json({ message: 'Offer created successfully', offer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getActiveOffer = async (req, res) => {
    try {
        const offer = await Offer.findOne({ isActive: true }).sort({ createdAt: -1 });
        res.json(offer);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find().sort({ createdAt: -1 });
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateOffer = async (req, res) => {
    try {
        const { discountPercentage, description, isActive } = req.body;

        if (isActive) {
            await Offer.updateMany({}, { isActive: false });
        }

        const offer = await Offer.findByIdAndUpdate(
            req.params.id,
            { discountPercentage, description, isActive },
            { new: true }
        );

        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.json({ message: 'Offer updated successfully', offer });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findByIdAndDelete(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
