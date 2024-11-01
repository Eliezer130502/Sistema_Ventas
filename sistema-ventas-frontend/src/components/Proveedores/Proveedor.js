import React from 'react';

const Proveedor = ({ proveedor, onEdit, onDelete, onDeleteProducto }) => {
    return (
        <div className="proveedor">
            <h3>{proveedor.nombre}</h3>
            <h4>Productos:</h4>
            <table className="tabla-productos">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Imagen</th>
                        <th>Precio (Q)</th>
                        <th>Acciones</th> {/* Nueva columna para acciones */}
                    </tr>
                </thead>
                <tbody>
                    {proveedor.productos && proveedor.productos.length > 0 ? (
                        proveedor.productos.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.nombre}</td>
                                <td>{producto.categoria}</td>
                                <td><img src={producto.urlFoto} alt={producto.nombre} /></td>
                                <td>Q {parseFloat(producto.precio).toFixed(2)}</td>
                                <td>
                                    <button onClick={() => onDeleteProducto(proveedor.id, producto.id)}>Eliminar Producto</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay productos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={() => onEdit(proveedor)}>Editar</button>
            <button onClick={() => onDelete(proveedor.id)}>Eliminar Proveedor</button>
        </div>
    );
};

export default Proveedor;
