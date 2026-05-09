const express = require('express');
const router = express.Router();
const { registerSale } = require('../controllers/movementController');

router.post('/venta', registerSale);

module.exports = router;