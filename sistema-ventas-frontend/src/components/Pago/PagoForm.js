import React, { useState } from 'react';

const PagoForm = ({ onSubmit }) => {
    const [metodoPago, setMetodoPago] = useState('tarjetaCredito');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(metodoPago);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Método de Pago:
                <select value={metodoPago} onChange={(e) => setMetodoPago(e.target.value)}>
                    <option value="tarjetaCredito">Tarjeta de Crédito</option>
                    <option value="tarjetaDebito">Tarjeta de Débito</option>
                </select>
            </label>
            <button type="submit">Procesar Pago</button>
        </form>
    );
};

export default PagoForm;
