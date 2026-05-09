const pool = require('../db/db');

const registerSale = async (req, res) => {
    const { producto_id, cantidad } = req.body;
    
    // Obtenemos una conexión exclusiva para la transacción
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction(); // Iniciamos la transacción

        // 1. Insertar el movimiento de salida
        await connection.query(
            'INSERT INTO movimientos (producto_id, cantidad, tipo_movimiento) VALUES (?, ?, ?)',
            [producto_id, cantidad, 'salida']
        );

        // 2. Restar el stock del producto
        const [result] = await connection.query(
            'UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?',
            [cantidad, producto_id, cantidad]
        );

        // Si no se afectó ninguna fila, es porque no había stock suficiente
        if (result.affectedRows === 0) {
            throw new Error('Stock insuficiente para realizar la venta');
        }

        await connection.commit(); // Si todo salió bien, guardamos los cambios definitivamente
        res.status(201).json({ message: 'Venta registrada y stock actualizado con éxito 📉' });

    } catch (error) {
        await connection.rollback(); // Si algo falló, deshacemos todo lo anterior
        console.error(error);
        res.status(500).json({ error: error.message || 'Error al procesar la venta' });
    } finally {
        connection.release(); // Liberamos la conexión de vuelta al pool
    }
};

module.exports = { registerSale };