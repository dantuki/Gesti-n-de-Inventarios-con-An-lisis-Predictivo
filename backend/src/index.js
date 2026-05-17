const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// 1. MIDDLEWARES (¡Siempre van arriba de las rutas!)
app.use(express.json());

// 2. IMPORTACIÓN DE RUTAS
const productRoutes = require('./routes/productRoutes');
const movementRoutes = require('./routes/movementRoutes'); // Traemos las rutas unificadas

// 3. CONEXIÓN DE RUTAS EN EXPRESS
app.use('/productos', productRoutes);
app.use('/movimientos', movementRoutes); // Activamos /movimientos/venta y /movimientos/entrada

// 4. RUTA DE SALUD DEL SERVIDOR
app.get('/', (req, res) => {
    res.json({ message: 'API de Gestión de Inventarios funcionando 🚀' });
});

// 5. ARRANQUE DEL SERVIDOR
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});