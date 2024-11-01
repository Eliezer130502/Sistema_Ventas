import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProveedorForm = ({ proveedorEditado, onProveedorGuardado }) => {
    const [nombre, setNombre] = useState('');
    const [productos, setProductos] = useState([{ nombre: '', descripcion: '', urlFoto: '', precio: '', categoria: '' }]);

    useEffect(() => {
        if (proveedorEditado) {
            setNombre(proveedorEditado.nombre);
            setProductos(proveedorEditado.productos);
        } else {
            limpiarFormulario(); // Limpiar el formulario si no hay proveedor editado
        }
    }, [proveedorEditado]);

    const agregarProducto = () => {
        setProductos([...productos, { nombre: '', descripcion: '', urlFoto: '', precio: '', categoria: '' }]);
    };

    const guardarProveedor = async (e) => {
        e.preventDefault();
        const nuevoProveedor = { nombre, productos }; // Solo nombre y productos

        try {
            if (proveedorEditado) {
                await axios.put(`http://localhost:8080/api/proveedores/${proveedorEditado.id}`, nuevoProveedor);
            } else {
                await axios.post('http://localhost:8080/api/proveedores', nuevoProveedor);
            }
            limpiarFormulario(); // Limpiar el formulario después de guardar
            onProveedorGuardado();
        } catch (error) {
            console.error("Error al guardar proveedor:", error);
        }
    };

    // Función para limpiar todos los campos del formulario
    const limpiarFormulario = () => {
        setNombre('');
        setProductos([{ nombre: '', descripcion: '', urlFoto: '', precio: '', categoria: '' }]);
    };

    return (
        <form className="proveedor-form" onSubmit={guardarProveedor}>
            <h2>{proveedorEditado ? 'Editar Proveedor' : 'Agregar Proveedor'}</h2>
            <input
                type="text"
                placeholder="Nombre del Proveedor"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />

            <h3>Productos:</h3>
            {productos.map((producto, index) => (
                <div className="producto-form" key={index}>
                    <input
                        type="text"
                        placeholder="Nombre del Producto"
                        value={producto.nombre}
                        onChange={(e) => {
                            const nuevosProductos = [...productos];
                            nuevosProductos[index].nombre = e.target.value;
                            setProductos(nuevosProductos);
                        }}
                        required
                    />
                    <textarea
                        placeholder="Descripción del Producto"
                        value={producto.descripcion}
                        onChange={(e) => {
                            const nuevosProductos = [...productos];
                            nuevosProductos[index].descripcion = e.target.value;
                            setProductos(nuevosProductos);
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="URL de Foto"
                        value={producto.urlFoto}
                        onChange={(e) => {
                            const nuevosProductos = [...productos];
                            nuevosProductos[index].urlFoto = e.target.value;
                            setProductos(nuevosProductos);
                        }}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={producto.precio}
                        onChange={(e) => {
                            const nuevosProductos = [...productos];
                            nuevosProductos[index].precio = e.target.value;
                            setProductos(nuevosProductos);
                        }}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Categoría"
                        value={producto.categoria}
                        onChange={(e) => {
                            const nuevosProductos = [...productos];
                            nuevosProductos[index].categoria = e.target.value;
                            setProductos(nuevosProductos);
                        }}
                        required
                    />
                </div>
            ))}
            
            <button type="button" onClick={agregarProducto}>Agregar Producto</button>
            <button type="submit">{proveedorEditado ? 'Actualizar Proveedor' : 'Agregar Proveedor'}</button>
            <button type="button" onClick={limpiarFormulario} style={{ marginTop: '10px', backgroundColor: '#f39c12', color: 'white' }}>
                Limpiar Formulario
            </button>
        </form>
    );
};

export default ProveedorForm;
