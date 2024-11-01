import React from 'react';

const Articulo = ({ articulo, onEdit, onDelete, onDetail }) => {
    return (
        <tr className="articulo">
            <td>{articulo.proveedorNombre}</td> {/* Cambiado a proveedorNombre */}
            <td>{articulo.nombre}</td>
            <td>{articulo.descripcion}</td>
            <td>{articulo.categoria}</td>
            <td>Q {parseFloat(articulo.precio).toFixed(2)}</td>
            <td>{articulo.stock}</td>
            <td>
                <button className="edit-button" onClick={() => onEdit(articulo)}>Editar</button>
                <button className="delete-button" onClick={() => onDelete(articulo.id)}>Eliminar</button>
                <button className="detalle-button" onClick={() => onDetail(articulo)}>Detalles</button>
            </td>
        </tr>
    );
};

export default Articulo;
