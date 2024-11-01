import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        obtenerPedidos();
    }, []);

    const obtenerPedidos = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/pedidos`);
            setPedidos(response.data);
        } catch (error) {
            console.error("Error al obtener pedidos:", error);
        }
    };

    return (
        <div className="pedidos-container">
            <h2>Historial de Pedidos</h2>
            <ul>
                {pedidos.map((pedido, index) => (
                    <li key={index}>{pedido.fechaPedido} - Estado: {pedido.estado}</li>
                ))}
            </ul>
        </div>
    );
};

export default Pedidos;
