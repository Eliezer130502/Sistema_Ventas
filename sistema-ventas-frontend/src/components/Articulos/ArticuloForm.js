import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticuloForm = ({ articuloEditado, onArticuloGuardado }) => {
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [articulosExistentes, setArticulosExistentes] = useState([]);
    const [selectedProveedor, setSelectedProveedor] = useState('');
    const [selectedProducto, setSelectedProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [precio, setPrecio] = useState(0);
    const [stock, setStock] = useState('');
    const [urlImagen, setUrlImagen] = useState('');
    const [mensaje, setMensaje] = useState('');

    // Cargar lista de proveedores
    useEffect(() => {
        const cargarProveedores = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/proveedores');
                setProveedores(response.data);
            } catch (error) {
                console.error("Error al cargar proveedores:", error);
                setMensaje("Error al cargar proveedores.");
            }
        };
        cargarProveedores();
    }, []);

    // Cargar productos cuando se selecciona un proveedor
    useEffect(() => {
        const cargarProductos = async () => {
            if (selectedProveedor) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/proveedores/${selectedProveedor}`);
                    const proveedor = response.data;
                    if (proveedor && proveedor.productos) {
                        setProductos(proveedor.productos);
                    } else {
                        setProductos([]);
                    }
                } catch (error) {
                    console.error("Error al cargar productos:", error);
                    setProductos([]);
                }
            } else {
                setProductos([]);
            }
        };
        cargarProductos();
    }, [selectedProveedor]);

    // Cargar datos del artículo a editar
    useEffect(() => {
        const cargarArticulo = async () => {
            if (articuloEditado) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/articulos/${articuloEditado.id}`);
                    const articulo = response.data;
                    if (articulo) {
                        setSelectedProveedor(articulo.proveedorNombre); // Cambia según tu estructura
                        setSelectedProducto(articulo.nombre);
                        setDescripcion(articulo.descripcion);
                        setCategoria(articulo.categoria);
                        setPrecio(articulo.precio);
                        setUrlImagen(articulo.urlFoto);
                        setStock(articulo.stock);
                    }
                } catch (error) {
                    console.error("Error al cargar el artículo:", error);
                    setMensaje("Error al cargar el artículo.");
                }
            }
        };
        cargarArticulo();
    }, [articuloEditado]);

    // Cargar artículos existentes
    useEffect(() => {
        const cargarArticulosExistentes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/articulos');
                setArticulosExistentes(response.data);
            } catch (error) {
                console.error("Error al cargar artículos existentes:", error);
                setMensaje("Error al cargar artículos existentes.");
            }
        };
        cargarArticulosExistentes();
    }, []);

    // Manejar la selección de producto
    const handleProductoChange = (e) => {
        const productoId = e.target.value;
        setSelectedProducto(productoId);

        const producto = productos.find((p) => p.nombre === productoId);
        if (producto) {
            setDescripcion(producto.descripcion);
            setCategoria(producto.categoria);
            setPrecio(producto.precio);
            setUrlImagen(producto.urlFoto);
        } else {
            setDescripcion('');
            setCategoria('');
            setPrecio(0);
            setUrlImagen('');
        }
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedProducto || !stock || isNaN(stock) || Number(stock) <= 0) {
            setMensaje("Por favor, complete todos los campos requeridos.");
            return;
        }

        // Verificar si el artículo ya existe
        const articuloExistente = articulosExistentes.find((articulo) => articulo.nombre === selectedProducto);
        if (articuloExistente) {
            setMensaje(`El artículo "${selectedProducto}" ya existe.`);
            return;
        }

        const nuevoArticulo = {
            nombre: selectedProducto,
            descripcion,
            categoria,
            precio,
            stock: Number(stock),
            urlFoto: urlImagen,
            proveedorNombre: proveedores.find(prov => prov.id === selectedProveedor)?.nombre || ''
        };

        try {
            if (articuloEditado) {
                await axios.put(`http://localhost:8080/api/articulos/${articuloEditado.id}`, nuevoArticulo);
                setMensaje("Artículo actualizado exitosamente.");
            } else {
                await axios.post('http://localhost:8080/api/articulos', nuevoArticulo);
                setMensaje("Artículo agregado exitosamente.");
            }
            onArticuloGuardado();
            limpiarCampos();
        } catch (error) {
            console.error("Error al guardar el artículo:", error);
            setMensaje("Error al guardar el artículo.");
        }
    };

    // Limpiar todos los campos del formulario
    const limpiarCampos = () => {
        setSelectedProveedor('');
        setProductos([]);
        setSelectedProducto('');
        setDescripcion('');
        setCategoria('');
        setPrecio(0);
        setUrlImagen('');
        setStock('');
        setMensaje('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{articuloEditado ? 'Editar Artículo' : 'Agregar Artículo'}</h2>
    
            <label htmlFor="proveedor">Proveedor:</label>
            <select id="proveedor" value={selectedProveedor} onChange={(e) => setSelectedProveedor(e.target.value)} required>
                <option value="">Seleccione un proveedor</option>
                {proveedores.map((proveedor) => (
                    <option key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre}
                    </option>
                ))}
            </select>
    
            <label htmlFor="producto">Producto:</label>
            <select id="producto" value={selectedProducto} onChange={handleProductoChange} required disabled={!selectedProveedor}>
                <option value="">Seleccione un producto</option>
                {productos.map((producto) => (
                    <option key={producto.nombre} value={producto.nombre}>
                        {producto.nombre}
                    </option>
                ))}
            </select>
    
            <div>
                <label>Descripción:</label>
                <textarea value={descripcion} readOnly />
            </div>
            <div>
                <label>Categoría:</label>
                <input type="text" value={categoria} readOnly />
            </div>
            <div>
                <label>Precio:</label>
                <input type="text" value={precio.toFixed(2)} readOnly />
            </div>
            <div>
                <label>URL de Imagen:</label>
                <input type="text" value={urlImagen} readOnly />
            </div>
            <div>
                <label>Stock:</label>
                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
            </div>
    
            <button type="submit">{articuloEditado ? 'Actualizar' : 'Guardar'}</button>
    
            {mensaje && (
                <div className={`mensaje ${mensaje.includes("Error") ? "error" : "success"}`}>
                    {mensaje}
                </div>
            )}
    
            <button type="button" onClick={limpiarCampos} style={{ marginTop: '10px' }}>
                Limpiar Formulario
            </button>
        </form>
    );
};

export default ArticuloForm;
