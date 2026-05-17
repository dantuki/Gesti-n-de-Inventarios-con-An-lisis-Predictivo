const express = require('express');
const router = express.Router();
// 1. Importamos las funciones correctas del controlador de productos
const { getProducts, createProduct } = require('../controllers/productController');

// 2. Definimos las rutas usando '/' (que al unirse con el index mapean como /productos)
router.get('/', getProducts);
router.post('/', createProduct);

module.exports = router;