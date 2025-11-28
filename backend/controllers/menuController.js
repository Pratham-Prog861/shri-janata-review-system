import Menu from '../models/Menu.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize menu data from JSON file
export const initializeMenuData = async () => {
    try {
        const count = await Menu.countDocuments();
        if (count === 0) {
            const menuDataPath = path.join(__dirname, '../data/menuData.json');
            const menuData = JSON.parse(fs.readFileSync(menuDataPath, 'utf-8'));

            await Menu.insertMany(menuData.menu);
            console.log('Menu data initialized successfully');
        }
    } catch (error) {
        console.error('Error initializing menu data:', error.message);
    }
};

// Get all menu data
export const getAllMenuData = async (req, res) => {
    try {
        const menuData = await Menu.find().sort({ category: 1 });
        res.json(menuData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all categories
export const getMenuCategories = async (req, res) => {
    try {
        const categories = await Menu.find().select('category').sort({ category: 1 });
        res.json(categories.map(item => item.category));
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;
        const menuItem = await Menu.findOne({ category: categoryName });

        if (!menuItem) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(menuItem.items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
