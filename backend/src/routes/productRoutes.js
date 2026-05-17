const express = require('express');
const router = express.Router();
// Importamos las dos funciones del controlador de movimientos
const { registerSale, registerInput } = require('../controllers/movementController');

// Definimos las rutas para movimientos
router.post('/venta', registerSale);
router.post('/entrada', registerInput);

module.exports = router;