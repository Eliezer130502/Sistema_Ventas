import React, { useState } from 'react';
import axios from 'axios';

const ConfirmarPago = ({ idCarrito, articulosAgregados }) => {
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [cvv, setCvv] = useState('');

    const confirmarPago = async () => {
        try {
            const paymentData = {
                numeroTarjeta,
                fechaVencimiento,
                cvv,
                articulos: articulosAgregados
            };
            await axios.post(`http://localhost:8080/api/carritos/${idCarrito}/checkout`, paymentData);
            alert('Pago realizado con éxito!');
            // Aquí podrías agregar lógica para redirigir o limpiar el carrito
        } catch (error) {
            console.error("Error al procesar el pago:", error);
            alert('Error al procesar el pago, intente de nuevo.');
        }
    };

    return (
        <div>
            <h3>Confirmar Pago</h3>
            <ul>
                {articulosAgregados.map((articulo) => (
                    <li key={articulo.id}>
                        {articulo.nombre} - ${articulo.precio}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="No. de Tarjeta"
                value={numeroTarjeta}
                onChange={(e) => setNumeroTarjeta(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Fecha de Vencimiento (MM/AA)"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
            />
            <button onClick={confirmarPago}>Confirmar Pago</button>
        </div>
    );
};

export default ConfirmarPago;
