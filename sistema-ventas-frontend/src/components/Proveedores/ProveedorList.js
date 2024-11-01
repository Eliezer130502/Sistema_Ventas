// ProveedorList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Proveedor from './Proveedor';
import ProveedorForm from './ProveedorForm';

const ProveedorList = () => {
    const [proveedores, setProveedores] = useState([]);
    const [proveedorEditado, setProveedorEditado] = useState(null);

    useEffect(() => {
        obtenerProveedores();
    }, []);

    const obtenerProveedores = async () => {
        const response = await axios.get('http://localhost:8080/api/proveedores');
        setProveedores(response.data);
    };

    const handleEdit = (proveedor) => {
        setProveedorEditado(proveedor);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/proveedores/${id}`);
        obtenerProveedores();
    };

    const handleDeleteProducto = (proveedorId, productoId) => {
        setProveedores((prevProveedores) =>
            prevProveedores.map((prov) => {
                if (prov.id === proveedorId) {
                    return {
                        ...prov,
                        productos: prov.productos.filter((prod) => prod.id !== productoId),
                    };
                }
                return prov;
            })
        );
    };

    const handleProveedorGuardado = () => {
        setProveedorEditado(null);
        obtenerProveedores();
    };

    return (
        <div>
            <h1>Gestión de Proveedores</h1>
            <ProveedorForm proveedorEditado={proveedorEditado} onProveedorGuardado={handleProveedorGuardado} />
            <h2>Lista de Proveedores</h2>
            {proveedores.map((proveedor) => (
                <Proveedor 
                    key={proveedor.id} 
                    proveedor={proveedor} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                    onDeleteProducto={handleDeleteProducto} // Asegúrate de pasar esta función
                />
            ))}
        </div>
    );
};

export default ProveedorList;
