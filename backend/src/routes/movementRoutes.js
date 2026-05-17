const express = require('express');
const router = express.Router();
// 1. Importamos AMBAS funciones desde el controlador
const { registerSale, registerInput } = require('../controllers/movementController');

// 2. Definimos la ruta para la venta (salida)
router.post('/venta', registerSale);

// 3. Definimos la ruta para la entrada (reabastecimiento) ¡ESTA ERA LA QUE FALTABA! 🟢
router.post('/entrada', registerInput);

module.exports = router;