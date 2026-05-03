const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.json({ 
        message: 'API de Gestión de Inventarios funcionando 🚀',
        status: 'Online',
        day: 'Día 2 de desarrollo'
    });
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    console.log('Usa Ctrl+C para detenerlo');
});