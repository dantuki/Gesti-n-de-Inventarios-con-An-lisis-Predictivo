const pool = require('../db/db');

// Lógica para obtener productos (Lo que estaba en app.get)
const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al conectar con la base de datos' });
    }
};

// Lógica para crear productos (Lo que estaba en app.post)
const createProduct = async (req, res) => {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, categoria_id]
        );
        res.status(201).json({ id: result.insertId, message: 'Producto creado con éxito ✅' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar el producto' });
    }
};

module.exports = { getProducts, createProduct };