import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Articulo from './Articulo';
import ArticuloForm from './ArticuloForm';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Articulos.css';

const ArticuloList = () => {
    const [articulos, setArticulos] = useState([]);
    const [articuloEditado, setArticuloEditado] = useState(null);
    const [idBusqueda, setIdBusqueda] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [articuloSeleccionado, setArticuloSeleccionado] = useState(null);

    useEffect(() => {
        obtenerArticulos();
    }, []);

    const obtenerArticulos = async () => {
        const response = await axios.get('http://localhost:8080/api/articulos');
        setArticulos(response.data);
    };

    const handleEdit = (articulo) => {
        setArticuloEditado(articulo);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/articulos/${id}`);
        obtenerArticulos();
    };

    const handleArticuloGuardado = () => {
        setArticuloEditado(null);
        obtenerArticulos();
    };

    const buscarArticuloPorId = async () => {
        if (!idBusqueda) {
            setMensaje("Por favor, ingresa un ID para buscar.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/api/articulos/${idBusqueda}`);
            setArticulos([response.data]); // Mostrar solo el artículo encontrado
            setMensaje('');
        } catch (error) {
            console.error("Error al buscar el artículo:", error);
            setMensaje("Artículo no encontrado.");
            setArticulos([]);
        }
    };

    const limpiarBusqueda = () => {
        setIdBusqueda('');
        obtenerArticulos();
        setMensaje('');
    };

    const handleDetail = (articulo) => {
        setArticuloSeleccionado(articulo);
    };

    const closeDetail = () => {
        setArticuloSeleccionado(null);
    };

    // Función para generar PDF
    const generarPDF = () => {
        const doc = new jsPDF();

        // Configuración del documento
        doc.setFontSize(12);
        doc.text("Lista de Artículos", 20, 16);
        
        // Agregar tabla
        autoTable(doc, {
            head: [['Proveedor', 'Nombre', 'Descripción', 'Categoría', 'Precio', 'Stock']],
            body: articulos.map(articulo => [
                articulo.proveedorNombre,
                articulo.nombre,
                articulo.descripcion,
                articulo.categoria,
                `Q ${parseFloat(articulo.precio).toFixed(2)}`,
                articulo.stock
            ]),
            margin: { top: 30 },
            styles: {
                fontSize: 10,
                cellPadding: 2,
                overflow: 'linebreak',
                valign: 'middle',
                halign: 'left',
                lineColor: [0, 0, 0],
                lineWidth: 0.1,
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
            },
            headStyles: {
                fillColor: [22, 160, 133],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                fontSize: 12,
            },
        });

        // Guardar el PDF
        doc.save('lista_articulos.pdf');
    };

    return (
        <div>
            <h1>Gestión de Artículos</h1>
            <ArticuloForm articuloEditado={articuloEditado} onArticuloGuardado={handleArticuloGuardado} />

            <div>
                <input
                    type="text"
                    value={idBusqueda}
                    onChange={(e) => {
                        setIdBusqueda(e.target.value);
                        if (e.target.value === '') {
                            obtenerArticulos(); // Restaurar la lista
                        }
                    }}
                    placeholder="Buscar por ID"
                />
                <button onClick={buscarArticuloPorId}>Buscar</button>
                <button onClick={limpiarBusqueda}>Limpiar Búsqueda</button>
                {mensaje && <div className="mensaje">{mensaje}</div>}
            </div>

            <button onClick={generarPDF} className="pdf-button">Imprimir PDF</button>

            <h2>Lista de Artículos</h2>
            <table className="articulo-table">
                <thead>
                    <tr>
                        <th>Proveedor</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {articulos.map((articulo) => (
                        <Articulo 
                            key={articulo.id} 
                            articulo={articulo} 
                            onEdit={handleEdit} 
                            onDelete={handleDelete} 
                            onDetail={handleDetail} 
                        />
                    ))}
                </tbody>
            </table>

            {articuloSeleccionado && (
                <div className="detalle-modal">
                    <div className="detalle-content">
                        <h2>Detalles del Artículo</h2>
                        <img src={articuloSeleccionado.urlFoto} alt={articuloSeleccionado.nombre} />
                        <p><strong>ID:</strong> {articuloSeleccionado.id}</p>
                        <p><strong>Nombre:</strong> {articuloSeleccionado.nombre}</p>
                        <p><strong>Descripción:</strong> {articuloSeleccionado.descripcion}</p>
                        <p><strong>Categoría:</strong> {articuloSeleccionado.categoria}</p>
                        <p><strong>Proveedor:</strong> {articuloSeleccionado.proveedorNombre}</p>
                        <p><strong>Precio:</strong> Q {parseFloat(articuloSeleccionado.precio).toFixed(2)}</p>
                        <p><strong>Stock:</strong> {articuloSeleccionado.stock}</p>
                        <button onClick={closeDetail}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticuloList;
