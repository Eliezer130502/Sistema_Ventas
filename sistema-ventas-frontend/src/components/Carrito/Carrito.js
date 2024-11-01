import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Carrito.css';
import ConfirmarPago from './ConfirmarPago';

const Carrito = ({ idCarrito }) => {
    const [articulosAgregados, setArticulosAgregados] = useState([]);
    const [articuloDisponible, setArticuloDisponible] = useState([]);
    const [mostrarPago, setMostrarPago] = useState(false);

    const obtenerCarrito = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/carritos/${idCarrito}`);
            setArticulosAgregados(response.data.articulos);
        } catch (error) {
            console.error("Error al obtener carrito:", error);
        }
    }, [idCarrito]);

    const obtenerArticulosDisponibles = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/articulos');
            setArticuloDisponible(response.data);
        } catch (error) {
            console.error("Error al obtener artículos disponibles:", error);
        }
    }, []);

    useEffect(() => {
        obtenerCarrito();
        obtenerArticulosDisponibles();
    }, [obtenerCarrito, obtenerArticulosDisponibles]);

    const agregarAlCarrito = async (articuloId) => {
        try {
            await axios.post(`http://localhost:8080/api/carritos/${idCarrito}/articulos`, { articuloId });
            obtenerCarrito();
        } catch (error) {
            console.error("Error al agregar artículo al carrito:", error);
        }
    };

    const quitarDelCarrito = async (articuloId) => {
        try {
            await axios.delete(`http://localhost:8080/api/carritos/${idCarrito}/articulos/${articuloId}`);
            obtenerCarrito();
        } catch (error) {
            console.error("Error al quitar artículo del carrito:", error);
        }
    };

    const procesarPago = () => {
        setMostrarPago(true);
    };

    return (
        <div className="carrito-container">
            <h2>Carrito de Compras</h2>
            <ul>
                {articulosAgregados.map((articulo) => (
                    <li key={articulo.id}>
                        {articulo.nombre} - ${articulo.precio}
                        <button onClick={() => quitarDelCarrito(articulo.id)}>Quitar</button>
                    </li>
                ))}
            </ul>
            <h3>Artículos Disponibles</h3>
            <ul>
                {articuloDisponible.map((articulo) => (
                    <li key={articulo.id}>
                        {articulo.nombre} - ${articulo.precio}
                        <button onClick={() => agregarAlCarrito(articulo.id)}>Agregar al Carrito</button>
                    </li>
                ))}
            </ul>
            <button onClick={procesarPago}>Pagar</button>
            {mostrarPago && <ConfirmarPago idCarrito={idCarrito} articulosAgregados={articulosAgregados} />}
        </div>
    );
};

export default Carrito;
