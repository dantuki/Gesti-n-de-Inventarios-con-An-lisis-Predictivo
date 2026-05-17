const pool = require('../db/db');

// 1. REGISTRAR VENTA (SALIDA DE STOCK)
const registerSale = async (req, res) => {
    const { producto_id, cantidad } = req.body;
    
    // Obtenemos una conexión exclusiva para la transacción
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction(); // Iniciamos la transacción

        // Insertar el movimiento de salida
        await connection.query(
            'INSERT INTO movimientos (producto_id, cantidad, tipo_movimiento) VALUES (?, ?, ?)',
            [producto_id, cantidad, 'salida']
        );

        // Restar el stock del producto
        const [result] = await connection.query(
            'UPDATE productos SET stock = stock - ? WHERE id = ? AND stock >= ?',
            [cantidad, producto_id, cantidad]
        );

        // Si no se afectó ninguna fila, es porque no había stock suficiente
        if (result.affectedRows === 0) {
            throw new Error('Stock insuficiente para realizar la venta');
        }

        await connection.commit(); // Guardamos los cambios definitivamente
        res.status(201).json({ message: 'Venta registrada y stock actualizado con éxito 📉' });

    } catch (error) {
        await connection.rollback(); // Deshacemos todo si algo falló
        console.error(error);
        res.status(500).json({ error: error.message || 'Error al procesar la venta' });
    } finally {
        connection.release(); // Liberamos la conexión de vuelta al pool
    }
};

// 2. REGISTRAR ENTRADA (REABASTECIMIENTO DE STOCK)
const registerInput = async (req, res) => {
    const { producto_id, cantidad } = req.body;
    
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();

        // Insertar el movimiento de tipo 'entrada'
        await connection.query(
            'INSERT INTO movimientos (producto_id, cantidad, tipo_movimiento) VALUES (?, ?, ?)',
            [producto_id, cantidad, 'entrada']
        );

        // Sumar el stock en la tabla de productos
        await connection.query(
            'UPDATE productos SET stock = stock + ? WHERE id = ?',
            [cantidad, producto_id]
        );

        await connection.commit();
        res.status(201).json({ message: 'Stock reabastecido con éxito 📈' });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la entrada de mercancía' });
    } finally {
        connection.release();
    }
};

// Exportamos ambas funciones correctamente
module.exports = { registerSale, registerInput };