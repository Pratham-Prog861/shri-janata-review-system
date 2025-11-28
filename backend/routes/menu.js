import express from 'express';
import {
    getAllMenuData,
    getMenuCategories,
    getProductsByCategory,
} from '../controllers/menuController.js';

const router = express.Router();

// Get all menu data
router.get('/', getAllMenuData);

// Get all categories
router.get('/categories', getMenuCategories);

// Get products by category
router.get('/category/:categoryName', getProductsByCategory);

export default router;
