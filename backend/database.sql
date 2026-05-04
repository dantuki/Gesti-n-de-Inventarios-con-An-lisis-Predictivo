-- 1. Crear la base de datos físicamente
CREATE DATABASE IF NOT EXISTS baseInventario;

-- 2. Decirle a MySQL que use esta base de datos
USE baseInventario;

-- 3. Crear tabla de Categorías
CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- 4. Crear tabla de Productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    categoria_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- 5. Crear tabla de Movimientos (Clave para el análisis predictivo)
CREATE TABLE IF NOT EXISTS movimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT,
    cantidad INT,
    tipo_movimiento ENUM('entrada', 'salida') NOT NULL,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- 6. Insertar datos iniciales (Solo si no existen para evitar duplicados)
-- Nota: Si ya los insertaste antes, Workbench te dará un aviso (warning), no un error.
INSERT INTO categorias (nombre, descripcion) 
SELECT 'General', 'Categoría por defecto'
WHERE NOT EXISTS (SELECT 1 FROM categorias WHERE id = 1);

INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) 
SELECT 'Producto Inicial', 'Prueba de sistema', 10.00, 100, 1
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE id = 1);